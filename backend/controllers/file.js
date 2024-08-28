const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { client } = require("../utils/s3");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const storage = multer.memoryStorage();
const upload = multer({ storage });
require("dotenv").config();
const SaveFile = async (req, res) => {
  const file = req.file;
  const headers = req.headers['authorization'];
  const token = headers.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  const decoded = await jwt.decode(token, process.env.SECRET_KEY)
  if (!decoded) return res.status(401).json({ msg: "Token is not valid" });
  const user = await User.findOne({ email: decoded.email });
  if (!file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const fileName = `${uuidv4()}-${file.originalname}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  };
  try {
    const command = new PutObjectCommand(params);
    const data = await client.send(command);
    let url = `${process.env.PUBLIC_URL}/${process.env.AWS_BUCKET_NAME}/${fileName}`
   await user.updateOne({avatar: url})
    res
      .status(200)
      .json({
        url: url,
      });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).json({ error: "Error uploading file" });
  }
};

module.exports = { SaveFile, upload };
