"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
// import path from "path";
const cors_1 = __importDefault(require("cors"));
const users = [
    {
        id: 1,
        name: "Maria Doe",
        email: "maria@example.com",
        password: "maria123",
    },
    {
        id: 2,
        name: "Juan Doe",
        email: "juan@example.com",
        password: "juan123",
    },
];
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("Hello from TypeScript server");
});
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = users.find((user) => {
        return user.email === email && user.password === password;
    });
    if (!user) {
        return res.status(404).send("User Not Found!");
    }
    return res.status(200).json(user);
});
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
