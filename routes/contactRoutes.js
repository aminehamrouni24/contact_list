const Contact = require("../models/Contact");
const verifyToken = require("../middlewares/verifyToken");
const router = require("express").Router();

// creating a contact

router.post("/create", verifyToken, async (req, res) => {
  try {
    const { fullName, email, phoneNumber, skills } = req.body;
    const contact = await Contact.create({
      fullName,
      email,
      phoneNumber,

      skills,
    });

    return res.status(200).json({
      status: true,
      msg: "Contact created successfully!!",
      data: contact,
    });
  } catch (err) {
    return res.status(500).json({ status: false, msg: err });
  }
});

// get all contacts
router.get("/all", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res
      .status(200)
      .json({ status: true, msg: "List of contacts", data: contacts });
  } catch (err) {
    return res.status(500).json({ status: false, msg: err });
  }
});
// get one spefic contact
router.get("/contact/:id", async (req, res) => {
  let {id}=req.params
  try {
    const contact = await Contact.findById(id);
    res
      .status(200)
      .json({ status: true, msg: "List of contacts", data: contact });
  } catch (err) {
    return res.status(500).json({ status: false, msg: err });
  }
});

// update lcontact
router.put("/update/:id", async (req, res) => {
  let { id } = req.params;
  try {
    const { fullName, email, phoneNumber, skills } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      msg: "Contact created successfully!!",
      data: updatedContact,
    });
  } catch (err) {
    return res.status(500).json({ status: false, msg: err });
  }
});

// update lcontact
router.delete("/delete/:id", async (req, res) => {
  let { id } = req.params;
  try {
    const { fullName, email, phoneNumber, skills } = req.body;
    const deletedContact = await Contact.findByIdAndDelete(
      id
    );

    return res.status(200).json({
      status: true,
      msg: "Contact deleted successfully!!",
    });
  } catch (err) {
    return res.status(500).json({ status: false, msg: err });
  }
});
module.exports = router;
