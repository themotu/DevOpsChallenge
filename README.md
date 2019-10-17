# Project Overview

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
[Here](https://golang.org) is a link the main Golang website.

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
   Before compilation, you should set the CGO_ENABLED, GOOS, and GOARCH environment
   variables to "0", "linux", and "amd64", respectively.
3. All Go binaries must be placed in the `/usr/local/shipyardapp/bin/` directory
   in the final image.
   This directory should be placed in PATH, such that the entrypoint
   can simply be "shipyard-doc".
4. The version of Node used to build the frontend must be 10.16+.
5. The frontend artifacts must be placed relative to the working directory at `./web/assets/`
   in the final image.
   This is required so that the `shipyard-doc` binary produces the correct output.
   The files that you need to copy into the conatainer are `javascripts/app.js`,
   `stylesheets/app.css` and the entire `images` directory.

   There isn't any use for the compiled frontend inside the container aside from
   it being there for the backend to list it as output.
   It isn't rendered or served in any way.
   This requirement stems from the way the application is used in production.

6. The container should run under the user `shipyardapp`, and the working directory
   should be that user's home directory. This user should be like any "normal"
   user under Linux, without sudo and other extra permissions.
7. The final image should be based off of `debian:stretch`.
8. The image should expose the port 8080 in the Dockerfile.
   This exposed port isn't used.
   It is there because we have an exposed port in production and want it to be
   part of the solution.
9. You should be able to run the container with exactly `docker run shipyardapp-web`.
   You should be able to stop the container with a `docker stop` command.

## Solution

This product uses Docker multi-stage builds to create the desired debian:stretch container. There isn't much to document above what is well-described above as requirements.

Result:

- Docker image with freshly built binary and javascript assets.
- Image uses debian:stretch
- Node version used is lts which is currently 10.x
- Go version used is 1.13

### Build and deploy

```
docker build -t shipyardapp-web .
docker run shipyardapp-web
```
