const puppeteer = require("puppeteer");
var userAgent = require("user-agents");

const getPageData = async (url, pageNo) => {
  var modifiedUrl = ""
  if (pageNo > 1) {
    modifiedUrl = `${url}-pagina-${pageNo}`
  } else {
    modifiedUrl = url
  }
  var browser = await puppeteer.launch({
    headless: true
  });

  var page = await browser.newPage();
  await page.setUserAgent(userAgent.toString());
  await page.goto(modifiedUrl, { waitUntil: "networkidle2" });

  const result = await page.evaluate(() => {
    var row = document.querySelectorAll(".posting-card")
    console.log(row.length)
    var r = []
    for (var i = 0; i < row.length; i++) {
      let el = row[i]
      let title = el.querySelector("a.go-to-posting").innerText
      let location = el.querySelector(".posting-location").innerText
      let prices = el.querySelector(".prices .first-price").innerText
      let description = el.querySelector(".posting-description").innerText
      r.push({ title, location, prices, description })
    }
    return r
  })

  browser.close()
  return result;
}


module.exports = { getPageData }
