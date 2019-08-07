build:
	docker build -t ntpl:latest .

push-%: build
	docker tag ntpl:latest ikerry/ntpl:$(*)
	docker tag ntpl:latest ikerry/ntpl:latest
	docker push ikerry/ntpl:$(*)
	docker push ikerry/ntpl:latest

sh:
	@docker-compose build sh
	@docker-compose run sh

test:
	@docker-compose build test
	@docker-compose run test

validate: build
	docker run --rm -v $(shell pwd):/app -v $(HOME)/.kube:/root/.kube -w /app ntpl:latest validate -p "envs/default.yaml" -p "envs/preprod.yaml" -c "onboarding" -c "debug"


compile: build
	docker run --rm -v $(shell pwd):/app -v $(HOME)/.kube:/root/.kube -w /app ntpl:latest compile -p "envs/default.yaml" -p "envs/preprod.yaml" -c "onboarding" -c "debug"
