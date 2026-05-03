# Serenity Wellness Resort

Server-rendered Express/EJS frontend for the university wellness resort project.

## Run with Docker

```bash
docker compose up --build
```

The only host-facing application service is:

- Frontend: http://localhost:8080
- Health: http://localhost:8080/health

The backend services are scaffolded as internal placeholders for later implementation:

- `services/booking-service`
- `services/shop-service`
- `services/impressions-service` (implemented with MinIO-backed media storage)
- `services/assistant-service`

Weather data is fetched directly by the frontend server from the external Open-Meteo API. MySQL, Redis, and MinIO are included in `docker-compose.yml` for the service implementations.

## Local Frontend

```bash
cd frontend-web
npm install
npm start
```

The frontend fetches service data on the server side and renders EJS templates. Browser-side code only talks to frontend routes.
