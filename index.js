const fs = require("fs");
const http = require("http");
const url = require("url");

/* file request learning ... 
// //synchronous (Blockingf) way of excuting data 
// const textIn =  fs.readFileSync('./starter/txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is a new text to add to the textIn: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./starter/txt/output.txt', textOut);
// console.log('file created!!!!');

//Asynchronous (unBlockingf) way of excuting data
// the error is very important and it start the call back functionn(require two argument which is the error and the data )incse there is an error to be able to return the error
fs.readFile("./starter/txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./starter/txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./starter/txt/append.txt", "utf-8", (err, data3) => {
      console.log(`The 3rd data is here ${data3}`);
      fs.writeFile(
        "./starter/txt/final.txt",
        `${data2}\n${data3}`,
        "utf-8",
        (err) => {
          console.log('your data has been adeded to the apppend..."');
        }
      );
    });
  });
});
console.log("should come first "); */

// now server learning

// this is what listen to the request from user(client) and send a response in respect of the request .. both the request and the response both are required...
const server = http.createServer((req, res) => {
  console.log(`the url of the present request is ${req.url}`);
  const pathway = req.url;
  if (pathway == "/") {
    res.end("welcome to my homepage");
  } else if (pathway == "/overview") {
    res.end("here come the overview page");
  } else if (pathway == "/api") {
    fs.readFile("./starter/dev-data/data.json", "utf-8", (err, data) => {
      // the content type must be pass in other for the browser to know the type of data to recieve and display
      res.writeHead(200, { "content-type": "application/json" });
      res.end(data);
    });
  } else {
    // note the header and the status code  has to be sent before the we send our response.....
    res.writeHead(404, {
      "content-type": "text/html",
      "personal-header": "hello, error weekend",
    });
    res.end("<h1>page not found</h1>");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("server started alreadey on port:   3000");
});
