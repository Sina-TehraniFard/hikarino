#!/bin/bash

# Load secrets from GCP Secret Manager
export OPENAI_API_KEY=$(gcloud secrets versions access latest --secret="OPENAI_API_KEY")
export STRIPE_SECRET_KEY=$(gcloud secrets versions access latest --secret="STRIPE_SECRET_KEY")
export STRIPE_WEBHOOK_SECRET=$(gcloud secrets versions access latest --secret="STRIPE_WEBHOOK_SECRET")

# Start docker compose with the loaded environment variables
docker compose up -d --force-recreate --remove-orphans