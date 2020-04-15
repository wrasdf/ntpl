#! /bin/bash
set -e

VERSION=$1
IMAGE=ikerry/ntpl
KUBE_VERSION_LIST=(1.15.11 1.16.8 1.17.4)
AUTHENTICATOR=0.5.0

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
