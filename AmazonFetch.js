let puppeteer = require("puppeteer");
const process = require("process");

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

module.exports.getListingFromAmazon = getListingFromAmazon;