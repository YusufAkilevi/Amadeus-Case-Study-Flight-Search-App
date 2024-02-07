# Amadeus Case Study - Flight Search App

This is a solution to the Amadeus Case Study. A Flight Search App with mock API and mock data.

## Getting Started

Follow these steps to set up the project on your local machine:

1. Clone the Repository: Start by cloning this repository to your local machine using the following command:

   `git clone https://github.com/YusufAkilevi/Amadeus-Case-Study-Flight-Search-App.git `

2. Navigate to the Directory: Move into the project directory using:

   `cd Amadeus-Case-Study-Flight-Search-App`

3. Install Dependencies: Install the project dependencies for both the frontend and backend:

```

    cd frontend
    npm install

    cd ../backend
    npm install


```

4. Start Development Servers: Open two separate terminal windows or tabs. In one, start the Vite development server for the frontend:

```

    cd frontend
    npm run dev

```

In the other terminal, start the Node.js server for the backend:

```
    cd backend
    npm start

```

5. Access the Application: Open your browser and visit http://localhost:5173 to see the frontend application. The backend server is accessible at http://localhost:3000

## Supported Airports and Cities

The flight search app is designed to help you find flights to and from a select list of airports around the world. To ensure the best user experience, the app currently support searches involving the following airports and their respective cities. Please note that the app's functionality is limited to these locations at this time.

### Asia

- **HND** - Haneda Airport, Tokyo, Japan
- **PEK** - Beijing Capital International Airport, Beijing, China
- **HKG** - Hong Kong International Airport, Chek Lap Kok, New Territories, Hong Kong
- **SIN** - Changi Airport, Singapore, Singapore

### Australia

- **SYD** - Sydney Airport, Sydney, Australia

### Europe

- **LHR** - Heathrow Airport, London, United Kingdom
- **CDG** - Charles de Gaulle Airport, Paris, France
- **FRA** - Frankfurt Airport, Frankfurt, Germany
- **AMS** - Amsterdam Airport Schiphol, Amsterdam, Netherlands
- **ZRH** - Zurich Airport, Zurich, Switzerland
- **MAD** - Madrid-Barajas Airport, Madrid, Spain
- **LIS** - Lisbon Airport, Lisbon, Portugal
- **FCO** - Leonardo da Vinci–Fiumicino Airport, Rome, Italy
- **VIE** - Vienna International Airport, Vienna, Austria
- **BUD** - Budapest Ferenc Liszt International Airport, Budapest, Hungary
- **HEL** - Helsinki-Vantaa Airport, Helsinki, Finland
- **OSL** - Oslo Airport, Gardermoen, Oslo, Norway
- **ARN** - Stockholm Arlanda Airport, Stockholm, Sweden
- **CPH** - Copenhagen Airport, Copenhagen, Denmark
- **DUB** - Dublin Airport, Dublin, Ireland
- **EDI** - Edinburgh Airport, Edinburgh, United Kingdom
- **MUC** - Munich Airport, Munich, Germany
- **BRU** - Brussels Airport, Brussels, Belgium

### Middle East

- **DXB** - Dubai International Airport, Dubai, United Arab Emirates

### North America

- **LAX** - Los Angeles International Airport, Los Angeles, United States
- **JFK** - John F. Kennedy International Airport, New York City, United States
- **YYZ** - Toronto Pearson International Airport, Toronto, Canada
- **MEX** - Mexico City International Airport, Mexico City, Mexico

### South America

- **GIG** - Rio de Janeiro/Galeão – Antonio Carlos Jobim International Airport, Rio de Janeiro, Brazil
- **EZE** - Ministro Pistarini International Airport, Buenos Aires, Argentina

### Africa

- **CPT** - Cape Town International Airport, Cape Town, South Africa

### Turkey

- **ADA** - Şakirpaşa Airport, Adana
- **GZP** - Gazipaşa Airport, Alanya
- **ESB** - Esenboğa International Airport, Ankara
- **AYT** - Antalya Airport, Antalya
- **BJV** - Milas–Bodrum Airport, Bodrum
- **IST** - Istanbul Airport, Istanbul
- **SAW** - Sabiha Gökçen International Airport, Istanbul
- **ADB** - Adnan Menderes Airport, İzmir
- **NAV** - Kapadokya Airport, Nevşehir

Please ensure your flight search queries involve these airports to guarantee accurate search results. 

## Overview

### The challenge

#### Açıklama

Bir uçuş arama uygulaması için frontend application geliştirilecek.

##### Beklentiler:

- ###### Arama Özelliği:

- Kalkış havaalanı, varış havaalanı, kalkış tarihi, varış tarihi seçilebilen bir arama kutusu yapılmalı
- “Tek yönlü uçuş” olduğunu belirten bir seçenek olmalı. Bu seçildiyse varış tarihi girilmemeli.
- Dönen sonuçlar listelenmeli.
- Kalkış ve varış havaalanı input kutularında yazıldığı anda havaalanları koda ve şehre göre search edilmeli ve uygun olanlar listelenmeli.
- Kalkış ve varış tarihi input kutularında datepicker kullanılmalı.
- Tüm alanların validasyonu yapılmalı
- ###### Listeleme Özelliği:
- Listelenen uçuşlar kalkış saati, varış saati, uçuş uzunluğu, ya da fiyata göre sıralanabilmeli
  Sunucudan cevap gelene kadar kullanıcıya “yükleniyor” animasyonu gösterilmeli
- Listelenen uçuşların detay bilgileri gösterilmeli (havayolu, şehir, vs.)
- Hata kontrolü: Sunucudan gelen tüm hata durumları handle edilmeli
- Mock Data: Tüm API istekleri için bir mock API ve mock data oluşturulmalı. Frontend buna yapılan istekler üzerinden çalışmalı.
- Boş data kontrolü: Sunucudan boş data gelmesi durumu handle edilmeli
- Framework: İstenilen Javascript framework kullanılabilir
- Git versiyon sistemi kullanılmalı. Proje GitHub’a yüklenilecek.

### Links

- Solution URL: [https://github.com/YusufAkilevi/Amadeus-Case-Study-Flight-Search-App](https://github.com/YusufAkilevi/Amadeus-Case-Study-Flight-Search-App)
- Live URL: [https://flight-search-app-yakilevs.netlify.app/](https://flight-search-app-yakilevs.netlify.app/)
  
## Hosting Note

Please be aware that this application is hosted on a platform using a **free plan**. Due to the nature of free hosting services, the server may become inactive during periods of inactivity. As a result, when accessing the app after it has been idle, there might be a delay (approximately 50 seconds or so) while the server starts up again.



## My process

### Built with

- Semantic HTML5 markup
- CSS Modules
- Flexbox
- CSS Grid
- Material UI
- Desktop-first workflow
- Javascript
- dayjs
- [React](https://reactjs.org/) - JS library
- Node.js
- Express.js
- Vite

## Author

- GitHub - [@YusufAkilevi](https://github.com/YusufAkilevi)
- Website - [@YusufAkilevi](https://yusufakilevi.netlify.app/)
