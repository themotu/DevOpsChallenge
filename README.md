# DevOpsChallenge

DevOps challenge for candidates to show us their stuff. 

The point of this challenge is for interviewing candidates to show us how they
would work through bootstrapping some DevOps and infrastructure related artifacts
in a repository with some backend and frontend code.
The code that is already in this repo isn't the important part.
The important part is understanding where everything is, what everything is,
and finding a solution that meets the project requirements.

# Where and What is Everything

This repo is set up in a way extremely similar to our main application repo.
There is a backend and frontend section in the application.
We use Golang as our backend language, and JavaScript (via Node) as our frontend
language.

## Backend

The backend code is located under the `app` directory.
It consists of a single package at the `app/internal/cli/shipyard-doc` directory.
There is a single Go file in that directory in the `main` package.

This program runs an `ls` sub-process every five seconds that prints the recursive
directory listing of the `./web/assets/` directory.
It additionally imports a single, external package that is included in the Go
module requirement.

You can run run this program locally with `go run ./app/internal/cli/shipyard-doc/`.
You can also build a local version of this package with `go build ./app/internal/cli/shipyard-doc/`.

### Go

Go has gotten to the point (since 1.12) where dependencies are managed through
Go modules.
We use Go modules to manage our dependencies in this repo, and expect solutions
to use Go modules as well.
[Here](https://golang.org) is a link the the main Golang website.

In short, with Go modules, packages will be installed as needed, and with the version
specified in the `go.mod` file.
However, `go mod download` can be used to pre-download all dependency versions
that are listed in `go.mod`.

## Frontend

The frontend code is located under the `web` directory.
It consists of the entrypoint at `web/app/index.js`.

We use Webpack to build and bundle our JavaScript frontend application.

You can use `yarn run serve` to invoke Webpack Dev Server and make sure everything
is installed correctly.
You can use `yarn run build` to build a production bundle for the JavaScript app.

Webpack is configured to output the files `web/assets/javascripts/app.js` and
`web/assets/stylesheets/app.css` under the production environment, i.e. after
`yarn run build`.

### JavaScript

We use Yarn as the dependency manager for JavaScript.
You can run `yarn install` to install all dependencies when `package.json` and
`yarn.lock` are present.

# Project Requirements

The goal of this challenge is to output a Docker container that contains the compiled
artifacts from the backend and frontend sections of the application.
The container should contain those artifacts in specific locations
