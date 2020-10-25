ARG KUBE_VERSION=1.17.13
ARG AWSIAMAUTHENTICATOR_VERSION=0.5.0

FROM lachlanevenson/k8s-kubectl:v${KUBE_VERSION} AS kubectl
FROM ikerry/aws-iam-authenticator:v${AWSIAMAUTHENTICATOR_VERSION} AS authenticator

FROM node:12-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install
COPY . /app/
RUN yarn run pkg

FROM alpine:3.10
RUN apk --update add --no-cache libstdc++ libgcc curl bash \
  && rm -rf /var/cache/apk/*
COPY --from=kubectl /usr/local/bin/kubectl /usr/bin/
COPY --from=authenticator /usr/local/bin/aws-iam-authenticator /usr/bin/
WORKDIR /app
COPY --from=builder /app/pkg/ntpl /usr/local/bin
RUN chmod +x /usr/local/bin/ntpl

ENTRYPOINT ["ntpl"]
