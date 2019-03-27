const express = require('express');
// we can import our controller into index.js and create endpoints
// that will execute the logic.
// In this step, we will hook up our controller to our app in server/index.js
// Require the messages controller.
const mc = require('./controllers/messages_controller');

const app = express();

// Configure the app to parse JSON from the body.
app.use(express.json());

//  setup the API to serve our front-end files.
// Use express.static to serve the public/build folder.
app.use(express.static(__dirname + '/../public/build'));

// The url for this api should be /api/messages.
// make a messagesBaseUrl variable so that if the URL ever changes we won't have
// to update in four different places. The messagesBaseUrl should equal /api/messages.
const messagesBaseUrl = '/api/messages';
// Create a post, get, put, and delete endpoint that use the corresponding method on
// the messages controller.
// For the put and delete endpoints, we need to add on a url parameter of id.
// A url paramter can be defined by adding :variableName when making the URL for an endpoint.
app.post(messagesBaseUrl, mc.create);
app.get(messagesBaseUrl, mc.read);
app.put(`${messagesBaseUrl}/:id`, mc.update);
app.delete(`${messagesBaseUrl}/:id`, mc.delete);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`My server is listening on port: ${PORT}`);
});

// LAST STEP ** Open http://localhost:3001/ to see the front-end interact with the API.
