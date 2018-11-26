# SimpleStocks

[Deployed Site](https://simple-stocks-ttp.herokuapp.com/)

## About

SimpleStocks is a web application that allows a user to purchase stocks at their current prices using the IEX API. The front end utilizes React and Redux to control and manage state, while the back end runs on an ExpressJS server and a PostgreSQL database.

## Setup

To use this app, you'll need to take the following steps:

- Run the following commands:

```
git clone https://github.com/Jessupcn/TTP-FS-20180728
```

## Customize

Now that you've got the code, follow these steps to install dependencies:

- Run `npm install`, or `yarn install`
- Create a PostgreSQL database named `simple-stocks`

## Start

`npm run start-dev` will create bundle.js and run the server.

## My approach

I started by building out my backend with a simple ExpressJS server and a PostgreSQL database. I then moved on to create some API routes I knew I would need later to access my data. Once this was done, I moved onto the frontend, building with React and Redux. I used Redux "Thunks" to dispatch asynchronous fetching functions to bring back data, which I then stored on the redux store, making sure it was accessible for any components that need it. After this point, I spent a lot of time finding edge cases and returning informative error messages for the user. Lastly, I added more validations and salted users' passwords to add another layer of data protection.

## Tradeoffs I made

One tradeoff I made was when users make a transaction, I make a call to the IEX API on the front end rather than the backend. While this seems like a call that should be made from the backend, one of my goals in the future is to add the ability to confirm with the user whether they are sure about the price of buying the quanity of stocks they have selected. This means I need access to the stock price on the front end before sending updates to my database.

## Future goals

In the future, I have 2 goals:

1. I am working on the ability for the user to also sell stocks from their portfolio. This will essentially be the same as the "Make Transfer" form, however, it will require some different error handling messages as well as removing stocks instead of adding them to a users portfolio.

2. I would like to create and use a visual for a users total portfolio over time. This will require taking a snapshot on a certain interval and using all that data to create a graph.

## Credits

[Connor Jessup](https://www.linkedin.com/in/connor-jessup/) - [Jessupcn](https://github.com/Jessupcn)
