
FROM golang:1.9.2

WORKDIR /go/src/github.com/goncharovnikita/website/back/

ADD . /go/src/github.com/goncharovnikita/website/back/

RUN ./install-deps.sh && env GOOS=linux GOARCH=386 go build

FROM alpine:latest

COPY --from=0 /go/src/github.com/goncharovnikita/website/back/back /bin/

EXPOSE 8080

CMD [ "back" ]