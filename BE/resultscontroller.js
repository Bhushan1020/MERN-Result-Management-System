const Results = require('./resultsmodel'); // Adjust the path based on your structure

// Function to fetch results from all collections
const getAllResults = async (req, res) => {
  const email = req.params.email;

  try {
    // Define collections for different years and semesters
    const collections = [
      'SecondYearFirst',
      'secondYearSecond',
      'THIRDYearFirst',
      'THIRDYearSecond',
    ];

    // Fetch results from all collections
    const resultsPromises = collections.map(async (collectionName) => {
      const results = await Results.getResultsByCollection(collectionName, email);
      return { collectionName, results };
    });

    const results = await Promise.all(resultsPromises);
    res.json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getAllResults
};
