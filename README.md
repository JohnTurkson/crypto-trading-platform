***Crypto 455 Trading Platform***

**1. High-level Description**

Our project is a Trading platform for cryptocurrencies. We envision it to be a place for experienced crypto traders, and beginners alike to discover and monitor cryptocurrencies in real time, and to be able to trade crypto, maintaining an investment portfolio and helping to keep track of your (simulated) crypto investments over time! Thanks for checking out our project! :)

**2. Feature Goals:**

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
- [x] WebSockets connection to Kraken API and Coinbase API for pulling the latest crypto data
- [x] Able to trade (purchase/sell) currency

*Stretch*
- [x] AWS Lambda, SNS, SQS; Serverless
- [ ] Historical portfolio value
- [ ] Historical Graph data
- [x] AWS EC2 automated deployment via GitHub and AWS CodeDeploy
- [ ] 2FA/MFA

**3. Description on how tech from Unit 1-5 are used**

[5:
Usage of tech includes best practices. Code is clean and clear. Description of usage explains in-depth how the technology has made the app better. Possibly a mention of how it compares to other similar tech. Documentation demonstrates a solid understanding of the tech learned throughout the term, and its purpose in creating a production-level full-stack web application.]

Unit 1: HTML, CSS, JS

Our application front-end and back-end is written in Typescript, (all our files are .ts/.tsx) which is a superset of Javascript (but with statically typechecked objects).  We chose Typescript since it has compile-time type-checking, so we can be certain that any inputs are of the correct type. Also note that Typescript is a compiled language, while Javascript is an interpreted language. This greatly helps us when debugging, since we can immediately see why some functionality is not working as intended, or does not compile. Despite there being an intermediate compilation step (especially when working with React), we found that the benefit of additional checks that the props that we pass in to all our components are well-formed greatly outweighs the slight additional time needed when hotloading the app. Additionally, on the serverside typechecking was immensely useful to spot potential errors before they occur, especially when debugging can become tedious (either looking to logs on our deployed VM, or through CloudWatch for our Lambda functions), greatly minimizing programmer errors as well as cognitive overhead when developing for both the frontend and backend.

We also wrote plenty of JSX (which is a mix of HTML and JS) in our Functional Components for React. This JSX code is used to mainly describe what the UI of our app, typically written in the return() function of components which render the JSX code on the application. A benefit of JSX over "vanilla" Javascript is that JSX allows us to both develop and visualize our UI in a declarative manner, ahead of time. This often results in declarations that are "stateless", which have the benefit of reducing the cognitive overhead and code handover when multiple people are working on related components, being able to quickly visualize the UI "at a glance" while also avoiding mutating state or building up complex elements to be injected into the window, which simplifies the overall development of frontend code.

We mainly used Material UI to style the components on our application with a modern taste, however we also used custom CSS to arrange the layouts of the components, in particular for the portfolio page, since Material UI is a 3rd party library it was a bit too restricting for what we wanted to do. We ended up choosing Material UI due to its maturity (over 70k stars on GitHub), while also being the basis of other, popular platforms (Android), along with its capabilities to integrate well with other common frontend frameworks, like React Router and styled-components. Compared to other popular frameworks out there, like ant-design, we felt that Material UI was more opinionated in guiding the overall design of our app, but not to an excessive degree. We felt that Material UI was still a massive improvement over standard HTML + CSS (and other templating languages), and were satisfied with its capabilities overall, being able to construct all the components we aimed to build without excessive difficulty. One of the biggest benefits to Material UI lies in its extensive documentation, with rich examples both in Javascript and Typescript, along with in-depth guides on components and their best practices. For relatively inexperienced developers like ourselves, many of these docs proved to be invaluable when developing our project, and saved us countless hours that would have otherwise been used to scour for lower-quality documentation through other sources, like StackOverflow and Medium.

We did not write much plain HTML since using React + Typescript + JSX leads to a much faster, maintainable, and scalable application and codebase. Using raw HTML along would lead to a lot of repetitive code and the styling would be basic, while using React + Material UI + Custom CSS ends up reducing the cognitive overhead of developing most of our layouts, as we can utilize reusable components to reduce repeating code and help modularize and reason about our design, as well as make our application have a more modern look.

