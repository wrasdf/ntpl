#! /bin/bash
set -e

VERSION=$1
IMAGE=ikerry/ntpl
# KUBE_VERSION_LIST=(v1.20.15 v1.21.11 v1.22.8 v1.23.5)
KUBE_VERSION_LIST=(v1.20.15)
AUTHENTICATOR=v0.5.7

builder () {

  IMAGE=ikerry/ntpl
  NTPL_VERSION=$1
  KUBE_VERSION=$2
  AUTHENTICATOR=$3

  docker buildx \
    --build-arg KUBE_VERSION=${KUBE_VERSION} \
    --build-arg AWSIAMAUTHENTICATOR_VERSION=${AUTHENTICATOR} \
    --platform linux/amd64 \
    --target release \
    --tag ikerry/ntpl:${NTPL_VERSION}-k8s${KUBE_VERSION} .

  docker push ikerry/ntpl:${NTPL_VERSION}-k8s${KUBE_VERSION}

}

for KUBE in "${KUBE_VERSION_LIST[@]}"; do
  builder $VERSION $KUBE $AUTHENTICATOR
done
