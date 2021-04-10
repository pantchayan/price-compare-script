let puppeteer = require("puppeteer");
const process = require("process");

async function getListingFromPaytmMall(link, browserInstance, pName) {
  let newTab = await browserInstance.newPage();
  await newTab.goto(link);

  await newTab.type("#searchInput", pName, { delay: 100 });
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

  return await newTab.evaluate(consoleFn, "._1kMS", ".UGUy");
}

module.exports.getListingFromPaytmMall = getListingFromPaytmMall;
