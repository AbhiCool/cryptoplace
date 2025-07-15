# Cryptoplace

Cryptoplace is a mini-project built using React. It uses the external API from CoinGecko to get live data about different crypto coins.

I used React hooks like useState for managing state, useEffect for fetching data from the API, and useContext to pass data to child components without prop drilling.

For navigation between pages, I added React Router DOM. To show the last 10 days’ price changes of a cryptocurrency, I used React Google Charts to display a line chart.

I also used Tailwind CSS for styling the entire app. Tailwind helps build responsive and clean layouts easily, and makes sure the app looks good on both desktop and mobile screens.

The app has a home page that lists many cryptocurrencies with their prices and daily changes. You can click on a coin to see more details, like its description, market data, and a price chart.

The project is deployed on Vercel.

https://cryptoplace-tau.vercel.app/
