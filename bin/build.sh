#! /bin/bash
set -e

VERSION=$1
IMAGE=ikerry/ntpl
KUBE_VERSION_LIST=(1.18.12 1.19.4 1.20.0)
AUTHENTICATOR=0.5.2

builder () {

  IMAGE=ikerry/ntpl
  NTPL_VERSION=$1
  KUBE_VERSION=$2
  AUTHENTICATOR=$3

  docker build \
    --build-arg KUBE_VERSION=${KUBE_VERSION} \
    --build-arg AWSIAMAUTHENTICATOR_VERSION=${AUTHENTICATOR} \
    -t ikerry/ntpl:${NTPL_VERSION}-k8sv${KUBE_VERSION} .

  docker push ikerry/ntpl:${NTPL_VERSION}-k8sv${KUBE_VERSION}

}

for KUBE in "${KUBE_VERSION_LIST[@]}"; do
  builder $VERSION $KUBE $AUTHENTICATOR
done
