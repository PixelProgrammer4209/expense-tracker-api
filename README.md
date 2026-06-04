# 📊 Personal Expense Tracker API

A RESTful backend service built with Node.js, Express, and MongoDB to log, categorize, and summarize financial transactions. 

## 🚀 Technical Architecture
This project demonstrates a shift from traditional relational databases to a NoSQL document-based structure. 
* **Database:** MongoDB Atlas (Cloud)
* **Backend:** Node.js & Express.js
* **ODM:** Mongoose (for strict schema validation)

## 🧠 Key Features & Engineering Decisions
* **Aggregation Pipelines:** Utilized MongoDB's native `$match`, `$group`, and `$sort` operators to calculate monthly category summaries directly at the database level, optimizing network bandwidth and server memory.
* **Strict Schema Enforcement:** Implemented Mongoose to prevent corrupted data entry (e.g., rejecting string values in numerical cost fields) and enforce required fields.
* **RESTful API Design:** Fully compliant CRUD operations using standard HTTP methods (GET, POST, PUT, DELETE).

## 🛠️ Local Installation
1. Clone the repository: `git clone <your-repo-link>`
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory and add your MongoDB URI: `MONGO_URI=your_connection_string`
4. Seed the database (optional): `node seed.js`
5. Start the server: `node server.js`
