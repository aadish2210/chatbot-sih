const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const Replicate = require('replicate');
const app = express();
const cors = require('cors')
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/chatbot', async (req, res) => {
  const userMessage = req.body.message;

  const replicate = new Replicate({
    auth: "r8_81K3tjEQr0eIwyurlOTFKdZn880MHxo3vO2b3",
  });

    const output = await replicate.run(
        "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
        {
          input: {
            prompt: userMessage,
            max_new_tokens : 100,
          }
        }
      );

    res.send(output.join(""))
   
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
