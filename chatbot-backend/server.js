const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = "AIzaSyBTnuWUwI2vlaSZioRgs1PsAvwj9Z6Rq1M";

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post("/api/chatbot", async (req, res) => {
  const userMessage = req.body.message;
  const context = "";
  const examples = [];
  const messages = [];

  messages.push({
    content:
      userMessage +
      "give information only related to the river related prompts and the prompts related to namami gange programme, also give answers in the respective language which is used by the user in the prompt and also in the style of the diamond toon character chacha chaudhary",
  });

  client
    .generateMessage({
      // required, which model to use to generate the result
      model: MODEL_NAME,
      // optional, 0.0 always uses the highest-probability result
      temperature: 0.0,
      // optional, how many candidate results to generate
      candidateCount: 1,
      // optional, number of most probable tokens to consider for generation
      top_k: 40,
      // optional, for nucleus sampling decoding strategy
      top_p: 0.95,
      prompt: {
        // optional, sent on every request and prioritized over history
        context: context,
        // optional, examples to further finetune responses
        examples: examples,
        // required, alternating prompt/response messages
        messages: messages,
      },
    })
    .then((result) => {
      res.send(result[0]?.candidates[0]?.content);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
