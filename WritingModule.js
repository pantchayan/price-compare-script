let fs = require("fs");


let writeDetails = async (dataArr, platformName, pName) => { 
    let filePath = `./res/result${platformName}.json`;
    let resObj = {
        Name : platformName,
        Product : pName,
        Details : dataArr
    }

    let data = JSON.stringify(resObj, null, 2);
    await fs.promises.writeFile(filePath, data);

} 

module.exports.writeDetails = writeDetails;