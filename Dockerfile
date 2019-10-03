FROM node:12-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install
COPY . /app/
RUN yarn run pkg

FROM alpine:3.10
RUN apk --update add --no-cache libstdc++ libgcc curl bash \
  && rm -rf /var/cache/apk/*

ENV KUBECTLVERSION v1.15.0
RUN curl -LO https://storage.googleapis.com/kubernetes-release/release/${KUBECTLVERSION}/bin/linux/amd64/kubectl
RUN chmod +x kubectl
RUN mv kubectl /usr/local/bin/

ENV AWSIAMAUTHENTICATOR 0.4.0
RUN curl -L https://github.com/kubernetes-sigs/aws-iam-authenticator/releases/download/v${AWSIAMAUTHENTICATOR}/aws-iam-authenticator_${AWSIAMAUTHENTICATOR}_linux_amd64 -o /usr/local/bin/aws-iam-authenticator
RUN chmod +x /usr/local/bin/aws-iam-authenticator

WORKDIR /app
COPY --from=builder /app/pkg/ntpl /usr/local/bin
RUN chmod +x /usr/local/bin/ntpl

ENTRYPOINT ["ntpl"]
