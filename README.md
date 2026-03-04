🚗 AutoBuy – Car Buying Web Application

AutoBuy is a full-stack car buying platform designed for individual buyers to explore, compare, and initiate the purchase of new cars.
This project is built as a resume-grade application, focusing on stable backend architecture, real-world business workflows, and clean full-stack integration.
<img width="2518" height="1416" alt="Screenshot 2026-03-04 021734" src="https://github.com/user-attachments/assets/985b8f63-7e9f-4b73-8776-79aacdb3327e" />
<img width="849" height="1076" alt="Screenshot 2026-03-03 175717" src="https://github.com/user-attachments/assets/2e4beed0-84d8-4c34-8a6b-cc535554b8a8" />



✨ Features
👤 Buyer
<img width="2508" height="1363" alt="Screenshot 2026-03-04 021808" src="https://github.com/user-attachments/assets/385f7112-eebe-446d-af90-738823bc3ad0" />
<img width="2530" height="1408" alt="Screenshot 2026-03-04 021821" src="https://github.com/user-attachments/assets/777c433d-23ad-4a6d-b1ee-0f5c0447fd96" />

Browse approved car listings

Filter cars by brand, price, fuel type, and body type

Compare multiple cars side-by-side

View detailed car information

EMI calculation based on tenure and interest rate

Save/bookmark favorite cars

Contact dealer for purchase inquiry

🏢 Dealer
<img width="2533" height="1390" alt="Screenshot 2026-03-04 021857" src="https://github.com/user-attachments/assets/36963aa5-e8ba-4d75-b583-f9fd20fc7153" />

Register and login securely

Add new car listings

Upload car images

Upload car registration documents

Edit or delete own listings

Track approval status of listings

🛡 Admin
<img width="2559" height="1126" alt="Screenshot 2026-03-04 021925" src="https://github.com/user-attachments/assets/165a95a0-0460-49d8-8833-a9dc2c06d436" />

Secure admin login

Review and approve/reject car listings

Verify dealer documents

Manage platform content

🏗️ Tech Stack
Backend

Spring Boot

Spring Security + JWT

Spring Data JPA

MySQL

Swagger OpenAPI

Frontend

React.js

Axios

React Router

Deployment

Hosted online using free cloud hosting

Backend and frontend deployed separately

📊 Business Logic Highlights

Admin approval workflow for dealer-submitted car listings

EMI calculation logic based on:

Car price

Down payment

Interest rate

Loan tenure

Image upload handling for car listings

Pagination and filtering for scalability

📑 API Documentation

All REST APIs are documented using Swagger.

📍 Swagger UI available at:

/swagger-ui.html

APIs are grouped by role:

/auth/*

/buyer/*

🚀 How to Run Locally
Backend
git clone https://github.com/your-username/autobuy.git
cd autobuy-backend

Configure MySQL in application.yml

Run the Spring Boot application

Frontend
cd autobuy-frontend
npm install
npm start

👨‍💻 Author

Atul
B.Tech Electrical Engineering
Backend & Full Stack Developer

/dealer/*

/admin/*
