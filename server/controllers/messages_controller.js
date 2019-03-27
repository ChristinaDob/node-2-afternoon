// Create an array to hold the messages.
let messages = [];
// Create a variable that will keep track of what id to assign to messages.
// The id should start at 0 and increment after every creation.
let id = 0;

// Each method should be a function that has two parameters, one called req and one called res.

module.exports = {
  // Should be able to create a message using text and time off of the request body.

  // The create method should create a new message object using text and time from the request body and also the global id variable. All methods should send a response of the updated messages array.  { Destructuring }
  create: (req, res) => {
    const { text, time } = req.body;

    // It should then push this new message object into the messages array. After a new message object is created, id should be incremented by one so that the previous id won't be used on any other future messages.
    messages.push({ id, text, time });
    id++;
    // then want to send the updated messages array.
    res.status(200).send(messages);
  },

  // The read method should return the entire messages array.
  // Should be able to return the messages array. All methods should send a response of the updated messages array.
  read: (req, res) => {
    res.status(200).send(messages);
  },

  // Should be able to update the text property of a message using the request body.
  // The update method should update the text property of a message using the text value from the request body.

  // Should be able to determine which message to update using an id url parameter. All methods should send a response of the updated messages array.

  update: (req, res) => {
    const { text } = req.body;
    const updateID = req.params.id;
    // We can use .findIndex to get the index where the ids match. We'll want to use double equals == to find the id instead of triple equals === in this case because the id in the message objects are numbers, and the id from the req.params is a string.
    const messageIndex = messages.findIndex(message => message.id == updateID);
    let message = messages[messageIndex];

    // We can then get the object using the index and update the object.
    messages[messageIndex] = {
      id: message.id,
      text: text || message.text,
      time: message.time
    };
    // Then we can return the updated messages array.
    res.status(200).send(messages);
  },

  // Should be able to delete a message using an id url parameter.
  // All methods should send a response of the updated messages array.
  // The delete method should delete a message using the value of id
  // from the request url parameters.
  delete: (req, res) => {
    const deleteID = req.params.id;
    // We can use .findIndex() again with the id to get the index of the
    // message object and then use .splice to remove it from the messages array.
    messageIndex = messages.findIndex(message => message.id == deleteID);
    messages.splice(messageIndex, 1);
    // We'll then want to send the updated messages array.
    res.status(200).send(messages);
  }
};
