.PHONY: help

image_name := nryotaro/track-activity/fluentd
image_tag ?= $(shell git rev-parse HEAD)

help: ## display this help text and exit
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build: ## build an image from the Dockerifle in the directory
	docker build --rm  -t $(image_name):$(image_tag) .
	docker tag $(image_name):$(image_tag) $(image_name):latest

push: ## push a Docker image to dockerhub
	docker login
	docker push $(image_name):$(image_tag)
	docker push $(image_name):latest
