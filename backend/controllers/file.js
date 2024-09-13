const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { client } = require("../utils/s3");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const post = require("../models/post");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});
var multipleUpload = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "PostAttachment", maxCount: 10 },
]);
require("dotenv").config();

const SaveFile = async (req, res) => {
  let token = req.headers.authorization.split(' ')[1];
  let decoded = jwt.decode(token, process.env.SECRET_KEY)
  if (req.files) {
    if (req.files.PostAttachment) {
      let arr = [];
      for (let [key, value] of req.files.PostAttachment.entries()) {
        const PostParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `${uuidv4()}-${value.originalname}-${Date.now()}`,
          Body: value.buffer,
          ContentType: value.mimetype,
          ACL: "public-read",
        };
        arr.push(`${process.env.PUBLIC_URL}/${process.env.AWS_BUCKET_NAME}/${PostParams.Key}`);
        await client.send(new PutObjectCommand(PostParams));
      }
      res.json({ urls: arr });
    } else if (req.files.avatar) {
      const AvatarParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uuidv4()}-${req.files.avatar[0].originalname}-${Date.now()}`,
        Body: req.files.avatar[0].buffer,
        ContentType: req.files.avatar[0].mimetype,
        ACL: "public-read",
      };

      await client.send(new PutObjectCommand(AvatarParams));
      await User.findOne({email: decoded.email}).updateOne({avatar: `${process.env.PUBLIC_URL}/${process.env.AWS_BUCKET_NAME}/${AvatarParams.Key}`})
      return res.status(201).json({
        url: `${process.env.PUBLIC_URL}/${process.env.AWS_BUCKET_NAME}/${AvatarParams.Key}`,
      });
    }
  }
};

module.exports = { SaveFile, upload, multipleUpload };
