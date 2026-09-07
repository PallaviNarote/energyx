const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Home/Test route
app.get("/", (req, res) => {
    res.json({
        message: "XBolt Backend is Running!"
    });
});

// Products API
app.get("/api/products", (req, res) => {
    const products = [
        {
            id: 1,
            name: "Energy Drink",
            price: 99,
            category: "Energy"
        },
        {
            id: 2,
            name: "Energy Drink Zero",
            price: 109,
            category: "Zero Sugar"
        },
        {
            id: 3,
            name: "Energy Drink Plus",
            price: 129,
            category: "Energy"
        }
    ];

    res.json(products);
});

// Contact API
app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;

    console.log("New Contact Message");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    res.json({
        message: "Your message has been received!"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});