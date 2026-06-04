require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Expense = require('./models/Expense');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected to MongoDB Atlas!")).catch((err) => console.error("Database connection error", err));

app.get('/api/expenses', async (req,res) =>{
    try{
        const expenses = await Expense.find();

        res.status(200).json(expenses);
    }
    catch(error){
        res.status(500).json({message: "Failed to fetch expenses", error});
    }
});

app.get('/api/expenses/summary',async (req,res) => {
    try{
        const summary = await Expense.aggregate([
            {
                $group:{
                    _id: "$category",
                    totalSpent:{$sum: "$amount"}
                }
            },
            {
                $sort:{
                    totalSpent:-1
                }
            }
        ]);

        res.status(200).json(summary)
    }
    catch(error){
        res.status(500).json({message:"Failed to generate summary",error});
    }
});


app.post('/api/expenses', async(req,res) =>{
    try{
        const newExpenseData = req.body;
        const newExpense = new Expense(newExpenseData);
        const savedExpense = await newExpense.save();

        res.status(200).json(savedExpense);
    }

    catch(error){
        res.status(400).json({message: "Failed to create expense", error: error.message});
    }
});

app.put('/api/expenses/:id', async (req,res) =>{
    try{
        const expenseId = req.params.id;
        const updateData = req.body;

        const updatedExpense = await Expense.findByIdAndUpdate(expenseId, updateData, {new: true});
        res.status(200).json(updatedExpense);
    }
    catch(error){
        res.status(400).json({message: "Failed to update",error: error.message});
    }
});

app.delete('/api/expenses/:id', async(req,res)=>{
    try{
        const expenseId = req.params.id;
        const deletedExpense = await Expense.findByIdAndDelete(expenseId);
        if (deletedExpense === null){
            res.status(404).json({message: "Expense not found"});
        }
        else{
            res.status(200).json({message: "Successfully deleted"})
        }
    }
    catch(error){
        res.status(500).json({message: "Failed to delete", error: error.message});
    }
});
    

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});