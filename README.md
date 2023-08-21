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

## My process

### Built with

- Semantic HTML5 markup
- CSS
- Flexbox
- CSS Grid
- Desktop-first workflow
- [React](https://reactjs.org/) - JS library
- [ReduxToolkit](https://redux-toolkit.js.org/tutorials/quick-start)
- [Router](https://reactrouter.com/en/main)
- Node.js
- Express.js

## Author

- GitHub - [@YusufAkilevi](https://github.com/YusufAkilevi)
