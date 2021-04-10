let puppeteer = require("puppeteer");
const process = require("process");
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

    let amazonArr = await getListingFromAmazon(
      links[0],
      browserInstance,
      pName
    );
    console.table(amazonArr);

    let flipkartArr = await getListingFromFlipkart(
      links[1],
      browserInstance,
      pName
    );
    console.table(flipkartArr);

    let paytmMallArr = await getListingFromPaytmMall(
      links[2],
      browserInstance,
      pName
    );
    console.table(paytmMallArr);

  } catch (err) {
    console.log(err);
  }
})();

//  product Name,url of amazon home page
// output-> top 5 matching product -> price Name print
async function getListingFromAmazon(link, browserInstance, pName) {
  let newTab = await browserInstance.newPage();
  await newTab.goto(link);

  await newTab.type("#twotabsearchtextbox", pName, { delay: 100 });
  await newTab.keyboard.press("Enter");

  // Selectors
  // Product name --> h2[class="a-size-mini a-spacing-none a-color-base s-line-clamp-2"]
  // Pricing --> .a-price-whole
  await newTab.waitForSelector(".a-price-whole", { visible: true });
  await newTab.waitForSelector(
    "h2[class='a-size-mini a-spacing-none a-color-base s-line-clamp-2']",
    { visible: true }
  );

  function consoleFn(priceSelector, pNameSelector) {
    let priceArr = document.querySelectorAll(priceSelector);
    let pNameArr = document.querySelectorAll(pNameSelector);

    let details = [];

    for (let i = 0; i < 5 && i<priceArr.length && i<pNameArr.length; i++) {
      let price = priceArr[i].innerText;
      let pName = pNameArr[i].innerText;
      details.push({
        price,
        pName,
      });
    }

    return details;
  }

  return await newTab.evaluate(
    consoleFn,
    ".a-price-whole",
    "h2[class='a-size-mini a-spacing-none a-color-base s-line-clamp-2']"
  );
}

async function getListingFromFlipkart(link, browserInstance, pName) {
  let newTab = await browserInstance.newPage();
  await newTab.goto(link);

  await newTab.type(
    "input[title='Search for products, brands and more']",
    pName,
    { delay: 100 }
  );
  await newTab.keyboard.press("Enter");

  // Selectors
  // Product name --> .s1Q9rs
  // Pricing --> ._30jeq3

  await newTab.waitForSelector("._30jeq3", { visible: true });
  await newTab.waitForSelector(".s1Q9rs", { visible: true });

  function consoleFn(priceSelector, pNameSelector) {
    let priceArr = document.querySelectorAll(priceSelector);
    let pNameArr = document.querySelectorAll(pNameSelector);

    let details = [];

    for (let i = 0; i < 5 && i<priceArr.length && i<pNameArr.length; i++) {
      let price = priceArr[i].innerText;
      let pName = pNameArr[i].innerText;
      details.push({
        price,
        pName,
      });
    }

    return details;
  }

  return await newTab.evaluate(consoleFn, "._30jeq3", ".s1Q9rs");
}

async function getListingFromPaytmMall(link, browserInstance, pName) {
  let newTab = await browserInstance.newPage();
  await newTab.goto(link);

  await newTab.type(
    "#searchInput",
    pName,
    { delay: 100 }
  );
  await newTab.keyboard.press("Enter");
  await newTab.keyboard.press("Enter");

  // Selectors
  // Product name --> .UGUy
  // Pricing --> ._1kMS

  await newTab.waitForSelector("._1kMS", { visible: true });
  await newTab.waitForSelector(".UGUy", { visible: true });

  function consoleFn(priceSelector, pNameSelector) {
    let priceArr = document.querySelectorAll(priceSelector);
    let pNameArr = document.querySelectorAll(pNameSelector);

    let details = [];

    for (let i = 0; i < 5 && i<priceArr.length && i<pNameArr.length; i++) {
      let price = priceArr[i].innerText;
      let pName = pNameArr[i].innerText;
      details.push({
        price,
        pName,
      });
    }

    return details;
  }

  return await newTab.evaluate(consoleFn, "._1kMS", ".UGUy");
}