So while raw HTML, CSS, JS can be used in creating basic full-stack web applications, we moreso utilized React + Typescript + JSX for its numerous advantages listed above.

Unit 2: React

Our frontend framework of choice was React. We have utilized React Functional Components with Hooks to manage state, to create separate, reusable components such as a Asset component, a Asset Table component, a Charts component to visualize crypto price data in real time, a Navigation Bar component, Trade component, and more. This is one of the best features of using React, the ability to conceptualize and reason about features compartmentalized in the form of Functional Components, and the ability to re-use these components effortlessly throughout the entire application, is remarkable.

We were impressed with the ease of setup with using create-react-app, and were also impressed at its support for Typescript, with typed support for hooks and functional components. We also took initiative to learn React Router in order to set up the navigation between pages of our Application seamlessly, and Material UI to make our components look nicer.

React serves an important purpose in creating a production-level full-stack web application, since it allows us to create a front-end that is fast, scalable, and simple. Once some state changes, the application will automatically re-render components, and update children. It also has uni-directional data flow from parents to children, which results in stable code.

Compared to other popular frameworks, we felt that React was the all-around best choice for a new project due to the following reasons: its popularity and subsequently maturity lends to its confidence as being the de-facto frontend framework, this is a net positive due to the feedback loop of its surrounding developer advocacy, sponsorship by Big Tech (Facebook, and others), as well as iteration of features, which (arguably) make it more difficult for other Frameworks to establish themselves in the scene, but overall solidifies React's position and stability as being the "default" framework to use, and provides developers with the confidence ultimately with building something that will end up lasting.

Compared to other frameworks, we briefly looked into other major frameworks like Angular, and while its support and integration with Material UI was on-par or slightly better, we felt that it was too opinionated to be an ideal frontend framework. Its differences with manipulating the physical/virtual DOM may introduce gotchas when switching between different frameworks, and its overall dated nature may lead to stagnation in its ecosystem. A stronger contender was Vue.js, being very comparable to React, but we didn't notice as much documentation with more advanced concepts like the equivalent of custom hooks and other things like state management and server-side rendering.

There were also other "wildcard" frameworks that we briefly saw but didn't look much into, like Vercel. We liked the concept of an "all-in-one" solution, which we felt React was lacking, and the concept of simplified serverside rendering was definitely interesting, but we didn't perceive the same level of maturity in its ecosystem compared to React.

Furthermore, we could have purely used HTML/CSS/JS from Unit 1 for the front-end of the project. Although, it would be more challenging to style our features with a modern UI, and to write scalable, and maintainable code this way. Very quickly we would have to copy and paste the parts of the code we want to reuse, (reusable components) and so it would be hard to conceptually understand the codebase. So the decision to use React was a good idea!

Unit 3: Node and Express

Our application back-end code is written using Node and Express. We have utilized Node and Express in order to separate the server-side and client-side, which helps us reason about our project in these two compartments, as well as helps us test these two sides separately using tools such as POSTMAN. This is called; "Separation of Concerns", as described in the workshops slides. The primary way we achieved this was through a monorepo each containing the parts relevant to various parts of the app, specifically having separated modules for the frontend, backend, and various microservices. This allows the frontend and backend to share common resources like network requests and responses.

We have written HTTP requests (such as GET/POST/PUT/PATCH/DELETE) for User signup and login, and for Portfolios and Trade (Buying and Selling) functionality, conforming to the REST API standards and CRUD. We used Express to quickly and easily set up the server side codebase.

Node and Express serves an important purpose in creating a production-level full-stack web application, since it allows us to easily and quickly separate our project into server-side and client-side code. This is ideal for a few reasons, such as: since the users do not want to know about all the backend details they can abstract it away with this set-up as the server-side code is private, the users can't change our code, and the user's can only modify exactly what we allow them to do with the HTTP requests. We felt that express was an adequate framework for serving requests, but still suffered from some inconveniences like poor typescript support, and subpar documentation.

