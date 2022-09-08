# Medieinstitutet - Javascript Fördjupning - Gruppuppgift

Resturang "Matad", skapad av [Johan Elgström](https://github.com/johanelgstrom), [Ludvig Thunberg](https://github.com/LudvigThunberg) och [Simon Halvorsen](https://github.com/simonhalvorsen92). FED21S, 2022.

## Information innan vi startar

Det finns tre rader i en .env-fil som behöver ersättas för att e-mailfunktionerna ska fungera som tänkt.

### `.env i backend-mappen`

Anslutning till lokal databas (MongoDB)  
**CONNECTION_STRING**  

Dessa är för Nodemailer, vilket är paketet vi använder för att skicka information från kontaktsidan till vårt företags e-mail  
**EMAIL**  
**PASSWORD**

**CONNECTION_STRING** är det enda som behövs för att applikationen ska fungera, dock utan e-mailrelaterade funktioner.

## För att starta applikationen

### `npm i`

**NOTERA** att detta måste göras i både roten samt i backend-mappen.

### `nodemon`

I backend-mappen

### `npm start`

I roten

Ni måste alltså ha två separata terminalen där ena kör front-end och den andra back-end.

### `npx cypress open`

För att köra tester, **NOTERA** att webbläsaren i cypress **MÅSTE** vara inställd på svenska och sedan helst i Chrome.

## Tekniker använda i applikationen

**Front-end:**   
React w/ Typescript  
React-calendar  
SCSS

**Back-end:**  
NodeJS (Express)  
MongoDB  
Mongoose  
Nodemailer

**Testning:**  
Cypress
