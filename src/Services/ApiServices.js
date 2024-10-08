// src/services/apiServices.js
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/ojp", // Replace with your actual base URL
    // baseURL: "https://api.escuelajs.co/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

export const login = async (email, password) => {
    const response = await api.post("/user/login", { email, password });
    return response.data;
};

export const signup = async (userData) => {
    const response = await api.post("/user/singUp", userData);
    return response.data;
};

// Add more API services as needed
