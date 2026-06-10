#!/bin/sh
echo "Waiting for MinIO..."
sleep 10

mc alias set local http://minio:9000 minioadmin minioadmin

mc mb --ignore-existing local/wellness-impressions
mc mb --ignore-existing local/wellness-shop
mc mb --ignore-existing local/wellness-homepage
mc mb --ignore-existing local/wellness-configurator

mc anonymous set public local/wellness-impressions
mc anonymous set public local/wellness-shop
mc anonymous set public local/wellness-homepage
mc anonymous set public local/wellness-configurator

mc cp --recursive /seed/wellness-impressions/ local/wellness-impressions/
mc cp --recursive /seed/wellness-shop/ local/wellness-shop/
mc cp --recursive /seed/wellness-homepage/ local/wellness-homepage/
mc cp --recursive /seed/wellness-configurator/ local/wellness-configurator/

echo "Seed complete!"
