TF ?= terraform
VAR_FILE ?= terraform.tfvars
AWS_REGION ?= us-east-1
ENVIRONMENT ?= dev

BACKEND_BUCKET = oticacouple-terraform-state-$(ENVIRONMENT)
BACKEND_KEY = $(ENVIRONMENT)/terraform.tfstate
BACKEND_DYNAMODB_TABLE = oticacouple-terraform-lock

.PHONY: bootstrap init init-remote plan apply destroy fmt validate state-list

bootstrap:
	$(TF) init -backend=false -input=false
	$(TF) apply -input=false -var-file=$(VAR_FILE) -target=aws_s3_bucket.terraform_state -target=aws_s3_bucket_versioning.terraform_state -target=aws_s3_bucket_server_side_encryption_configuration.terraform_state -target=aws_s3_bucket_public_access_block.terraform_state -target=aws_dynamodb_table.terraform_lock

init:
	$(TF) init -backend=false -input=false

init-remote:
	$(TF) init -migrate-state -input=false \
		-backend-config="bucket=$(BACKEND_BUCKET)" \
		-backend-config="key=$(BACKEND_KEY)" \
		-backend-config="region=$(AWS_REGION)" \
		-backend-config="encrypt=true" \
		-backend-config="dynamodb_table=$(BACKEND_DYNAMODB_TABLE)"

fmt:
	$(TF) fmt -recursive

validate:
	$(TF) init -backend=false -input=false
	$(TF) validate

plan:
	$(TF) plan -input=false -var-file=$(VAR_FILE)

apply:
	$(TF) apply -input=false -var-file=$(VAR_FILE)

destroy:
	$(TF) destroy -input=false -var-file=$(VAR_FILE)

state-list:
	$(TF) state list
