build:
	docker build -t ntpl:latest .

push-%: build
	docker tag ntpl:latest ikerry/ntpl:$(*)
	docker tag ntpl:latest ikerry/ntpl:latest
	docker push ikerry/ntpl:$(*)
	docker push ikerry/ntpl:latest

sh: build
	docker run -it -w /app -v $(shell pwd):/app -v $(HOME)/.kube:/root/.kube --entrypoint "/bin/bash" ntpl:latest
