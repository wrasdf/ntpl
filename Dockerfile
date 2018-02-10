FROM node:8.9.4-alpine

RUN apk add --update make curl jq bash openssl \
  && rm -rf /var/cache/apk/*

ENV KUBECTLVERSION v1.8.0
RUN curl -LO https://storage.googleapis.com/kubernetes-release/release/${KUBECTLVERSION}/bin/linux/amd64/kubectl
RUN chmod +x kubectl
RUN mv kubectl /usr/local/bin/

WORKDIR /node/app

ADD ntpl /node/app
ADD package.json /node/app
RUN chmod +x ntpl && npm install && mv ntpl /usr/local/bin/ && mv node_modules /usr/local/bin/

ENTRYPOINT ["ntpl"]