To compare with similar tech, there are some alternatives to Node and Express, such as Deno, which is actually created by the original creator of Node. Some differences between the two are that Deno does not require a package manager, (packages are linked directly via URL) while Node comes with the NPM package manager. This means no more node_modules folder if you're using Deno. Also, Deno cares a lot about security as it executes the code in a sandbox so the program by default does not have access to the file system, environment, variables, scripts, while Node does. But, Node is much older than Deno and is much more used by developers, so the support and recognizability of Node is much higher.

Overall, we felt that express was "sufficient" for the job at hand, but didn't provide a "seamless" integration with what we were trying to build with our project. We heavily utilized websockets in our project, and the extra configuration of installing additional packages to handle websocket connection adds additional complexity to our application setup. We also felt that using express alone doesn't scale well with the number of endpoints used. A big goals of ours was for our app to scale as seamlessly as possible, which would not be possible with express as the number of our endpoints keeps increasing as all routes are served from a single machine. This was the main motivation behind the use of other solutions (in addition to express) like AWS to serve and scale our app.

Unit 4: MongoDB

Our application uses MongoDB as a NoSQL database to store data such as user account information, crypto prices, user portfolios, and more. Using a separate database like MongoDB to house our data has significant advantages, since otherwise if we just stored our data locally we would not be able to scale quickly, our code would get cluttered, and it would be difficult to parse, not to mention there would more security concerns. Also, if we simply stored the data locally on every time the user visits the website, their data could potentially get lost or reset, but using MongoDB we can safely store this data externally.

We chose to use MongoDB which is a NoSQL database (non-relational) rather than an SQL database (relational) such as MySQL, since NoSQL has more flexible data models as there is no need for a schema, also for its ability to horizontally scale on multiple servers quickly, as well as high availability and fault tolerance, which are important for a quickly growing cryptocurrency application that needs to always have its data quickly available.

The NoSQL nature of mongodb made it easier to form queries, and the ease of integration with Javascript/Typescript allows for less errors to be made. We appreciated this layer of abstraction when writing functions to store and update our data in MongoDB, allowing us to reuse queries efficiently in native Javascript/Typescript.

MongoDB definitely has a important purpose in creating a production-level full-stack web application, since storing large amounts of data and being able to retrieve it quickly is crucial for many such applications. Furthermore, we found MongoDB Atlas to be an easy-to-use platform as a database service, abstracting away the management of databases itself. This is a frequent problem for other, typically SQL solutions where database provisioning and security have to be handled on your own.

Unit 5: Release Engineering

Our application is deployed using AWS. This is in contrast to the course suggestion to use Heroku for a few reasons, such as: we are already using various AWS services for hosting our APIs so it is quite seamless to use AWS for deployment, also that since it's on our own virtual machine there are no start-up times, while using Heroku for the assignment we noticed significant start up times.

Due to our project structure being in a monorepo, it would have been much harder to have everything run from a single build script. This is one of the reasons why we chose to use AWS over Heroku. AWS CodeDeploy gives us the flexibility to configure our deployments to our virtual machines on EC2 in a granular manner, which allows us to independently deploy each module of our app on their own. Although there was some setup required with integrating our GitHub repository with AWS CodeDeploy, the freedom that it gave us with automated deployments outweighed the initial configuration required.

For our application codebase, we chose to use a mono-repo rather than a many-repo because our code-base is quite small, also some of us on the team are working full-stack so it is easier for them to access the entire code-base this way. In addition, we wanted to reduce dependency hell as much as possible, commonly associated with many-repos.

The main reason why we chose to use AWS is due to the use of persistent websocket connections to retrieve and store price data for cryptocurrencies. Due to the limitations with the Heroku free tier becoming inactive after 30 minutes, we deployed our express routes to AWS EC2, which handles price updates and processing of the trade queue. Instead of GitHub Actions, our deployment process instead uses an appspec.yml file, which allows for the deployment and configuration to AWS EC2.

Overall using Git and AWS for release engineering has an important purpose in creating a production-level full-stack web application, since they help address issues such as managing and building maintainable code, and making collaboration among contributors easier, which is important when scaling the application.

Project Organization:

Unit 1 (HTML/CSS): contained in /client, and /build (static assets for HTML/CSS/JS)

