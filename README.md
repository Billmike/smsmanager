[![Coverage Status](https://coveralls.io/repos/github/Billmike/smsmanager/badge.svg?branch=develop)](https://coveralls.io/github/Billmike/smsmanager?branch=develop)

# SMS Manager

## Introduction

> **SMS Manager** is an application built using Node, Express and MongoDB that enables users send and receive SMS

## Table of Content
- [Features in the application](#features-in-the-application)
- [Technology stack used](#technology-stack-used)
- [Getting Started](#getting-started)
- [API Docs](#api-docs)

## Features in the application

* User can send SMS
* User can receive SMS
* Deleting a user deletes all reference to messages they sent or received

## Technology Stack used

* NodeJS
* ExpressJS
* MongoDB
* Mongoose

## Getting Started

* Before cloning the repo, make sure you have Node installed on your local machine
* Clone the repo to your local machine

```sh
> $ git clone https://github.com/billmike/smsmanager.git
```

* Change directory into the more-recipes directory

```sh
> $ cd smsmanager
```

* Install all required dependencies by running

```sh
> $ npm install
```

* Once installation is done, create a `.env` file and fill it with the neccessary environment variables (**see `.env.example` for the neccessary environment variables required**)
* Create a database to be used with the application

* To start the application, run

```sh
> $ npm start
```

## API docs


* POST `localhost:8080/contact/create`

  * To create a user, hit this endpoint via postman and supply the `firstName`, `lastName`, and `phoneNumber` properties to the request body

* DELETE `localhost:8080/contact/:userId`
  * To delete a user from the application, supply the userId of the user as a params to the route.
  
  **NOTE**: Deleting a user removes all messages they've sent or received in the application

* POST `localhost:8080/message/send-msg`
  * To send a message, hit this endpoint via postman and supply the `message`, `senderContact` and `receiverContact` as properties to the request body

* GET `localhost:8080/message/sent-sms/:userId`
  * Enter the url above to get the messages sent by a particular user in the application. Provide the userId as a params to the URL

* GET `localhost:8080/message/receive/:userId`
  * Enter the url above to get the messages received by a particular user in the application. Provide the userId as a params to the URL
