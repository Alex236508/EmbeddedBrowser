const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/proxy", async (req, res) => {
   const url = req.query.url;

   if (!url) return res.status(400).send("Missing URL");

   try {
      const response = await axios.get(url, {
         responseType: "arraybuffer",
         headers: {
            "User-Agent": "Mozilla/5.0"
         }
      });

      res.set("Content-Type", response.headers["content-type"]);
      res.send(response.data);

   } catch (err) {
      res.status(500).send("Failed to fetch site");
   }
});

app.listen(3000, () => {
   console.log("Proxy running on http://localhost:3000");
});
