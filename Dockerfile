ARG KUBE_VERSION
ARG AWSIAMAUTHENTICATOR_VERSION

FROM lachlanevenson/k8s-kubectl:${KUBE_VERSION} AS kubectl
FROM ikerry/aws-iam-authenticator:${AWSIAMAUTHENTICATOR_VERSION} AS authenticator

FROM node:18-alpine AS dev
WORKDIR /app
COPY --from=kubectl /usr/local/bin/kubectl /usr/bin/
COPY --from=authenticator /usr/local/bin/aws-iam-authenticator /usr/bin/
COPY package.json yarn.lock /app/
RUN yarn install
COPY . /app/

FROM node:18-alpine AS build
WORKDIR /app
COPY --from=kubectl /usr/local/bin/kubectl /usr/bin/
COPY --from=authenticator /usr/local/bin/aws-iam-authenticator /usr/bin/
COPY package.json yarn.lock /app/
RUN yarn install
COPY . /app/
RUN yarn run pkg

FROM alpine:3.16 AS release
RUN apk --update add --no-cache libstdc++ libgcc python3 py3-pip curl bash \
  && pip3 install --upgrade pip \
  && pip3 install awscli \
  && rm -rf /var/cache/apk/*
COPY --from=kubectl /usr/local/bin/kubectl /usr/bin/
COPY --from=authenticator /usr/local/bin/aws-iam-authenticator /usr/bin/

WORKDIR /app
COPY --from=build /app/pkg/ntpl /usr/local/bin
RUN chmod +x /usr/local/bin/ntpl

ENTRYPOINT ["ntpl"]
