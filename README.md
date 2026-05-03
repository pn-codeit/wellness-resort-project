# Serenity Wellness Resort

Server-rendered Express/EJS frontend for the university wellness resort project.

## Run with Docker

```bash
docker compose up --build
```

The only host-facing application service is:

- Frontend: http://localhost:8080
- Health: http://localhost:8080/health

The backend services are internal-only Docker services:

- `services/booking-service` (implemented with MySQL booking/options persistence, Redis option cache, and service-backed arrival-date availability)
- `services/shop-service` (implemented with MySQL catalog/orders, Redis catalog cache, and MinIO product media)
- `services/impressions-service` (implemented with MinIO-backed media storage)
- `services/assistant-service` (implemented as a minimal Gemini-backed resort advisor that reads booking, shop, and impressions data from the internal services and caches advice in Redis)

Weather data is fetched directly by the frontend server from the external Open-Meteo API. MySQL, Redis, and MinIO are included in `docker-compose.yml` for the service implementations.

Set `GEMINI_API_KEY` in `.env` to enable Gemini responses for the assistant. Without a key, the assistant service still returns a deterministic fallback recommendation so the page remains usable for local demos.

## Local Frontend

```bash
cd frontend-web
npm install
npm start
```

The frontend fetches service data on the server side and renders EJS templates. Browser-side code only talks to frontend routes.
