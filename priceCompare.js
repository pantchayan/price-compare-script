let puppeteer = require("puppeteer");
const process = require("process");

let amazonFetch = require("./AmazonFetch");
let flipkartFetch = require("./FlipkartFetch");
let paytmmallFetch = require("./PaytmMallFetch");

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

    let flipkartArr = await flipkartFetch.getListingFromFlipkart(
      links[1],
      browserInstance,
      pName
    );
    console.table(flipkartArr);

    let paytmMallArr = await paytmmallFetch.getListingFromPaytmMall(
      links[2],
      browserInstance,
      pName
    );
    console.table(paytmMallArr);

  } catch (err) {
    console.log(err);
  }
})();



