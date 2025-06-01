import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import "dotenv/config";

const REGION = "us-east-2";
const s3 = new S3Client({ 
    region: REGION,
    credentials: {
        accessKeyId : process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
    }
});

const uploadImage = async (filePath, keyName) => {
    const fileStream = fs.createReadStream(filePath);
    const uploadParams = {
        Bucket: "lol-quiz",
        Key : keyName,
        Body: fileStream,
        ContentType: "image/jpeg"
    };

    try{ 
        const data = await s3.send(new PutObjectCommand(uploadParams));
        console.log("Upload Success", data);
        console.log(`URL: https://${uploadParams.Bucket}.s3.${REGION}.amazonaws.com/${keyName}`);
    } catch (err) {
        console.error("Error", err);
    }
}

const downloadImage = async (filePath, keyName) => {
    
}


uploadImage("testImage.png", "test.jpg");

