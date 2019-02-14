FROM node:10.15.1-alpine

RUN apk add --update curl bash \
  && rm -rf /var/cache/apk/*

ENV KUBECTLVERSION v1.13.3
RUN curl -LO https://storage.googleapis.com/kubernetes-release/release/${KUBECTLVERSION}/bin/linux/amd64/kubectl
RUN chmod +x kubectl
RUN mv kubectl /usr/local/bin/

WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
RUN npm link

ENTRYPOINT ["ntpl"]
