# Webshop Dokumentation
Detta är en JavaScript-webbapplikation utvecklad som en del av Chas Academys kurs.

## Projektöversikt
Webshoppen skapades för att erbjuda en plattform för försäljning av olika produkter, från kläder till datorer. Målet var att skapa en användarvänlig webbplats där kunder enkelt kan köpa produkter, hantera sina beställningar och betala smidigt via PayPal. Plattformen stödjer både användar- och administratörsroller för en bättre hantering av ordrar och användarinformation.

## Funktioner
- Användare kan registrera sig, och logga in
- Användaren kan lägga till och ta bort produkter till och från sin varukorg.
- Admin-rollen kan se alla ordrar, produkter och användare samt ta bort användare.


## Teknologier
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Databas**: MongoDB
- **Autentisering**: JWT för användarautentisering
- **Betalning**: PayPal för smidig betalning
- **Design**: Figma för lågupplöst design
- **Deployment**: Plattform som stöder Node.js

## Installation

### Klona repositoriet
``` 
git clone https://github.com/jacobbirke/U09---Fullstack-JS---Jacob-Birke.git
```
Gå till projektkatalogen
```
cd \U09---Fullstack-JS---Jacob-Birke
```
Installera Tailwind CSS
```
npx tailwindcss init -p
```
Backend-uppsättning - Gå till Backend-mappen
```
cd /api
```
Installera beroenden
```
npm install bcryptjs dotenv express express-async-handler jsonwebtoken mongoose morgan concurrently nodemon
```
Skapa en .env-fil
```
touch .env
```
Lägg till variabler som:
```
PORT=3000
DB_URI=mongodb://mongodb_uri
MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_CLUSTER=
MONGO_DBNAME=
JWT_SECRET=
PAYPAL_CLIENT_ID=
```
Starta backend-servern
```
npm run server
```
Frontend-uppsättning
Gå till - frontend-mappen
```
cd /frontend
```
Installera beroenden
```
npm install
```
Starta utvecklingsservern
```
npm run dev
```
## API-dokumentation
### Användarregistrering

Metod: POST <br>
URL: http://localhost:3000/api/users <br>
Body (JSON):
```
{
  "name": "user2",
  "email": "user2@gmail.com",
  "password": "123456"
}
```
### Användarinloggning

Metod: POST <br>
URL: http://localhost:3000/api/users/login <br>
Body (JSON):
```
{
  "email": "user@gmail.com",
  "password": "12345678"
}
```
### Orderhantering
Metod: POST <br>
URL: http://localhost:3000/api/orders <br>
Body (JSON):
```
{
  "orderItems": [
    {
      "productId": "123456789",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "address": "123 Main St",
    "city": "Stockholm",
    "postalCode": "12345",
    "country": "Sweden"
  },
  "paymentMethod": "PayPal"
}
```
### Hämta Ordrar
Metod: GET <br>
URL: http://localhost:3000/api/orders
### Hämta Användare
Metod: GET
URL: http://localhost:3000/api/users
### Hämta Alla Produkter
Metod: GET
URL: http://localhost:3000/api/products
### Redigera Profil
Metod: PUT
URL: http://localhost:3000/api/users/profile <br>
Body (JSON):
```
{
  "name": "Updated Name",
  "email": "updated_email@gmail.com",
  "password": "newpassword123"
}
```
Genom att använda Insomnia för att testa registrerings- och inloggningsfunktionerna har jag kunnat säkerställa att dessa viktiga delar av webshoppen fungerar som de ska. Verktygets funktioner för snabb feedback, enkel felsökning och effektiv validering har varit avgörande för att skapa en användarvänlig applikation.


## Figma Low-Fidelity Design

Här är några low-fidelity wireframes jag skapade i Figma för att planera den grundläggande strukturen i webshopen:

### Home Page
![Home Page Wireframe](/assets\image.png)

### Product Page
![Product Page Wireframe](/assets/image%20copy.png)

### Checkout Page
![Checkout Page Wireframe](/assets/image%20copy%204.png)

### Admin Page
![Checkout Page Wireframe](/assets/image%20copy%203.png)

### Login and Register Page
![Checkout Page Wireframe](/assets/image%20copy%202.png)
