build:
	docker build -t ntpl:latest .

push-%: build
	docker tag ntpl:latest ikerry/ntpl:$(*)
	docker tag ntpl:latest ikerry/ntpl:latest
	docker push ikerry/ntpl:$(*)
	docker push ikerry/ntpl:latest

sh: build
	docker run -it -w /app -v $(shell pwd):/app -v $(HOME)/.kube:/root/.kube -v /app/node_modules --entrypoint "/bin/bash" ntpl:latest

test: build
	docker run --rm -v $(shell pwd):/app -v $(HOME)/.kube:/root/.kube -v /app/node_modules -w /app --entrypoint="/bin/bash" ntpl:latest -c "npm run test"

validate: build
	docker run --rm -v $(shell pwd):/app -v $(HOME)/.kube:/root/.kube -v /app/node_modules -w /app ntpl:latest validate -p "envs/default.yaml" -p "envs/doris.yaml" -c "onboarding" -c "debug"

compile: build
	docker run --rm -v $(shell pwd):/app -v $(HOME)/.kube:/root/.kube -v /app/node_modules -w /app ntpl:latest compile -p "envs/default.yaml" -p "envs/doris.yaml" -c "onboarding" -c "debug"
