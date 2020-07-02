// Implement a small command line node app called fetcher.js
// which should take a URL as a command-line argument 
// as well as a local file path and download the resource 
// to the specified path. 


const request = require('request');
const fs = require('fs');
// const fileBytes = require('file-bytes');
// const prettyBytes = require('pretty-bytes');



//now get the command line input (URL, local file path)
const input = process.argv.slice(2);
//console.log("input = ", input);

//structure the request function
//request takes the URL and a callback as arguments 
request(input[0], (error, response, body) => {
  //console.log("input[0] = ", input[0]);
  //console.log('body = ', body);
  //readFile takes the relative path and a callback as arguments 

  if(error) {
    console.log("The URL provided results in an error. The application will terminate.");
    request.abort();
  };

  if (response.statusCode !== 200) {
    console.log("The response from the server was not as expected. Application will terminate ");
    request.abort();
  };

  if (fs.access(input[1], (err) => {
    if(error) {
      return true;
    }
  })) {
    console.log("The local path given was invalid. Application will terminate.");
    request.abort();
  };

  fs.writeFile(input[1], body, () => {
    //const size = fs.statSync(input[1]).size;
    //console.log("stats = ", stats);
    //console.log('size = ', size);

    const size = body.length;

    console.log(`Downloaded and saved ${size} bytes to ${input[1]}`);

  });

})



//node fetcher.js http://www.example.edu/ ./index.html