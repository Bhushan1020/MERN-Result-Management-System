const mongoose = require('mongoose');

// Define schemas for different collections
const resultsSchema = new mongoose.Schema({
  email: String,
  fname: String,
  lname: String,
  // Add other fields as necessary
});

const Results = mongoose.model('Results', resultsSchema);

const getResultsByCollection = async (collectionName, email) => {
  // Dynamically access the collection
  const collection = mongoose.connection.collection(collectionName);
  return collection.findOne({ email });
};

module.exports = {
  getResultsByCollection
};
