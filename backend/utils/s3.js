const {S3Client, ListBucketsCommand} = require('@aws-sdk/client-s3')
require('dotenv').config()
 const client = new S3Client({region: 'auto', credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
}, endpoint: process.env.AWS_API
})

module.exports = {client}