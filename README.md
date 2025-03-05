### **📌 README.md für Clean-App Backend**

📌 **`backend/README.md`**

```md
# 🧹 Clean-App Backend

Dies ist das Backend für die Clean-App, eine Plattform zur Verwaltung von Reinigungsdiensten für Wohnungen, Unternehmen und öffentliche Einrichtungen. Das System ermöglicht die Verwaltung von Reinigungsaufträgen, Mitarbeitern, Finanzen und Berichten.

## 🚀 Projektübersicht

- **Technologien:** Node.js, Express.js, MongoDB, Mongoose
- **Authentifizierung:** JWT-Token-Authentifizierung
- **Hauptfunktionen:**
  - Verwaltung von Gebäuden und Reinigungszonen
  - Verwaltung von Reinigungsaufgaben und Perioden
  - Verwaltung von Mitarbeitern und deren Arbeitszeiten
  - Finanzmanagement (Einnahmen und Ausgaben)
  - Berichterstellung und Analyse
  - Token-basierte Authentifizierung für sichere API-Zugriffe

---

## 📌 Installation & Einrichtung

### 1️⃣ **Projekt klonen**
```sh
git clone https://github.com/dein-repository/clean-app-backend.git
cd clean-app-backend
```

### 2️⃣ **Abhängigkeiten installieren**
```sh
npm install
```

### 3️⃣ **.env Datei erstellen**
Erstelle eine `.env`-Datei im Stammverzeichnis und füge folgende Umgebungsvariablen hinzu:
```ini
PORT=5000
MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=7d
```

### 4️⃣ **Datenbankverbindung testen**
Starte den Server, um zu überprüfen, ob die MongoDB-Verbindung funktioniert:
```sh
npm run dev
```
✅ Wenn du die Meldung `✅ MongoDB verbunden` siehst, ist die Datenbank erfolgreich verbunden.

---

## 📌 API-Endpunkte

### **🟢 Benutzerverwaltung**
| Methode | Endpunkt | Beschreibung |
|---------|---------|--------------|
| `POST` | `/api/users/register` | Benutzerregistrierung |
| `POST` | `/api/users/login` | Benutzeranmeldung |
| `GET` | `/api/users/profile` | Benutzerprofil abrufen (Auth erforderlich) |
| `PUT` | `/api/users/profile` | Benutzerprofil aktualisieren (Auth erforderlich) |

### **🏢 Gebäude & Reinigungsaufgaben**
| Methode | Endpunkt | Beschreibung |
|---------|---------|--------------|
| `POST` | `/api/apartments` | Neues Gebäude hinzufügen |
| `GET` | `/api/apartments` | Alle Gebäude abrufen |
| `GET` | `/api/apartments/:id` | Einzelnes Gebäude abrufen |
| `POST` | `/api/tasks` | Neue Reinigungsaufgabe erstellen |
| `GET` | `/api/tasks` | Alle Aufgaben abrufen |
| `PUT` | `/api/tasks/:id` | Aufgabe aktualisieren |
| `DELETE` | `/api/tasks/:id` | Aufgabe löschen |

### **💰 Finanzmanagement**
| Methode | Endpunkt | Beschreibung |
|---------|---------|--------------|
| `POST` | `/api/finance` | Neue Einnahme/Ausgabe hinzufügen |
| `GET` | `/api/finance` | Finanzübersicht abrufen |

### **📊 Berichte & Analysen**
| Methode | Endpunkt | Beschreibung |
|---------|---------|--------------|
| `GET` | `/api/reports/finance/monthly` | Monatlichen Finanzbericht abrufen |
| `GET` | `/api/reports/tasks/analysis` | Analyse der erledigten Reinigungsaufgaben |

---

## 📌 Tests mit Postman

1️⃣ **Postman-Kollektion importieren**  
👉 **[Hier herunterladen](https://github.com/clean-App/CleanApp.postman_collection.json)**  

2️⃣ **Postman öffnen und importieren**  
- `Import` → JSON-Datei auswählen → **Testen!**

---

## 📌 Deployment

Das Backend kann auf einem Server wie **Railway, Render, oder AWS** gehostet werden.  
Beispiel für **Docker-Deployment**:
```sh
docker build -t clean-app-backend .
docker run -p 5000:5000 clean-app-backend
```

---

## 📌 Entwickler

👨‍💻 **Projektleiter:** Dein Name  
📧 **Kontakt:** deine-email@example.com  
🌍 **GitHub:** [GitHub-Profil](https://github.com/dein-repository)

---

🚀 **Das Clean-App Backend ist jetzt einsatzbereit!**  
📌 **Weitere Updates folgen!** 😎
```

---

### **📌 Was wurde hinzugefügt?**
✅ **Komplette API-Dokumentation auf Deutsch**  
✅ **Installations- und Deployment-Anweisungen**  
✅ **Postman-Testanleitung**  

🚀 **README.md kann jetzt ins Projekt integriert werden!**  
Falls du Änderungen möchtest, sag einfach Bescheid! 😎