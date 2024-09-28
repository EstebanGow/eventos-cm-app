terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 3.66"
    }
  }

  backend "gcs" {
    bucket = "cm-tf-admin-state"
    prefix = "/plantillas/cm-plantilla-microservicio-gke"
  }
}

provider "google" {
  project = var.project
  region  = "us-central1"
  zone    = "us-central1-c"
}
