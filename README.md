# About project
  This project is based creating new porjects and tasks in those projects. Another user can collaborate on those tasks within his access control rights. For example - If he has been given right to create new tasks in project 1 then he can create new tasks inside that project.

  Comments are also available for each task. 
  If someone is assigned a task he will get notified about it and also when someone comments on task in which he is associated.

# Technicality of the project
  I was asked to indpendently chose the idea based on time provided in hiring assignment test. So I came up with this medium level complexity tasks. Which uses -
  1. NestJs.
  2. Graphql
  3. Comprises of different modules like users,projects,tasks,comments,uac(user access control),notification gateways,auth and cache.
  4. I have used guards for handling access controls(example of dependency injection).
  5. Also used factory pattern to derive a hibrid guard which changes depending on parameter provided.
  6. Made use of Adaptor pattern for sending grphql data back without it's generalized errors using DTO's.
  7. Made use of Notifications gateway and implemented it through new instances in each resolver constructor(A good example of Single Responsibility Proinciple).
  8. Similarly, I have built my own Cache module on top of Cache Module of redis and nestjs and used it by making new instances in each resolver constructor(This also is a good exmaple of Single Responsibility Principle).

# Steps to run
  Turn on docker and 
  Run `docker-compose up --build`
  Test on localhost:3000 port for testing API's and websockets.

# Link to postman documentation of API's 
https://documenter.getpostman.com/view/21465485/2sAYBYfVuU

# Images for Socket.io connection for notifications
![comment-update](https://github.com/user-attachments/assets/f703b2e4-079a-4125-99c0-2b906bac84a8)
![received-task](https://github.com/user-attachments/assets/33db8b55-61ce-4f97-9dbc-76d857b19226)

In case of websocket I am mapping auth token with client socket ID so you will need token in params and event listener of notification in your testing tool.Just like shown in above images. 


# Folder Structure
  - src
    - main.ts
    
    - app module

    - auth module
          - auth guard

    - access module
        - can view guard
        - can access guard
        - can assign guard
        - owner conditional guard
        - schema 
            - access schema
        - access resolver 
        - access service

    - cache module
        - cache service

    - comment module
        - dto/create-comment-input
        - schemas/comment.schema
        - comment resolve
        - comment service
          
    - notifications module
        - gateway
        - resolver
        - service

    - project module
        - create and update project dto
        - project owner guard
        - project - response dto
        - schema
            - project schema
        - service

    - task module
        - task dto
        - schema 
            - task schema
        - task resolver
        - task service

#API Walkthrough
https://drive.google.com/uc?id=1ECU70crCIAfdfVJ1AfCzhGS5uV2QsqXg&export=download
    




<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
