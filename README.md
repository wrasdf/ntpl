# Ntpl

Ntpl is a tool for processing Kubernetes manifest templates.

It is a very simple client-side implementation of the Templates + Parameters proposal.

## What's inside the Docker image

- node:11.9.0-alpine
- ntpl:0.4.1
- kubectl:1.13.3

## Synopsis

```
Usage: ntpl [options] [command]

Options:
  -v, --version             output the version number
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

- Validate Kubernetes component templates

```
docker run --rm -v $(pwd):/app -v ~/.kube:/root/.kube -w /app ikerry/ntpl:latest validate -p "envs/default.yaml" -p "envs/doris.yaml" -k "name=cluster" -k "v=v0.2.3" -c "onboarding"
```

- Render template

```
docker run --rm -v $(pwd):/app -v ~/.kube:/root/.kube -w /app ikerry/ntpl:latest render -p "envs/default.yaml" -p "envs/doris.yaml" -k "app.version=v.1.0.3" -t "tmp.yaml" -o test.yaml
```
