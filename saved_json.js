const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const save = async (varibal_to_save)=>{
    await s3.putObject({
        Body: JSON.stringify(varibal_to_save,null,2),
        Bucket: "cyclic-plain-marlin-us-west-2",
        Key: "saved_data.json"
    }).promise();
};

module.exports = { save };