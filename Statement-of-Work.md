# Statement of Work

**Projekt:** Serenity Wellness Resort  

---

## Philipp Nguyen

Mein Hauptbeitrag im Gruppenprojekt „Serenity Wellness Resort“ lag in der Umsetzung des Wellness-Urlaub-Konfigurators mit Buchungsfunktion. Dazu habe ich im Frontend die Konfigurator-Seite mit Auswahlmöglichkeiten für Aufenthaltsdauer, Zimmerkategorie, Behandlungen, Zusatzleistungen, Anreisedatum sowie Erwachsenen- und Kinderanzahl umgesetzt und die clientseitige Logik für Auswahlverhalten, Preisberechnung, Kalender und Buchungszusammenfassung ergänzt. Im Backend habe ich den Booking Service erweitert, einschließlich API-Endpunkten für Buchungsoptionen, Verfügbarkeiten und Buchungsabschluss, serverseitiger Validierung, Kapazitätsprüfung, Preisberechnung und Speicherung erfolgreicher Buchungen in MySQL.

---


---

## Tobias Tronicek

Mein Hauptbeitrag war die Umsetzung des KI-gestützten Resort-Assistenten. Dafür habe ich einen Assistant-Service entwickelt, der Nutzereingaben entgegennimmt, validiert und daraus individuelle Wellness-Empfehlungen erstellt. Der Service bindet Gemini als externe KI-Schnittstelle ein, nutzt Resort-Daten aus den internen Services als Kontext und enthält zusätzlich eine Fallback-Logik, damit auch ohne API-Key oder bei externen Fehlern sinnvolle Empfehlungen ausgegeben werden können. Außerdem habe ich Redis-Caching für wiederholte Anfragen ergänzt und den Assistenten im Frontend angebunden. Die empfohlene Aufenthaltsdauer, Zimmer, Behandlungen und Extras können direkt in den Buchungskonfigurator übernommen werden. Beim initialen Setup und dem Design habe ich ebenfalls geholfen.

---