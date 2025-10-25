const policlinicModel = require("../Models/policlinicModel");


//!!CREATE POLICLINIC
const createPoliclinicController = async (req, res) => {
  try {
    const { Name, Address, Phone } = req.body;
    //validation
    if (!Name || !Address || !Phone) {
      return res.status(400).send({
        success: false,
        message: "Name, Address and Phone are required.",
      });
    }
    const policlinic = new policlinicModel({ Name, Address, Phone });
    await policlinic.save();
    res.status(201).send({
      success: true,
      message: "Policlinic created successfully",
      policlinic,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error creating policlinic",
      error,
    });
  }
};
//!!GET POLICLINIC DETAILS
const getPoliclinicController = async (req, res) => {
  try {
    //find policlinic
    const policlinics = await policlinicModel.find({});
    //validation
    if (!policlinics) {
      res.status(404).send({
        success: false,
        message: "Policlinic not found",
        });

  }
    res.status(200).send({
      success: true,
      totalCount: policlinics.length,
      message: "Policlinic details fetched successfully",
      policlinics,
    }); 
 } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching policlinic details",
      error: error.message,
    });
  }
};

module.exports = { getPoliclinicController, createPoliclinicController };
