FROM node:lts-alpine as web

WORKDIR /home/node
COPY . .

RUN yarn install && yarn run build

FROM golang:1.13 as go

WORKDIR /go/src/app
COPY . .

ENV CGO_ENABLED=0
ENV GOOS=linux
ENV GOARCH=amd64

RUN go get -d -v ./...
RUN go build -a -ldflags '-w -extldflags "-static"' ./...

FROM debian:stretch

RUN useradd shipyardapp
WORKDIR /home/shipyardapp
RUN mkdir -p /usr/local/shipyardapp/bin

COPY --from=web /home/node/web ./web
COPY --from=go /go/src/app/shipyard-doc /usr/local/shipyardapp/bin/

USER shipyardapp
ENV PATH="/usr/local/shipyardapp/bin:${PATH}"

EXPOSE 8080

ENTRYPOINT [ "shipyard-doc" ]
