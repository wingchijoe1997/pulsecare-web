#!/usr/bin/env bash
trap 'docker compose -f docker/docker-compose.yaml --profile local down -v --rmi local' EXIT
echo "Starting local development environment..." 
docker compose -f docker/docker-compose.yaml --profile local down -v --rmi local
pnpm dlx kill-port 3000
docker compose -f docker/docker-compose.yaml --profile local up -d --build
# docker compose -p pulsecase-local-dev -f docker/docker-compose.yaml --profile local up -d --build web_dev
nodemon --watch package.json --delay 5 --exec 'echo "Package.json changed. Restarting WebApp with latest node_modules..." && docker compose -f docker/docker-compose.yaml --profile local up -d --build --force-recreate --no-deps web_dev'