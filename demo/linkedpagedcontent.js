const puppeteer = require('puppeteer');
//let rowPerPages = await page.$$(".posting-card")


const dataValues = await page.$$eval(
    '.list-card-container div.posting-card',
    divs => divs.map(div => div.dataset.id)
);


console.log("datavalue", dataValues)

// const datad = await page.evaluate(() =>
// Array.from(document.querySelectorAll(".list-card-container div.posting-card")).map(d => d.getAttribute("data-id"))
// )


console.log('into web_scraper')
const webscraping = async pageAmount => {
    console.log('into webscraping')
    return new Promise(async (resolve, reject) => {
        try {
            if (!pageAmount) {
                pageAmount = 1;
            }
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto("https://www.hemnet.se/salda/bostader?location_ids%5B%5D=898741");
            let currentPage = 1;
            let dataObj = [];
            while (currentPage <= pageAmount) {
                const results = await page.evaluate(() => {
                    const prop_list = document.querySelectorAll('.sold-property-listing');
                    let list = [];
                    let broker, price, price_kvm, address, kvm, rooms, date_sold, monthly_fee, size, area, type, id, url, bid_change;
                    for (var i = 0; i < prop_list.length; i++) {
                        var el = prop_list[i];
                        url = el.querySelector('a').href;
                        id = ""
                        broker = el.querySelector('.sold-property-listing__broker').innerText;
                        price = el.querySelector('div.sold-property-listing__price > div:nth-child(1) > span').innerText;
                        price_kvm = el.querySelector('div.sold-property-listing__price > div:nth-child(2) > div.sold-property-listing__price-per-m2.sold-property-listing--left').innerText
                        date_sold = el.querySelector('.sold-property-listing__sold-date.sold-property-listing--left').innerText;
                        address = el.querySelector('div.sold-property-listing__location > h2 > span.item-result-meta-attribute-is-bold.item-link').innerText;
                        price = price.replace(/\D/g, '');
                        price_kvm = price_kvm.replace(/\D/g, '');
                        date_sold = date_sold.replace('Såld ', '');
                        monthly_fee = el.querySelector('div.sold-property-listing__size > div > div.sold-property-listing__fee');
                        size = el.querySelector('div.sold-property-listing__size > div > div.sold-property-listing__subheading.sold-property-listing--left')
                            .innerText.split('m²');
                        area = el.querySelector('div.sold-property-listing__location > div > span.item-link')
                        type = el.querySelector('div.sold-property-listing__location > div > span.hide-element')
                        bid_change = document.querySelector('div.sold-property-listing__price-change');
                        url = document.location.href;
                        if (bid_change) { bid_change = bid_change.innerText.replace(' %', '') } else { bid_change = '0' }
                        if (area) { area = area.innerText.replace(',', ''); } else { area = 'Unkown' }
                        if (url) { id = url.split('-'); id = id[id.length - 1] } else { id = null }
                        if (type) { type = type.innerText; } else { type = 'Unkown' }
                        if (size[0]) { kvm = size[0].replace(/\s/g, ''); } else { kvm = null; }
                        if (size[1]) { rooms = size[1].replace(/\D/g, ''); } else { rooms = null; }
                        if (monthly_fee) { monthly_fee = monthly_fee.innerText.replace(/\D/g, ''); } else { monthly_fee = null }

                        list.push({ 'url': url, 'id': id, 'address': address, 'broker': broker, 'price': price, 'price_kvm': price_kvm, 'sold_date': date_sold, 'kvm': kvm, 'rooms': rooms, 'area': area, 'rooms': rooms, 'monthly_fee': monthly_fee, 'bid_change': bid_change })
                    }
                    return list;
                })
                dataObj = dataObj.concat(results);
                if (currentPage < pageAmount) {
                    await Promise.all([
                        await page.waitForSelector('a.next_page'),
                        await page.click('a.next_page'),
                        await page.waitForSelector('.sold-property-listing')
                    ])
                }
                currentPage++;
            }
            browser.close();
            return resolve(dataObj);
        } catch (e) {
            return reject(e);
        }
    })
}
module.exports = webscraping;



const newPage = await browser.newPage();
await newPage.setUserAgent(userAgent.toString());

await newPage.goto(href);
await newPage.screenshot({ path: `dd.png` });

let pageContent = await newPage.content();

let data = await getSinglePageData(pageContent)

await newPage.close();
console.log(`clicked link`);