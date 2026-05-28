# Statement of Work

**Projekt:** Serenity Wellness Resort  
**Autor:** Philipp Nguyen  
**Datum:** 2026-05-28

---

## Aufgabenbereich

Wellness-Urlaub-Konfigurator mit Buchungsfunktion:

- Wellness-Aufenthalte grafisch konfigurierbar und buchbar machen
- Verschiedene Aufenthaltsdauern, Zimmerkategorien, Behandlungen und Zusatzleistungen darstellen und kombinierbar machen
- Buchung über ein Formular mit Kontaktdaten, Aufenthaltsdaten und Buchungsabschluss ermöglichen

---

## Umgesetzte Aufgaben

### Projektstart & Dokumentation

- Initiale Projektstruktur aufgebaut
- README erstellt und iterativ ausgebaut, inklusive Projektbeschreibung, Setup-Hinweisen und Docker-Start
- `.env.example` angelegt
- Versehentlich exponierten API-Key aus der Versionskontrolle entfernt
- Architektur- und Beschreibungsdokumentation ergänzt bzw. angepasst

### Frontend - Buchungskonfigurator

- Seitenrouten und Formularaktionen im Frontend Web umgesetzt (`frontend-web/src/routes/pages.js`, `frontend-web/src/routes/actions.js`)
- Wellness-Konfigurator-Seite entwickelt (`frontend-web/views/configurator.ejs`)
- Kunden- und Buchungsformular direkt im Konfigurator umgesetzt
- Client-seitige Logik für Auswahl, Preisberechnung, Kalender, Gästeanzahl und Zusammenfassung umgesetzt (`frontend-web/public/js/configurator.js`)
- Erfolgsseite nach Buchungsabschluss erstellt (`frontend-web/views/success.ejs`)
- Styling für Konfigurator, Buchungsflow und responsive Darstellung ergänzt (`frontend-web/public/css/style.css`)

### Frontend - Erweiterungen & Fixes

- Kalender-Option für das Anreisedatum ergänzt
- Auswahl für Erwachsenen- und Kinderanzahl umgesetzt
- Preisberechnung im Konfigurator korrigiert
- Kalender- und Auswahlverhalten korrigiert
- Shop-Darstellung und Warenkorb-Interaktionen nachgezogen
- Deutsche Darstellung und Umlaute überprüft bzw. korrigiert
- E-Mail-Validierung im Buchungsflow ergänzt
- Bilder- und Medienanzeige auf der Impressionen-Seite korrigiert

### Backend - Booking Service

- API-Endpunkte für Buchungsoptionen, Verfügbarkeit und Buchung umgesetzt bzw. erweitert (`services/booking-service/src/app.js`)
- Buchungsoptionen gepflegt: Zimmer, Behandlungen, Extras und Aufenthaltsdauern (`services/booking-service/src/data/options.js`)
- MySQL-Schema, Queries und Buchungslogik angepasst (`services/booking-service/src/db/mysqlClient.js`)
- Serverseitige Validierung für Kundendaten, E-Mail-Bestätigung, Aufenthaltsdaten, Gästeanzahl und Zimmeranzahl ergänzt
- Kapazitätsprüfung für Erwachsene, Kinder und Zimmeranzahl umgesetzt
- Verfügbarkeitsberechnung für Anreisetage umgesetzt
- Preisberechnung und Erstellung von Buchungspositionen umgesetzt
- Redis-Cache für häufig gelesene Buchungsoptionen angebunden

### Backend - Weitere Services

- Shop-Service um Produktkatalog, Bestellungen, MySQL-Anbindung, Redis-Cache und MinIO-Medienzugriff ergänzt (`services/shop-service`)
- Produktkatalogdaten gepflegt (`services/shop-service/src/data/catalog.js`)
- Impressions-Service mit Galerie-Daten, MinIO-Medienzugriff und Upload-Endpunkt umgesetzt bzw. angepasst (`services/impressions-service`)
- Galerie- und Video-Metadaten gepflegt (`services/impressions-service/src/data/impressions.js`)
- Assistant-Service als digitaler Resort-Assistent mit Gemini-Anbindung, Fallback-Logik, Kontextdaten aus internen Services und Redis-Caching eingebunden (`services/assistant-service`)

### Deployment & Infrastruktur

- `docker-compose.yml` für Frontend Web, interne Services, MySQL, Redis, MinIO und MinIO-Seed-Prozess angepasst
- Nur das Frontend Web als fachliche Anwendung über den Host-Port veröffentlicht; interne Services bleiben im Docker-Netzwerk
- MinIO für lokale Entwicklung und Demonstration über `9000` und `9001` erreichbar gemacht

---

## Ergebnis

Das Projekt stellt eine serverseitig gerenderte Express/EJS-Webanwendung mit intern angebundenen Microservices bereit. Der Buchungskonfigurator ermöglicht die Auswahl eines Wellness-Aufenthalts, berechnet Preise, prüft Eingaben und legt Buchungen über den Booking Service in MySQL an. Ergänzend sind Shop, Impressionen, Wetterdaten und ein digitaler Assistent in die Anwendung integriert.