Unit 2 (React): contained in /client, most files (.ts/.tsx)

Unit 3 (Express): contained in /server/src/app.ts (routes), /server/src/handlers/.*.ts

Unit 4 (Mongo): contained in /server/src/database/

Unit 5 (Release Engineering): contained in appspec.yml

**4. Description of ‘Above and Beyond’ functionality**

Please give a clear description and in-depth explanation of how you went above and beyond the requirements of the course.

[9:
This project is a show-stopper and goes beyond the complexity of other projects. Would have expected this to be produced by a small start-up. We expect few or no projects to earn this rubric item in any given year. It’s here for truly exceptional work communicated effectively to the grading team.
6:
This project goes well above and beyond the requirements, including multiple points from level-3 of this rubric, or one particularly complex piece of technology.
3:
Project goes beyond the basic requirements by incorporating one to a few “extra” requirements. Some examples could be: Fully responsive, fully accessible, uses external APIs, implements a complex algorithm, utilizes ML/AI, did research for UX, supports multiple languages and/or timezones, uses location services, integrates with social media.]

We used the React HighCharts API to plot the price data for each crypto in real-time. We experimented with many different charting API’s but eventually decided on the React HighCharts API. We also had to integrate the Websockets price data connection with this API, re-rendering the graph on every price update.

Since we're building a trading platform, we wanted to go above and beyond with two main areas of our app: scalability, in the form of updates handled per second, and performance, by optimizing latency as much as possible.

We achieved these aspects by separating the various "parts", or features, of our app into separate microservices, which allows them to be scaled much more easily (with the help of AWS).

Our repo is organized as a monorepo with 3 main parts: a "client" module, which contains our frontend code and assets, a "server" module, which contains our express routes and data processing, and our "handlers" module which composes the bulk of our microservices.

Each feature is essentially its own "microservice", for example, the "withdraw assets" function is organized as a separate service as the "create trade" function. We are able to achieve this architecture through the user of serverless functions on AWS Lambda.

With lots of data from real-time prices, as well as pushing data from 3rd party APIs to all of our connected users, we knew that with Express running on a single Virtual Machine to serve all our routes, obtain price updates, process open trades, and maintain Websocket connections, we wouldn't be able to scale well, so we decided to use various AWS services in order to effectively scale our app. These include AWS API Gateway (for both Websockets and REST endpoints), AWS Lambda, SNS, SQS, and DynamoDB.

AWS API Websocket Gateway - the main advantage here is it provides us with AWS-managed Websocket connections, which allows us to easily scale to as many ws connections as needed, and makes things more adaptable to burst loads.

AWS Lambda - besides Express, this is the bread and butter of our app: it processes requests in parallel, and more importantly scales to as many requests as we need through the invocation of individual functions for every API request that is received.

AWS SNS + SQS - decoupling our trade and price updates from processing, allows for pub-sub and fan-out processing of our ingested 3rd party data.

AWS DynamoDB - allows for low-latency updates to a database, allowing us to process our trade queue in parallel with as many workers as needed, which helped us scale our trading features.

However, we weren't able to make all of our code serverless, as there isn't any way to maintain long-running connections via AWS Lambda. Therefore, we still have a single EC2 instance to handle persistent connections to 3rd part APIs (for price data). At the end of the day, this is still manageable as this service doesn't need to scale according to the number of active users we have at a time, as it broadcasts updated to an SNS topic, which allows us to scale real-time price updates to as many users as needed, without needing to scale our own hardware.

In addition to scalability, we also wanted to optimize our app for latency. There were several components to this:

Price updates - these are pushed to users via a persistent Websocket connection, so there isn't a need to periodically poll our APIs, which would introduce slight latency.

Network requests - we optimized these through the use of API Gateway, which proxies requests to AWS Lambda, and automatically handles load balancing both when a request is received as well as through the use of AWS Lambda.

Databases - We migrated to using MongoDB only for data that doesn't change often, like user data and portfolio metadata, and we instead chose to have frequently updated data with a specialized, low-latency database, which in this case was AWS DynamoDB, which allows for efficient parallel processing of data.

