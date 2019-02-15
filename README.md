# Ntpl

Ntpl is a tool for processing Kubernetes manifest templates.

It is a very simple client-side implementation of the Templates + Parameters proposal.

## What's inside the Docker image

- node:11.9.0-alpine
- ntpl:0.3.2
- kubectl:1.13.3

## Synopsis

```
Usage: ntpl [options] [command]

Options:
  -v, --version             output the version number
  -c, --components [value]  kubernetes components (default: [])
  -p, --parameters [value]  parameters file (yaml|yml) (default: [])
  -h, --help                output usage information

Commands:
  compile                   Compile kubernetes templates.
  validate                  Validate kubernetes templates.
  apply                     Apply templates into kubernetes.
  delete                    Delete templates from kubernetes
```

## Docker image

```
docker pull ikerry/ntpl:latest
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


- Validate template

```
docker run --rm -v $(pwd):/app -v ~/.kube:/root/.kube -w /app ikerry/ntpl:latest validate -p "envs/default.yaml" -p "envs/doris.yaml" -c "onboarding"
```

- Apply template

```
docker run --rm -v $(pwd):/app -v ~/.kube:/root/.kube -w /app ikerry/ntpl:latest apply -p "envs/default.yaml" -p "envs/doris.yaml" -c "onboarding"
```

- Delete template

```
docker run --rm -v $(pwd):/app -v $(HOME)/.kube:/root/.kube -w /app ikerry/ntpl:latest delete -p "envs/default.yaml" -p "envs/doris.yaml" -c "onboarding"
```

- Compile template

```
docker run --rm -v $(pwd):/app -v ~/.kube:/root/.kube -w /app ikerry/ntpl:latest compile -p "envs/default.yaml" -p "envs/doris.yaml" -c "onboarding"
```
