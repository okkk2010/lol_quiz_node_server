// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import fs from "fs";
// import "dotenv/config";
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const AWS = require("aws-sdk");
require('dotenv').config();

//import { get } from "http";

const REGION = process.env.AWS_REGION;
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: REGION
});


const s3 = new AWS.S3();
// new S3Client({ 
//     region: REGION,
//     credentials: {
//         accessKeyId : process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
//     }
// });

exports.getRresignUrl = async (key, mimeType) => {
    try {
        const url = s3.getSignedUrl('putObject', {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
            Expires: 60 * 15, // 1 hour
            ContentType: mimeType
        });
        return url;
    } catch (err) {
        console.log(err.message);
    }
};

exports.getImageUrl = async (keyName) => {
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${REGION}.amazonaws.com/${keyName}`;
};

exports.uploadImage = async (filePath, keyName) => {
    const fileStream = fs.createReadStream(filePath);
    const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key : keyName,
        Body: fileStream,
        ContentType: "image/jpeg"
    };

    try{ 
        const data = await s3.send(new PutObjectCommand(uploadParams));
        console.log("Upload Success", data);
        console.log(`URL: https://${uploadParams.Bucket}.s3.${REGION}.amazonaws.com/${keyName}`);
        return `https://${uploadParams.Bucket}.s3.${REGION}.amazonaws.com/${keyName}`;
    } catch (err) {
        throw new Error(`Error uploading file: ${err.message}`);
    }
}


//module.exports = { getRresignUrl };
//uploadImage("testImage.png", "test.jpg");

