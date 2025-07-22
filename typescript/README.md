# To run the code

## Installation

### Install nvm (optional)

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Running the above command downloads a script and runs it. The script clones the nvm repository to `~/.nvm`, and attempts to add the source lines from the snippet below to the correct profile file (`~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`).

```sh
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

This is optional you can choose to directly install node directly (node >= 20.18.1)

### Install node using nvm

`nvm install 20.18.1`

### Install yarn (optional)

`npm install --global yarn`

This is optional, you can choose to use `npm` itself.

### Install node dependencies

`yarn install` or `npm install`

### Database

This application uses PostgreSQL as the database. You can install it using your package manager or download it from [PostgreSQL's official site](https://www.postgresql.org/download/).

Alternatively, you can use Docker with docker-compose to run PostgreSQL:

```sh
docker-compose up -d postgres
```

Make sure you create a `.env` file in the root directory to create the necessary url connection to the database. You can use the provided `.env.example` as a template, the value in the example is using the connection to the values defined in the docker-compose file for the postgres connection.

## Run the server

Before you run the application you need to ensure the database is set up correctly, and the migrations are applied.

### Deploy database migrations

`yarn migrate:deploy`

### Dev server while watching

`yarn dev`

### Test suite while watching

`yarn test`

### Run server

`yarn start`