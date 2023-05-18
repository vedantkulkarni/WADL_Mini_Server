const express = require("express");
const cors = require('cors') //cross origin resource sharing
const getCode = require("./code-generator");
const uploadFromBuffer = require("./cloudinary");

const app = express();
const port = 5000;

app.use(cors());
const mp = new Map();

const multer = require('multer')
const storage = multer.memoryStorage()

const upload = multer({ storage: storage })

app.post("/", upload.single("file"), async (req, res) => {
  try {
    const buffer = req.file.buffer;
    const { url } = await uploadFromBuffer(buffer, "FILES");
    const code = await getCode();
    mp.set(code, url);
    res.status(200).send({ message: "Uploaded", code, url });
  } catch (error) {
    console.log(error);
    throw error;
  }
});

app.get("/:code", async (req, res) => {
  const { code } = req.params;
  try {
    const file = mp.get(code);
    if (file) {
      res.status(200).send({ message: "Found", file });
    } else {
      res.status(400).send({ message: "File Not Found" });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
