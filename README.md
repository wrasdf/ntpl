# Ntpl [![CircleCI](https://circleci.com/gh/wrasdf/ntpl/tree/master.svg?style=svg)](https://circleci.com/gh/wrasdf/ntpl/tree/master)

Ntpl is a tool for processing Kubernetes manifest templates.

It is a very simple client-side implementation of the Templates + Parameters proposal.

## What's inside the Docker image

- ntpl
- aws-iam-authenticator 0.5.0
- kubectl (1.15.9 1.16.6 1.17.2 within tagged images)

## Synopsis

```
Usage: ntpl [options] [command]

Options:
  -c, --components [value]  kubernetes components (default: [])
  -p, --parameters [value]  parameters file (yaml|yml) (default: [])
  -k, --keyPairs [value]    Key=Value Parameter (default: [])
  -t, --template <file>     template file
  -o, --output <file>       output file
  -h, --help                output usage information

Commands:
  compile                   Compile Kubernetes component templates.
  validate                  Validate Kubernetes component templates.
  apply                     Apply Kubernetes component templates into kubernetes.
  delete                    Delete Kubernetes component resources from kubernetes
  render                    Generate template
```

## Docker image

```
docker pull ikerry/ntpl:1.2.0-k8sv1.16.6
```

## Quick start

- Template Example

```
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: {{name}}
  namespace: {{namespace}}
  labels:
    app: {{name}}
    runtime: {{runtime}}
  annotations:
    kubernetes.io/tls-acme: "true"
spec:
  tls:
  - hosts:
    - demo-app.{{cluster}}
    secretName: {{name}}-tls
  rules:
  - host: demo-app.{{cluster}}
    http:
      paths:
      - path: /
        backend:
          serviceName: {{service}}
          servicePort: 80
```

- Parameters Example

```
---
name: kube-demo
namespace: kube-demo
service: kube-demo-app
cluster: cluster.com.au
runtime: !!js/function |
  function (){
    return "Hello World"
  }
```

- Validate Kubernetes component templates

```
docker run --rm -v $(pwd):/app -v ~/.kube:/root/.kube -w /app ikerry/ntpl:1.2.0-k8sv1.16.6 validate \
 -p "envs/default.yaml" \
 -p "envs/preprod.yaml" \
 -k "name=cluster" \
 -k "v=v0.2.3" \
 -c "onboarding"
```

- Render template

```
docker run --rm -v $(pwd):/app -v ~/.kube:/root/.kube -w /app ikerry/ntpl:1.2.0-k8sv1.16.6 render \
 -p "envs/default.yaml" \
 -p "envs/preprod.yaml" \
 -k "app.version=v.1.0.3" \
 -t "tmp.yaml" \
 -o test.yaml
```
