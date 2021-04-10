let puppeteer = require("puppeteer");
const process = require("process");
let fs = require("fs");
let links = [
  "https://www.amazon.in",
  "https://www.flipkart.com",
  "https://paytmmall.com/",
];

// node priceCompare.js iPhone11
let pName = process.argv[2];

console.log("Before");
(async function () {
  try {
    let browserInstance = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    });

    let amazonArr  = await getListingFromAmazon(links[0], browserInstance, pName);
    conmsole.log(amazonArr);

  } catch (err) {
    console.log(err);
  }
})();

//  product Name,url of amazon home page
// output-> top 5 matching product -> price Name print
async function getListingFromAmazon(link, browserInstance, pName) {
  let newTab = await browserInstance.newPage();
  await newTab.goto(link);
  // await newTab.waitForSelector("#twotabsearchtextbox", { visible: true });

  await newTab.type("#twotabsearchtextbox", pName, { delay: 200 });
  await newTab.keyboard.press("Enter");
  await newTab.waitForSelector(".a-price-whole", { visible: true });
  await newTab.waitForSelector(
    "h2[class='a-size-mini a-spacing-none a-color-base s-line-clamp-2']",
    { visible: true }
  );

  function consoleFn(priceSelector, pNameSelector) {
    let pNameArr = document.querySelectorAll(priceSelector);
    let priceArr = document.querySelectorAll(pNameSelector);

    let details = [];

    for (let i = 0; i < 5; i++) {
      let price = priceArr[i].innerText;
      let pName = pNameArr[i].innerText;
      details.push(price, pName);
    }

    return details;
  }

  return await newTab.evaluate(
    consoleFn,
    ".a-price-whole",
    "h2[class='a-size-mini a-spacing-none a-color-base s-line-clamp-2']"
  );
  // from 3rd index
  // Product name --> h2[class="a-size-mini a-spacing-none a-color-base s-line-clamp-2"]
  // Pricing --> .a-price-whole
}
