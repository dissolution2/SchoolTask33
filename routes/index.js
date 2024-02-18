var express = require('express');
const { save } = require('../saved_json.js');
let saved_data = require('../saved_data.json');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
var router = express.Router();

/* GET home page. get saved text */
router.get('/', async function(req, res, next) {
  let data_file = await s3.getObject({
    Bucket: "cyclic-plain-marlin-us-west-2",
    Key: "saved_data.json"
  }).promise();
  // console.log("test / ", data_file);
  // console.log("test / ", JSON.parse(data_file.Body));
  const get_data_aws = JSON.parse(data_file.Body)?.saved_data;

  res.json({status: "success", result: get_data_aws });
  // res.render('index', { title: 'Express' });
});

router.post('/text', function(req,res){
  const {data }=req.body;
  // validatition
  console.log("body data? ", data, "req.body: ", req.body);
  saved_data.saved_data =  data;
  save(saved_data);
  res.json({ status: "success", saveData: data })
  // res.render('index', {title: })
});

module.exports = router;
