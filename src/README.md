# SDET SAT – Hotel Price Scraper (Playwright + JavaScript)

This project automates Booking.com using Playwright to find the
lowest listing price for a 5-night stay for 2 adults and 1 infant
at the highest-rated 5-star hotel in a given city.

## Steps Performed

1. Search for city
2. Apply 5-star filter
3. Sort hotels by rating
4. Open the highest-rated hotel
5. Check multiple future 5-night date ranges
6. Extract price for each date
7. Print the lowest price

## Tech Used
- JavaScript
- Playwright

## How to Run

npm install  
npx playwright install  
node src/scraper.js
