const puppeteer = require("puppeteer");
var userAgent = require("user-agents");
const cheerio = require("cheerio");
const helpers = require('../helpers')
const { generateUrl } = require("../helpers/urlHelper");

const scrappingService = async (reqBody, res) => {
  let Root_url = await generateUrl(reqBody)
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();
  await page.setUserAgent(userAgent.toString());
  await page.goto(Root_url, { waitUntil: "networkidle2" });
  const content = await page.content();
  const $ = cheerio.load(content);
  let total = parseInt($(".list-result-title b").text().replace(",", "").trim())

  browser.close()
  var i = 1
  var data = []
  //(total / 20) 
  while (2 >= i) {
    console.log(i)
    let singlePageData = await helpers.getPageData(Root_url, i)
    data = [...data, ...singlePageData]
    i++
  }
  console.log(data)

  res.send({ reqBody, Root_url, total, data });
};

module.exports = { scrappingService };
