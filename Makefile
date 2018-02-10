build:
	docker build -t ntpl:latest .

push-%: build
	docker tag ntpl:latest ikerry/ntpl:$(*)
	docker tag ntpl:latest ikerry/ntpl:latest
	docker push ikerry/ntpl:$(*)
	docker push ikerry/ntpl:latest

compile: build
	docker run --rm -v $(shell pwd):/app -w /app ntpl:latest -t ./tpls/ingress.yaml -u ./tpls/unsafe-params.yaml
