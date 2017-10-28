# bablog

## Installation

1. Install [nvm](https://github.com/creationix/nvm).
2. Run `nvm install` to install the needed Node version.
3. Install [yarn](https://yarnpkg.com/).
4. Run `yarn` to install the dependencies (make sure postgresql client libraries are installed so that `pg` package could compile).
5. Run `createdb bablog_dev` to create the database.
6. Run `yarn migrate` to create appropriate tables.
7. Use `yarn dev` for development.
