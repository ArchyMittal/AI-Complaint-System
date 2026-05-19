const express = require("express");

const router = express.Router();

const Complaint = require("../models/Complaint");

const authMiddleware = require(
  "../middleware/authMiddleware"
);



// ADD COMPLAINT
router.post(
  "/",
  authMiddleware,

  async (req, res) => {

    try {

      const complaint = new Complaint(
        req.body
      );

      await complaint.save();

      res.status(201).json({
        message: "Complaint Added Successfully",
        complaint
      });

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }

  }
);



// GET ALL COMPLAINTS
router.get(
  "/",
  authMiddleware,

  async (req, res) => {

    try {

      const complaints =
        await Complaint.find();

      res.json(complaints);

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }

  }
);



// UPDATE COMPLAINT
router.put(
  "/:id",
  authMiddleware,

  async (req, res) => {

    try {

      const updatedComplaint =
        await Complaint.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      res.json(updatedComplaint);

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }

  }
);



// DELETE COMPLAINT
router.delete(
  "/:id",
  authMiddleware,

  async (req, res) => {

    try {

      await Complaint.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Complaint Deleted"
      });

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }

  }
);



// SEARCH BY LOCATION
router.get(
  "/search/location",
  authMiddleware,

  async (req, res) => {

    try {

      const location =
        req.query.location;

      const complaints =
        await Complaint.find({
          location
        });

      res.json(complaints);

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }

  }
);



module.exports = router;