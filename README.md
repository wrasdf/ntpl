# Ntpl

Ntpl is a tool for processing Kubernetes manifest templates.

It is a very simple client-side implementation of the Templates + Parameters proposal.

## What's inside the Docker image

- node:8.9.4-alpine
- ntpl:0.1.5
- kubectl:1.8.0
- jq
- make
- curl
- bash
- openssl

## Synopsis

```
ntpl version 0.1.2

Usage: ntpl [options]
Options:

  -v, --version                output the version number
  -t, --template <file ...>    kubernetes template yaml
  -p, --parameters <file ...>  parameters yaml
  -u, --unsafe <file ...>      unsafe parameters yaml
  -h, --help                   output usage information  
```

## Docker image

```
docker pull ikerry/ntpl
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
    purpose: {{name}}-policy
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
runtime: static-string
```


- Generate template

```
docker run --rm -v $(pwd):/app -w /app ikerry/ntpl:0.1.2 -t ./tpls/ingress.yaml -p ./tpls/params.yaml
```


- Apply to kubernetes


```
docker run --rm -v $(pwd):/app -v $HOME/.kube:/root/.kube -w /app ikerry/ntpl:0.1.2 -t ./tpls/ingress.yaml -p ./tpls/params.yaml | kubectl apply -f -
```


## Edge Case

- Parameters Example

```
---
name: kube-demo
namespace: kube-demo
service: kube-demo-app
cluster: kerry.cluster.com.au
runtime: !!js/function |
  function (){
    return "Hello World"
  }
```


- Generate template

```
docker run --rm -v $(pwd):/app -w /app ikerry/ntpl:0.1.2 -t ./tpls/ingress.yaml -u ./tpls/unsafe-params.yaml
```
