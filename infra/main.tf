terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

locals {
  project = "otica couple"
  env     = var.environment

  common_tags = {
    Project     = local.project
    Environment = local.env
    ManagedBy   = "Terraform"
    Owner       = "MatheusSSiqueira"
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = local.common_tags
  }
}
