let puppeteer = require("puppeteer");
const process = require("process");

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

    for (let i = 0; i < 5 && i < priceArr.length && i < pNameArr.length; i++) {
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

module.exports.getListingFromFlipkart = getListingFromFlipkart;
