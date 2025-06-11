# 📊 Business Analysis Tool

> ⚠️ **AI-Generated Project:**  
> This project and its documentation were generated with the assistance of AI.

---

## 📝 Overview

A comprehensive business dashboard application featuring a modern React frontend and a robust Java Spring/Hibernate backend, integrated with a MySQL database. This tool streamlines business management, analytics, and reporting.

---

## 🧰 Tech Stack

- **Frontend:** React + Vite + Tailwind CSS (`localhost:5000`)
- **Backend:** Java Spring Framework + Hibernate ORM + MySQL (`localhost:8080`)
- **Database:** MySQL (`businessanaysisdb`)

---

## ✨ Key Features

- 👥 Manage customers, products, and sales
- 📦 Inventory tracking with low-stock alerts
- 📊 Financial and sales analytics dashboards
- 🔗 RESTful API with full CRUD operations
- 💻 Responsive UI with dark mode and advanced filtering
- 🔒 Secure authentication and user management

---

## 📁 Project Structure

```
BusinessTool/
  .env
  build.sh
  run-java-backend.sh
  setup-mysql-database.sql
  package.json
  pom.xml
  client/
    index.html
    src/
  src/
    main/java/com/businessdashboard/
  ...
```

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js (for frontend)
- Java 21 & Maven (for backend)
- MySQL Server (`localhost:3306`)

### 2. Database Setup

```sh
mysql -u root -p < setup-mysql-database.sql
```
Or:
```sh
./setup-mysql-integration.sh
```

### 3. Backend Setup

```sh
./run-java-backend.sh
```
Or manually:
```sh
mvn compile
mvn exec:java -Dexec.mainClass="com.businessdashboard.Application"
```
Backend runs at: [http://localhost:8080](http://localhost:8080)

### 4. Frontend Setup

```sh
npm install
npm run dev
```
Frontend runs at: [http://localhost:5000](http://localhost:5000)

---

## 🔌 API Endpoints

See [README-Spring-Hibernate.md](README-Spring-Hibernate.md) for full details.

- **Customers:** `GET/POST/PUT/DELETE /api/customers`
- **Products:** `GET/POST/PUT/DELETE /api/products`
- **Sales:** `GET/POST/DELETE /api/sales`
- **Dashboard:** `GET /api/dashboard/stats`

---

## 🛠️ Development Workflow

- Use Node.js for frontend development.
- Use Java Spring/Hibernate for backend/API.
- Ensure frontend API calls target port 8080 for backend integration.

---

## 🔄 Migration Path

1. Update frontend API calls to use port 8080.
2. Test all features with the Java backend.
3. Deploy frontend and backend for production.

---

## 📚 References

- [README-Spring-Hibernate.md](README-Spring-Hibernate.md)
- [MYSQL_INTEGRATION_SUMMARY.md](MYSQL_INTEGRATION_SUMMARY.md)
- [SPRING_HIBERNATE_SUMMARY.md](SPRING_HIBERNATE_SUMMARY.md)

---

## 📝 License

MIT
