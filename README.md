# wellness-resort-project

## Description
University group project: a cloud-native web application for a fictional wellness resort with a booking configurator, shop, weather integration, and AI features.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js
- **Database:** MySQL
- **Caching / Cart:** Redis
- **Object Storage:** MinIO
- **Weather Data:** External weather API or simulated weather data
- **AI Feature:** Google Gemini
- **Containerization:** Docker, Docker Compose

## Architecture Overview
The project consists of a frontend service built with HTML, CSS, and JavaScript, and a backend service built with Node.js.  
MySQL is used as the main database for storing bookings, products, and customer data. Redis can be used for shopping cart state or caching.  
MinIO is used for storing images of wellness offers and products. Weather data is either fetched from an external API or simulated.  
The AI feature is implemented using Google Gemini.  
All services are intended to run together via Docker Compose.

## Features
- Wellness vacation configurator with booking functionality
- Wellness shop with shopping cart
- Impressions with images and videos
- Weather display
- AI feature with Gemini

## Project Structure

```text
wellness-resort-project/
├── frontend/              # UI, configurator, shop, weather display
├── backend/               # API, bookings, products, AI feature
├── docs/                  # architecture, sketches, screenshots, task distribution
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Start
Later via Docker Compose:

```bash
docker compose up
```
