const express = require("express");

const router = express.Router();

const axios = require("axios");



router.post("/analyze", async (req, res) => {

  try {

    const { description } = req.body;

    const response = await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {
        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "user",

            content: `
Analyze this complaint:

${description}

Give output in this format:

Urgency:
Department:
Summary:
Auto Response:
`
          }
        ]
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type": "application/json"
        }
      }

    );

    res.json(response.data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });

  }

});



module.exports = router;