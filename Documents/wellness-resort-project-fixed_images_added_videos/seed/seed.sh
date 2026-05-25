#!/bin/sh
echo "Waiting for MinIO..."
sleep 10

mc alias set local http://minio:9000 minioadmin minioadmin

mc mb --ignore-existing local/wellness-impressions
mc mb --ignore-existing local/wellness-shop

mc anonymous set public local/wellness-impressions
mc anonymous set public local/wellness-shop

mc cp --recursive /seed/wellness-impressions/ local/wellness-impressions/

echo "Seed complete!"
