.PHONY: sh test compile

push-%:
	./bin/build.sh $(*)

sh:
	@docker-compose build sh
	@docker-compose run sh

test:
	@docker-compose build test
	@docker-compose run test

compile:
	@docker-compose run ntpl compile -p "./envs/default.yaml" -p "./envs/preprod.yaml" -c "onboarding" -c "debug"
