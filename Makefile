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

compile:
	@docker-compose run ntpl compile -p "envs/default.yaml" -p "envs/preprod.yaml" -c "onboarding" -c "debug"
