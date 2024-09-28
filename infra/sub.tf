resource "google_pubsub_subscription" "example" {
  ack_deadline_seconds       = "10"
  message_retention_duration = "900s"
  name                       = "subExample"
  project                    = var.project
  expiration_policy {
    ttl = ""
  }

  retry_policy {
    minimum_backoff = "10s"
    maximum_backoff = "30s"
  }

  push_config {
    push_endpoint = "https://${var.host}/${var.domain}/${var.service_name}/example"
  }

  retain_acked_messages = "false"
  topic                 = google_pubsub_topic.example.name
}
