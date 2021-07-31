**Crypto 455 Trading Platform**


High-level Description (Project Milestone 5)

Our project is a Trading platform for Cryptocurriences. We envision it to be a place for experienced crypto traders, and beginners alike
to discover the top cryptocurrecies in real time, and to be able to trade crypto, maintaining an investment portfolio in the hopes of 
becoming the latest crypto-millionaire! Thanks for checking out our project! :)

Who is it for?

- Those interested in researching and/or trading cryptocurrencies

What will it do?

- View current crypto prices/trade crypto

What type of data will it store?

- Basic user information, current and historical crypto prices, portfolio values

What is some additional functionality you can add/remove based on time constraints?

- Most stretch goals - additional security features, trading with real crypto instead of paper money, subaccounts

**Feature requirements:**

*Minimal*
- [x] View real time price of cryptocurrencies. 
- [x] View current portfolio
- [x] Discover new crypto

*Standard*
- [x] Login Authentication
- [x] Tables to get more information about top cryptocurrencies
- [x] Sign Up/ Sign In capability
- [x] Store user and portfolio information in MongoDB
- [x] Deployment to AWS
- [x] Graph Visualization in real time of cryptocurrency prices
- [x] WebSockets connection to Kraken API and Coinbase API for pulling latest crypto data
- [x] SNS,SQS, Lambda serverless (additional AWS backend)
- Able to trade (purchase/sell) currency

*Stretch*
- Historical portfolio value
- Historical Graph data
- AWS ec2 automated deployment via github
- NFT Auctions
- 2FA/MFA
- Group game (e.g. investopedia)
- Subaccounts/managing others'/friends' crypto
- ~~Trading with real crypto/money~~
- ~~Payment integration for cash deposits~~
- Complex closing options (conditional buy/sell)
- Import data from existing exchanges
- Technical indicators/complex charting
- Options trading
- Simplified vs advanced crypto view
- ~~News~~
- ~~Social media (e.g. "Twitter" feed to promote NFTs)~~

**Breakdown**

View current portfolio
- Get coin prices
- Calculate individual portfolio coin values
- Sum total portfolio value
- See daily change in portfolio value

Explore new cryptocurrencies and Trade Crypto
- Browse for top cryptocurrencies in Discover Page
- Display cryptocurrency information (price,daily high, low, etc)
- Buy and sell cryptos to your portfolio

