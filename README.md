# node-express-microservice
![GitHub](https://img.shields.io/github/license/soker90/node-express-microservice)
![](https://github.com/soker90/node-express-microservice/workflows/Node.js%20CI/badge.svg)
[![dependencies Status](https://david-dm.org/soker90/node-express-microservice/status.svg)](https://david-dm.org/soker90/node-express-microservice)
[![devDependencies Status](https://david-dm.org/soker90/node-express-microservice/dev-status.svg)](https://david-dm.org/soker90/node-express-microservice?type=dev)
[![codecov](https://codecov.io/gh/soker90/node-express-microservice/branch/master/graph/badge.svg)](https://codecov.io/gh/soker90/node-express-microservice)


This repository contains a API Microservice Starter.

## Requirements

* [MongoDB](https://www.mongodb.com/download-center "MongoDB")
* [NodeJS v14](https://nodejs.org/en/download "NodeJS")

## Start in development

You have to use the following command to start a development server:

```sh
npm run start:dev
```


## Start in production

Use following command to start project on staging and production environments:

```sh
npm start
```

## Tests

Following tests libraries are used for unit/integration tests:
* [Jest](https://jestjs.io/)
* [SuperTest](https://github.com/visionmedia/supertest#readme)

Use following command to run tests coverage:

```sh
npm test
```

## Docker container

See `Dockerfile` for more details.
