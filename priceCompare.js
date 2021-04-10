let puppeteer = require("puppeteer");
const process = require("process");

let amazonFetch = require("./AmazonFetch");
let flipkartFetch = require("./FlipkartFetch");
let paytmmallFetch = require("./PaytmMallFetch");

let writeModule = require("./WritingModule");

let fs = require("fs");
let links = [
  "https://www.amazon.in",
  "https://www.flipkart.com",
  "https://paytmmall.com/",
];

// node priceCompare.js <PRODUCT_NAME>
let pName = process.argv[2];

console.log("Before");
(async function () {
  try {
    let browserInstance = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    });

    let amazonArr = await amazonFetch.getListingFromAmazon(
      links[0],
      browserInstance,
      pName
    );

    console.table(amazonArr);
      writeModule.writeDetails(amazonArr, "Amazon", pName);

    let flipkartArr = await flipkartFetch.getListingFromFlipkart(
      links[1],
      browserInstance,
      pName
    );
    console.table(flipkartArr);
    writeModule.writeDetails(flipkartArr, "Flipkart", pName);

    let paytmMallArr = await paytmmallFetch.getListingFromPaytmMall(
      links[2],
      browserInstance,
      pName
    );
    console.table(paytmMallArr);
    writeModule.writeDetails(paytmMallArr, "PaytmMall", pName);

  } catch (err) {
    console.log(err);
  }
})();



