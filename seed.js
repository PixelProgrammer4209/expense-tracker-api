require('dotenv').config();
const mongoose = require('mongoose');
const Expense = require('./models/Expense');

const seedData = [
    { title: "Coffee", amount: 15, category: "Food & Beverage", date: new Date("2026-06-02") },
    { title: "Phone Bill", amount: 1000, category: "Utilities", date: new Date("2026-06-02") },
    { title: "Groceries", amount: 120, category: "Food & Beverage", date: new Date("2026-06-15") },
    { title: "Movie Tickets", amount: 40, category: "Entertainment", date: new Date("2026-07-05") },
    { title: "Electricity", amount: 80, category: "Utilities", date: new Date("2026-07-10") }
];

const seedDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB cluster!");

        await Expense.deleteMany({});
        console.log("Old data cleared");

        await Expense.insertMany(seedData);
        console.log("Database successfully seeded!");
    }

    catch(error){
        console.log("Error connecting or seeding: ",error);
    }
    finally{
        mongoose.connection.close();
    }
};

seedDB();