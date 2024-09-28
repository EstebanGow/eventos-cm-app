resource "google_pubsub_topic" "example" {
  name    = "example"
  project = var.project
}
