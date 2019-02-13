build:
	docker build -t ntpl:latest .

push-%: build
	docker tag ntpl:latest ikerry/ntpl:v$(*)
	docker tag ntpl:latest ikerry/ntpl:latest
	docker push ikerry/ntpl:v$(*)
	docker push ikerry/ntpl:latest

sh: build
	docker run -it -w /app -v $(shell pwd):/app -v $(HOME)/.kube:/root/.kube --entrypoint "/bin/bash" ntpl:latest

test: build
	docker run --rm -v $(pwd):/app -v $(HOME)/.kube:/root/.kube -w /app --entrypoint="/bin/bash" ntpl:latest -c "npm run test"

validate: build
	docker run --rm -v $(pwd):/app -v $(HOME)/.kube:/root/.kube -w /app ntpl:latest validate -p "envs/default.yaml" -p "envs/doris.yaml" -c "onboarding"
