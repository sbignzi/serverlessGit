const Responses = require('../common/API_Responses');
const uuid = require('uuid').v4;
const AWS = require('aws-sdk');

const s3 = new AWS.S3();

const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
// post request have to be sent to:
// https://0cvmciqvlk.execute-api.us-east-1.amazonaws.com/dev/image-upload
module.exports.upload = async event => {
    try {
        const body = JSON.parse(event.body);

        if (!body || !body.image || !body.mime) {
            return Responses._400({ message: 'incorrect body on request' });
        }

        if (!allowedMimes.includes(body.mime)) {
            return Responses._400({ message: 'mime is not allowed ' });
        }

        let imageData = body.image;
        if (body.image.substr(0, 7) === 'base64,') {
            imageData = body.image.substr(7, body.image.length);
        }

        const buffer = Buffer.from(imageData, 'base64');
        const detectedExt = body.mime.split('/')[1];
        const detectedMime = `${body.mime}`;

        if (detectedMime !== body.mime) {
            return Responses._400({ message: 'mime types dont match' });
        }

        const name = uuid();
        const key = `${name}.${detectedExt}`;

        console.log(`writing image to bucket called ${key}`);

        await s3
            .putObject({
                Body: buffer,
                Key: key,
                ContentType: body.mime,
                Bucket: process.env.imageUploadBucket,
                ACL: 'public-read',
            })
            .promise();

        const url = `https://${process.env.imageUploadBucket}.s3.amazonaws.com/${key}`;
        return Responses._200({
            imageURL: url,
        });
    } catch (error) {
        console.log('error', error);

        return Responses._400({ message: error.message || 'failed to upload image' });
    }
};
