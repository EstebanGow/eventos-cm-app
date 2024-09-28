check-group:
ifndef ENV
	$(error Please set ENV=[dev|test|prod])
endif

check-project:
ifndef PROJECT_ID
	$(error Please set PROJECT_ID)
endif

check-commit-sha:
ifndef COMMIT_SHA
	$(error Please set COMMIT_SHA)
endif

check-service-name:
ifndef SERVICE_NAME
	$(error Please set SERVICE_NAME)
endif

check-domain:
ifndef DOMAIN
	$(error Please set DOMAIN)
endif

prerequisites=check-project check-group check-service-name check-domain

terraform-create-workspace: check-group
	@cd infra && \
		terraform workspace select $(ENV) || terraform workspace new $(ENV)

terraform-init:
	@cd infra && \
		terraform init

terraform-plan: $(prerequisites)
	@cd infra && \
		terraform workspace select $(ENV) && \
		terraform plan \
		-var="project=$(PROJECT_ID)" \
		-var="host=$(HOST)" \
		-var="service_name=$(SERVICE_NAME)" \
		-var="domain=$(DOMAIN)" \

terraform-apply: $(prerequisites)
	@cd infra && \
		terraform workspace select $(ENV) && \
		terraform apply \
		-var="project=$(PROJECT_ID)" \
		-var="host=$(HOST)" \
		-var="service_name=$(SERVICE_NAME)" \
		-var="domain=$(DOMAIN)" \
        -auto-approve

deploy: check-project check-commit-sha check-service-name
	gcloud builds submit --project $(PROJECT_ID) --verbosity debug --substitutions=_PROJECT_ID=$(PROJECT_ID),_COMMIT_SHA=$(COMMIT_SHA),_SERVICE_NAME=$(SERVICE_NAME) .

base64:
	openssl base64 -A -in .env -out .env.txt

replace-files:
	envsubst
