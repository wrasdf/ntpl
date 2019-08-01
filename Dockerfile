FROM node:11.9.0-alpine

RUN apk --update add curl bash \
  && rm -rf /var/cache/apk/*

ENV KUBECTLVERSION v1.15.0
RUN curl -LO https://storage.googleapis.com/kubernetes-release/release/${KUBECTLVERSION}/bin/linux/amd64/kubectl
RUN chmod +x kubectl
RUN mv kubectl /usr/local/bin/

WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install
COPY . /app/
RUN chmod +x ntpl && \
    cp ntpl /usr/local/bin/ && \
    cp -r utils /usr/local/bin/ && \
    cp -r node_modules /usr/local/bin/

ENTRYPOINT ["ntpl"]
