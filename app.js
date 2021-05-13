// import { SPACE_ID, ACCESS_TOKEN } from "./setup/credentials.js";
var http = require('http')
const vwoSDK = require('vwo-node-sdk');
const fetch = require('node-fetch');
const { SPACE_ID, ACCESS_TOKEN } = require('./setup/credentials');
const express = require('express')
const app = express()
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
const port = 8080



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
  const settingsFile = await vwoSDK.getSettingsFile(366636, '465982d1e86980f3f692d0c2cff3502f')
  const vwoClientInstance = vwoSDK.launch({
    settingsFile
  });
  items.forEach((item) => {
    
    var variationName = vwoClientInstance.activate("Contentful test", "first user")

    if (variationName == "Control") {
      console.log("inside control");
    } else if(variationName == "Variation-1") {
      console.log("inside variation");
    } else {
      console.log("inside no variation");
    }

    
    

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




app.get('/', async (req, res) => {
  const items = await renderIt();
  
  console.log(items);
  res.render('pages/index', {items: items})
})

app.listen(process.env.PORT || port, () => {
  console.log("started app");
})