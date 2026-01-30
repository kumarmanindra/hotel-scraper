const { chromium } = require('playwright');
const { getFutureDateRanges } = require('./dateHelper');

const CITY = 'Goa';



// ✅ Popup handler function (ADD THIS AT TOP)
async function closePopup(page) {
  try {
    // Genius / Sign-in popup
    const genius = page.locator('button[aria-label*="Dismiss"]');
    if (await genius.isVisible({ timeout: 3000 })) {
      await genius.click();
      console.log('Genius popup closed');
    }

    // Cookie popup
    const cookie = page.locator('#onetrust-accept-btn-handler');
    if (await cookie.isVisible({ timeout: 3000 })) {
      await cookie.click();
      console.log('Cookie popup accepted');
    }

  } catch (e) {
    // ignore if not present
  }
}


(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('Opening Booking.com...');

  // Step 1: Open city page
  await page.goto(`https://www.booking.com/searchresults.html?ss=${CITY}`);

  // Step 2: Apply 5-star filter
  await page.waitForSelector('input[name="class"][value="5"]');
  await page.click('input[name="class"][value="5"]');

  console.log('Applied 5-star filter');

  // Step 3: Sort by rating
  await page.click('[data-testid="sorters-dropdown-trigger"]');
  await page.click('[data-id="review_score_and_price"]');

  await page.waitForTimeout(5000);

  // Step 4: Get first hotel
  const firstHotel = page.locator('[data-testid="property-card"]').first();
  const hotelLink = await firstHotel.locator('a').first().getAttribute('href');

  if (!hotelLink) {
    console.log('Hotel link not found');
    await browser.close();
    return;
  }

  console.log('Opening highest-rated hotel...');

  const hotelPage = await browser.newPage();
  let lowestPrice = Number.MAX_VALUE;

  // Step 5: Loop dates
  for (const range of getFutureDateRanges()) {
    const url = `https://www.booking.com${hotelLink}&checkin=${range.checkin}&checkout=${range.checkout}&group_adults=2&group_children=1&age=1`;

    console.log(`Checking dates: ${range.checkin} to ${range.checkout}`);

    await hotelPage.goto(url);
    await hotelPage.waitForTimeout(5000);

    const priceLocator = hotelPage.locator('[data-testid="price-and-discounted-price"]').first();

    if (await priceLocator.isVisible()) {
      const priceText = await priceLocator.innerText();
      const price = parseInt(priceText.replace(/[^\d]/g, ''));

      console.log(`Price: ₹${price}`);

      if (price < lowestPrice) {
        lowestPrice = price;
      }
    } else {
      console.log('Price not found for this date');
    }
  }

  console.log(`\n✅ Lowest Price Found: ₹${lowestPrice}`);

  await browser.close();
})();
