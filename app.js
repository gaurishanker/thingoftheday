const vwoSDK = require('vwo-node-sdk');
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
        exp = variationEntry.campaignKey;
        const variationName = vwoClientInstance.activate(exp, newId); // variation => 'variation_1'
        console.log(exp + " -> " + variationName)
        const variationToBeServed = variationEntry.meta[variationName]; // entryId => '6hDfbnInEpiab896VpBueJ'
        let variation = await client.getEntry(variationToBeServed);
        blogPost['linkText'] = variation.fields.text;
      }
      else {
        blogPost[key] = entry.fields[key];
      }
    }
    blogPosts.push(blogPost);
  }
  return blogPosts;
}

// https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-types/content-model/get-the-content-model-of-a-space/console

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

const itemClassNames = {
  container: "item__container",
  topRow: "item__topRow",
  date: "item__date",
  img: "item__img",
  link: "item__link",
  panther: "item__panther",
  text: "item__text",
};

async function vwoExample() {
  const items = await getContent();
  return items;
}

app.get('/', async (req, res) => {
  const items = await vwoExample();
  console.log(items);
  res.render('pages/index', {items: items})
})

app.listen(process.env.PORT || port, () => {
  console.log("started app on ", process.env.PORT, port);
})