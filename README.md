# DevBook

[Deployed Site]()

## About

SimpleStocks is a web application that allows a user to purchase stocks at their current prices using the IEX API. The front end utilizes React and Redux to control and manage state, while the back end runs on an ExpressJS server and a PostgreSQL database.

## Setup

To use this app, you'll need to take the following steps:

- Run the following commands:

```
git clone https://github.com/devbook-live/DevBook.git
```

## Customize

Now that you've got the code, follow these steps to install dependencies:

- Run `npm install`, or `yarn install`

## Start

`npm run start-dev` will create bundle.js and run the server.

## My approach

I started by building out my backend with a simple ExpressJS server and a PostgreSQL database. I then moved on to create some API routes I knew I would need later to access my data. Once this was done, I moved onto the frontend, building with React and Redux. I used Redux "Thunks" to dispatch asynchronous fetching functions to bring back data, which I then stored on the redux store, making sure it was accessible for any components that need it.

## Tradeoffs I made

## Future goals

## Credits

[Connor Jessup](https://www.linkedin.com/in/connor-jessup/) - [Jessupcn](https://github.com/Jessupcn)
