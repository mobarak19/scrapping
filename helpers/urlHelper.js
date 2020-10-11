const ROOT_URL = "https://www.inmuebles24.com";
const generateUrl = (reqBody) => {
  let assetType = reqBody.asset_type;
  let sellType = reqBody.sell_type === "comprar" ? "venta" : "renta";
  let tempAddress = reqBody.address;
  tempAddress = tempAddress.trim().toLowerCase();
  tempAddress = tempAddress.replace(" ", "-");
  let address = tempAddress;
  let SCRAPPING_URL = `${ROOT_URL}/${assetType}-en-${sellType}-en-${address}.html`;
  return SCRAPPING_URL;
};

module.exports = { generateUrl, ROOT_URL };
