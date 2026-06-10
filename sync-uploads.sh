#!/bin/bash
# Syncs guest-uploaded photos from MinIO to the seed folder.
# Run this whenever you want to persist new uploads across Docker restarts.
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SEED_DIR="$SCRIPT_DIR/seed/seed/wellness-impressions/impressions/uploads"

echo "Syncing guest uploads to seed folder..."

docker run --rm \
  --network wfn_default \
  --entrypoint /bin/sh \
  -v "$SCRIPT_DIR/seed/seed/wellness-impressions:/seed" \
  minio/mc:latest -c "
    mc alias set local http://minio:9000 minioadmin minioadmin 2>/dev/null &&
    mkdir -p /seed/impressions/uploads &&
    mc mirror --overwrite local/wellness-impressions/impressions/uploads/ /seed/impressions/uploads/
  "

echo "Done! Guest photos are now in the seed folder and will survive Docker restarts."
