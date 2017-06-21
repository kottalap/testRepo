var express = require('express');
var router = express.Router();
var http = require('http');
var WebPageTest = require('WebPageTest')
var wpt = new WebPageTest('https://www.webpagetest.org/', 'A.50fd48f4f706827e00e9c0cab1ed6506')
var gtmetrix = require ('gtmetrix') ({
  email: 'prashant.kumar@timeinc.com',
  apikey: '4d674361d60ff54fa730f96950356e17'
});


var config = {
  url: 'http://facebook.com',
  location: 2,
  browser: 3
  
};

/* GET users listing. */
router.post('/', function(req, res, next) {
  wpt.runTest('https://css-tricks.com', {
  connectivity: 'Cable',
  location: 'Dulles:Chrome',
  firstViewOnly: false,
  runs: 1,
  pollResults: 5,
  video: true
}, function processTestResult(err, result) {
  // First view — use `repeatView` for repeat view
  console.log('Load time:', result.data.average.firstView.loadTime)
  console.log('First byte:', result.data.average.firstView.TTFB)
  console.log('Start render:', result.data.average.firstView.render)
  console.log('Speed Index:', result.data.average.firstView.SpeedIndex)
  console.log('DOM elements:', result.data.average.firstView.domElements)

  console.log('(Doc complete) Requests:', result.data.average.firstView.requestsDoc)
  console.log('(Doc complete) Bytes in:', result.data.average.firstView.bytesInDoc)

  console.log('(Fully loaded) Time:', result.data.average.firstView.fullyLoaded)
  console.log('(Fully loaded) Requests:', result.data.average.firstView.requestsFull)
  console.log('(Fully loaded) Bytes in:', result.data.average.firstView.bytesIn)

  console.log('Waterfall view:', result.data.runs[1].firstView.images.waterfall)
})

  var payloaddata = JSON.parse(req.body.payload);
  //  console.log("REQUEST BODY::", payloaddata);
  gtmetrix.test.create (config, function(err, data){
    // console.log("DATA IN GTMATRIX::", data);
    // console.log("ERROR", err);
    if(data) {
      gtmetrix.test.get (data.test_id, 15000,function(err, data){
        if(data.results.yslow_score === 8 && data.results.pagespeed_score === 7 ){
          console.log(payloaddata.action);
          console.log("Performance test passed");
        }
        else {
          console.log("Performance test failed please improve your coding standards");
        }
      });
    } else {
      console.log("something went wrong");
    }
  });
});



module.exports = router;
