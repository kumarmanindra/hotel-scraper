# SDET SAT – Hotel Price Scraper (Playwright + JavaScript)

This project uses Playwright with JavaScript to automate Booking.com and find the lowest listing price for a 5-night stay for 2 adults and 1 infant at the highest-rated 5-star hotel in a city.

## Steps Performed

1. Search city on Booking.com
2. Apply 5-star filter
3. Sort by rating
4. Open top-rated hotel
5. Try multiple future 5-night dates
6. Extract prices
7. Print lowest price

## Run the project

npm install  
npx playwright install  
node src/scraper.js
