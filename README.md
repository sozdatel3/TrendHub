# TrendHub

This project is an implementation of a service that checks the GitHub API periodically to pull trending repositories with the most stars. It also provides a public API and a CLI client for interacting with the service.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [CLI Commands](#cli-commands)
- [Advanced: SPA Frontend](#advanced-spa-frontend)
- [License](#license)

## Features

- Periodically checks the GitHub API for trending repositories.
- Stores received repositories in a database PostgreSQL.
- Provides a public API with the following endpoints:
  - Get a repository by name or ID.
  - Get all repositories.
  - Force synchronization with GitHub, resets the internal timer for automatic sync.
- Includes a CLI client for interacting with the service.

## Technologies

- Node.js
- Express.js
- Axios
- Postgres
- React.js

## Getting Started

1. Clone the repository to your local machine.
2. Install the required Node.js packages using `npm install`.
3. Database Setup:
    Create a .env file in the root directory of the project.
    Inside the .env file, add the following variables and configure them according to your database setup:
    `DB_HOST` - The hostname of your database server.
    `DB_PORT` - The port number for the database server.
    `DB_NAME` - The name of the database you want to connect to.
    `DB_USER` - The username for authenticating with the database.
    `DB_PASSWORD` - The password for the database user.
    `STARS_NUMBER`  - Number of stars at which a repository is considered trendy
    `MAX_REPO_NUMBER` - The maximum number of repositories allowed (cannot exceed 100).
    `UPDATE_TIME` - The update interval for data synchronization (in minutes).
4. Run the server using `node server.js`.

## API Endpoints

- **GET /repositories**: Get a list of all repositories.
- **GET /repositories/:nameOrId**: Get a repository by name or ID.
- **GET /sync**: Start synchronization with GitHub.
- **GET /lastSyncTime**: Get the timestamp of the last synchronization.

## CLI Commands
All commands are available as soon as the server is started. Therefore, to get started, execute: 
`$ node cli.js`

#### Synchronize with GitHub

To start the synchronization process with GitHub, use the following command:
`$ sync`

#### Get All Repositories

`$ allRepo`
Use this command to retrieve a list of all repositories stored in the service's database. You can specify the number of repositories to display with the -n or --number option.


#### Find Repository by Name or ID
`$ findRepo [nameOrId]`
This command allows you to search for a repository by its name or ID. Replace [nameOrId] with the actual name or ID you want to search for.

#### Display Help

`$ help`
This command displays information about the available CLI commands.


## Advanced: SPA Frontend
This project includes a simple SPA built with React.js
that interacts with the service's API. You can find the SPA in the client directory.

To run the SPA, follow these steps:

Navigate to the frontend directory.
Install the required dependencies using npm install.
`npm run buildrun` - for start SPA

## License
This project is licensed under the MIT License.
