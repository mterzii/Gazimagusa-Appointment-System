const testUserController = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "Test User Data API",
    });
  } catch (err) {
    console.log("Error in API.", err);
  }
};
module.exports = { testUserController };
