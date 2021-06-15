// import { SPACE_ID, ACCESS_TOKEN } from "./setup/credentials.js";
var http = require('http')
const vwoSDK = require('vwo-node-sdk');
const fetch = require('node-fetch');
const { SPACE_ID, ACCESS_TOKEN } = require('./setup/credentials');
const express = require('express')
const {v4 : uuidv4} = require('uuid')
const app = express()
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
const port = 8080
const contentful = require("contentful");
const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: ACCESS_TOKEN
});


// This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.
async function getContent() {
  let entries = await client.getEntries({
    'content_type': 'sampleBlogAbTest'
  });
  blogPosts = []
  const settingsFile = await vwoSDK.getSettingsFile(process.env.ACCOUNT_ID, process.env.TOKEN)
  const vwoClientInstance = vwoSDK.launch({
      settingsFile
  });
  for (const i of Object.keys(entries.items)) {
    const entry = entries.items[i];
  // entries.items.forEach(function (entry) {
    blogPost = {
      'id': entry.sys.id
    }
    for (const key of Object.keys(entry.fields)) {
      if(key == 'linkTextVariation') {
        const newId = uuidv4();
        const variationEntry = entry.fields[key].fields;
        let exp = 'Contentful integration';
        // exp = variationEntry.experimentKey;
        const variationName = vwoClientInstance.activate(exp, newId); // variation => 'variation_1'
        console.log(variationName)
        const variationToBeServed = variationEntry.meta[variationName]; // entryId => '6hDfbnInEpiab896VpBueJ'
        let variation = await client.getEntry(variationToBeServed);
        blogPost['linkText'] = variation.fields.text;
        // console.log(variationEntry);
      }
      else {
        blogPost[key] = entry.fields[key];
      }
      // console.log(entry);
    }
    blogPosts.push(blogPost);
  // });
  }
  // console.log(blogPosts);
  return blogPosts;
}

// .then(function (entries) {
//     entries.items.forEach(function (entry) {
//     console.log(JSON.stringify(entry.fields))
//   })
// })
// .catch(err => console.log(err));



const endpoint = "https://graphql.contentful.com/content/v1/spaces/" + SPACE_ID;

const query = `{
  microblogCollection {
    items {
      sys {
        firstPublishedAt
        id
      }
      text
      image {
        url
        title
        width
        height
        description
      }
      panther
      link
      linkText
    }
  }
}`;
// https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-types/content-model/get-the-content-model-of-a-space/console

const fetchOptions = {
  method: "POST",
  headers: {
    Authorization: "Bearer " + ACCESS_TOKEN,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ query }),
};

const getMonthStringFromInt = (int) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months[int];
};

const addLeadingZero = (num) => {
  num = num.toString();
  while (num.length < 2) num = "0" + num;
  return num;
};

const renderFooterDate = () => {
  const footerYearHolder = document.querySelector("[data-footer-year]");
  const timestamp = Date.now();
  const date = new Date(timestamp);
  footerYearHolder.innerText = date.getFullYear();
};

const formatPublishedDateForDateTime = (dateString) => {
  const timestamp = Date.parse(dateString);
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${addLeadingZero(date.getMonth() + 1)}-${date.getDate()}`;
};

const formatPublishedDateForDisplay = (dateString) => {
  const timestamp = Date.parse(dateString);
  const date = new Date(timestamp);
  return `${date.getDate()} ${getMonthStringFromInt(date.getMonth())} ${date.getFullYear()}`;
};

const microblogHolder = [];
// document.querySelector("[data-items]");

const itemClassNames = {
  container: "item__container",
  topRow: "item__topRow",
  date: "item__date",
  img: "item__img",
  link: "item__link",
  panther: "item__panther",
  text: "item__text",
};



const renderItems = async (items) => {
  // const settingsFile = await vwoSDK.getSettingsFile(366636, '465982d1e86980f3f692d0c2cff3502f')
  // const vwoClientInstance = vwoSDK.launch({
  //   settingsFile
  // });
  items.forEach((item) => {
    
    // var variationName = vwoClientInstance.activate("Contentful test", newId)
    // console.log(settingsFile)
    // if (variationName == "Control") {
    //   console.log("inside control");
    // } else if(variationName == "Variation-1") {
    //   console.log("inside variation");
    // } else {
    //   console.log("inside no variation");
    // }

    
    

    // if (item.image) {
    //   const newImgEl = document.createElement("img");
    //   newImgEl.src = `${item.image.url}?w=500`;
    //   newImgEl.alt = item.image.description;
    //   newImgEl.setAttribute("width", item.image.width);
    //   newImgEl.setAttribute("height", item.image.height);
    //   newImgEl.className = itemClassNames.img;
    //   newItemEl.appendChild(newImgEl);
    // }

    // if (item.text) {
    //   const newTextEl = document.createElement("h2");
    //   newTextEl.innerText = item.text;
    //   newTextEl.className = itemClassNames.text;
    //   newItemEl.appendChild(newTextEl);
    // }

    // if (item.link) {
    //   const newLinkEl = document.createElement("a");
    //   newLinkEl.href = item.link;
    //   newLinkEl.innerText = item.linkText || "View more";
    //   newLinkEl.setAttribute("target", "_blank");
    //   newLinkEl.setAttribute("rel", "noopener noreferrer");
    //   newLinkEl.className = itemClassNames.link;
    //   newItemEl.appendChild(newLinkEl);
    // }

    // microblogHolder.appendChild(newItemEl);
  });
  return items;
};



async function renderIt() {
  // renderFooterDate();
  const response = await fetch(endpoint, fetchOptions);
  const data = await response.json()
  const items = data.data.microblogCollection.items;
  return renderItems(items);
}

async function vwoExample() {
  const items = await getContent();
  return items;
}




app.get('/', async (req, res) => {
  // const items = await renderIt();
  const items = await vwoExample();
  console.log(items);
  res.render('pages/index', {items: items})
})

app.listen(process.env.PORT || port, () => {
  console.log("started app on ", process.env.PORT, port);
})