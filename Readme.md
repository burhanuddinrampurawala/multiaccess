# Multi level access webpage 
## features:
- single page application
- frontend build on **reactjs**
- backend build on **nodejs**
- uses **mobx** for state management
- uses **webpack** to bundle react components
- uses **json web tokens** for authentication
- uses **express** framework for routes
- uses **postgres** as database
- uses **docker** to create an environment
- password is stored as an **hash**
- based on **MVC** 
- response sends various  security headers
- request won't work until you send a particular header `poweredup:true` 

## Getting started:
- install docker
- enter inside the directory on terminal 
- `docker-compose up`
- open *127.0.0.1* on your browser

## Access level
- Owner
  - can add user
  - can delete user
- Admin
  - does basically nothing
  - admin does not have access to add or delete a user

```
username: helloworld
password: 123
```
  
