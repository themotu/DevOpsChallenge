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
The container should contain those artifacts in specific locations such that running
the container should result in output similar to what you would get running
`go run ./app/internal/cli/shipyard-doc/` from the top level directory of this repo.

The following are required:
1. The version of Go used to compile the backend must be 1.13+.
2. All Go binaries must be statically compiled. You can use `go build -a -ldflags '-w -extldflags "-static"'` as a guide
    for the compilation step.
    You should explicitly disable CGO, and set the GOOS and GOARCH environment
    variables to linux and amd64, respectively.
3. All Go binaries must be placed in the `/usr/local/shipyardapp/bin/` directory.
4. That directory (where the binaries go) should be in PATH, such that entrypoint can simply be "shipyard-doc".
5. The version of Node used to build the frontend must be 10.16+.
6. The frontend artifacts must be placed relative to the working directory at `./web/assets/`
    so that the `shipyard-doc` binary produces the correct output.
7. The container should run under the user `shipyardapp`, and the working directory
    should be that user's home directory. This user should be like any "normal"
    user under Linux, without sudo and other extra permissions.
8. The final image should be based off of `debian:stretch`.
9. The image should expose the port 8080 in the Dockerfile.
10. You should be able to run the container with exactly `docker run shipyardapp-web`.
    You should be able to stop the container with a `docker stop` command.

## Your Solution

Your solution should be as close to production ready as possible.
You should first clone this repo and then modify it on your local machine until
the solution works.

You may add any directories and files you wish.
We want to see what the end result looks like if you were to treat this like our
real repository.
So, any scripts, documentation, or whether else you see fit, should be in the final
solution.

Points are awarded most for correctness.
More points are awarded for solutions that are documented, easy to use, require
few to no more dependencies (outside of Docker, Go, and Node), repeatable,
and easy to automate and expand upon.

With your submission, you will need to provide the steps required (after installing
from your archive) to build the solution.
This means all the steps needed before running `docker run shipyardapp-web`.

# What if I have questions?

You can [open an issue](https://github.com/shiypardapp/DevOpsChallenge/issues)
or reach out to the person who gave you the challenge.

# How long should this take?

This should take no more than one or two hours.
If you spend more time on this, then please let us know - it may be too large of
challenge and we may need to adjust.
Do your best work.
Your submission should be a very good indicator of your code in a real project.

# Submitting

You can submit your solution by emailing an archive (zip or tar) of the entire
repo directory to tech@shipyardapp.com or to the person who gave you the challenge.
