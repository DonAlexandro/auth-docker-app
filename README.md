# Auth Docker App

Simple app with registration and authorization based on docker containers.

## Installation

1. Clone repository
2. Create _.env_ (take keys from _.env.example_)
3. Fill username and password in app/config/config.js
4. Run `docker-compose up -d` or `docker-compose up -d --build` if you run it for the first time
5. Run script init_db.sh

## Endpoints

- `/api/signup` - Signup new user
- `/api/login` - Login to account
- `/api/logout` - Logout from account
- `/api/refresh` - Renew access token
- `/api/users` - List of users