Static assets - With a single Virtual Machine, high loads can degrade the performance of the entire app, which is why we are serving most of our frontend assets through a CDN (AWS CloudFront) backed by optimized asset storage (AWS S3). This provides not only with scaling and low-latency requests via AWS' peering network, but also has caching built in, allowing us to take load off our key services like price updates and trade queue processing.

Furthermore, we also have automated deployment configured via AWS CodePipeline and CodeDeploy, which defines a pipeline to update our served assets and price-handling code on EC2 whenever updates are pushed to a GitHub branch. The contained appspec.yml file defines how our code is deployed, and makes deployment time quicker due to continuous deployment.

Finally, as you may notice our app is not hosted on Heroku, but on various parts of AWS. There is no single point that our app originates on, but it instead lives across various different services that link together to provide for all different "parts" of our app, like data storage, price updates, and trade processing. By doing so, there is no "single point of failure" of our app, which makes it more robust to failures in any individual part. In our opinion this was a major benefit of integrating with AWS over a simple deployment solution like Heroku. Our failures are isolated and more importantly, our app can be scaled based on our specific needs. By designing our app from the ground up to scale horizontally instead of vertically, we are able to serve a much larger number of users with ease.

**5. Description of Next Steps **

What would you do next to further improve the app, or add additional relevant functionality? You may want to reference your in-progress or incomplete goals in this section. [2-3 sentences]

[3:
Documentation clearly describes specific, relevant goals that would continue to improve upon the functionality or usability of the app. It is clear how this would be incorporated into the existing app.]

To further improve the app, we would finish some additional features which includes: we could store each user's historical portfolio value, as well as historical crypto price data, and display and visualize it in the form of a chart, as we already have the chart component. Also, we could add features such as implementing conditional trading options, (buy/ sell crypto when some condition is satisfied) cash deposit integration for real money trading on the blockchain, as well as the ability to import your portfolio data from other trading applications to ease the transition to using our platform. (In addition, more support for accessibility would be finished, such as a Dark Mode, and the option to switch languages.)


**6. List of contributions **

Highlight areas where each team member contributed significantly. [2-3 sentences per team member]

[3:
It is very clear which team member worked on which parts of the application. The documentation describes at least one area/issue/technology where each team member took a substantial leadership role, and that team member’s contribution is reflected in the project.]

Andy Kwan:

Andy Kwan worked in both front end and back end, and took a leadership position for login authentication. Andy Kwan ensured that login authentication worked correctly by tested it in all possible cases and edge cases for correctness. Andy Kwan also worked on the Navigation Bar, and contributed to the Portfolio feature in the front end.

Ryan Liu:

Ryan primarily worked on the front-end, taking a leadership role in front end components such as Asset, the Asset Tables in the portfolio and the discover page, and the Charts component to visualize and graph the crypto price data in real-time. Ryan contributed by taking initiative to learn and utilize Material UI for the Asset Tables, React Router to set up Links between the Coins and their respective Charts pages, and Websockets API to be able to get real-time data for each crypto. Ryan also worked on the documentation.

Andy Ma:

Andy Ma worked in both front end and back end, and took a leadership position for Trading functionality. Andy Ma built the trading feature by setting up the endpoints in the backend, ensuring that the data was in the correct format, and designing the infrastructure for this feature. Andy Ma also contributed to the Portfolio feature.

John Turkson:

John took a leadership role in the back-end, working to set up all of the external API's, Websockets, AWS, MongoDB, Express, and any endpoints we needed in the front end. Contributed significantly to the project by setting up AWS for the ability to scale our application quickly and seamlessly, as well as using AWS for deploying our project in order to prevent boot-up times associated with other means of deployment such as Heroku.


***Extra information from Prototyping:***

Who is it for?

- Those interested in researching and/or trading cryptocurrencies

What will it do?

- View current crypto prices/trade crypto

What type of data will it store?

- Basic user information, current and historical crypto prices, portfolio values

What is some additional functionality you can add/remove based on time constraints?

- Most stretch goals - additional security features, trading with real crypto instead of paper money, subaccounts

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

![Screenshot](prototypes.png)
