const fs = require("fs");
const http = require("http");
const url = require("url");

// file request learning ...  my first learning of the backend
// synchronous (Blockingf) way of excuting data
//  const textIn =  fs.readFileSync('./starter/txt/input.txt', 'utf-8');
//  console.log(textIn);
//  const textOut = `This is a new text to add to the textIn: ${textIn}.\nCreated on ${Date.now()}`;
//  fs.writeFileSync('./starter/txt/output.txt', textOut);
//  console.log('file created!!!!');

// //Asynchronous (unBlockingf) way of excuting data
// // the error is very important and it start the call back functionn(require two argument which is the error and the data )incse there is an error to be able to return the error
// fs.readFile("./starter/txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./starter/txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./starter/txt/append.txt", "utf-8", (err, data3) => {
//       console.log(`The 3rd data is here ${data3}`);
//       fs.writeFile(
//         "./starter/txt/final.txt",
//         `${data2}\n${data3}`,
//         "utf-8",
//         (err) => {
//           console.log('your data has been adeded to the apppend..."');
//         }
//       );
//     });
//   });
// });
// console.log("should come first ");

// // now server learning
// the synchronous is used cause we are only need to load the file once not a multiple time and why it put in the top levl of the code it loaded once and keep it in the memory for multiple time use...
const cardTemp = fs.readFileSync(
  "./starter/templates/template-card.html",
  "utf-8"
);
const overviewTemp = fs.readFileSync(
  "./starter/templates/template-overview.html",
  "utf-8"
);
const productTemp = fs.readFileSync(
  "./starter/templates/template-product.html",
  "utf-8"
);

const replaceTemp = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};

const data = fs.readFileSync("./starter/dev-data/data.json", "utf-8");
const dataObject = JSON.parse(data);

//  this is what listen to the request from user(client) and send a response in respect of the request .. both the request and the response both are required...
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  const pathway = req.url;
  if (pathname == "/" || pathname == "/overview") {
    res.writeHead(200, {
      "content-type": "text/html",
    });

    const cardsHtml = dataObject
      .map((el) => replaceTemp(cardTemp, el))
      .join("");
    const output = overviewTemp.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  } else if (pathname == "/product") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const product = dataObject[query.id];
    const output = replaceTemp(productTemp, product);
    res.end(output);
    //the api
  } else if (pathname == "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);
    // the not found error
  } else {
    // note the header and the status code  has to be sent before the we send our response.....
    res.writeHead(404, {
      "content-type": "text/html",
      "personal-header": "hello, error weekend",
    });
    res.end("<h1>page not found</h1>");
  }
});

// this listen to any request from the client and send to the server
server.listen(3000, "127.0.0.1", () => {
  console.log("server started alreadey on port:   3000");
});
