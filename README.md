# Medieinstitutet - Javascript Fördjupning - Gruppuppgift

Resturang "Matad", skapad av [Johan Elgström](https://github.com/johanelgstrom), [Ludvig Thunberg](https://github.com/LudvigThunberg) och [Simon Halvorsen](https://github.com/simonhalvorsen92). FED21S, 2022.

## Information innan vi startar

Det finns sex rader i två .env-filer som behöver ersättas för att e-mail- samt backendfunktionerna ska fungera som tänkt.

### `.env i projektets rot`

Dessa är för EmailJS, vilket är paketet vi använder för att skicka boknings- och avbokningsbekräftelser via e-mail
**REACT_APP_EMAILJS_SERVICE_ID**  
**REACT_APP_EMAILJS_TEMPLATE_ID**  
**REACT_APP_EMAILJS_USER_ID**  
[Läs mer om EmailJS här](https://www.emailjs.com/)

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

För att köra tester, **NOTERA** att webbläsaren i cypress **MÅSTE** vara inställd på svenska

## Tekniker använda i applikationen

**Front-end:**  
EmailJS  
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
