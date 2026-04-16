import axios from "axios";

const API = axios.create({
  // এটি লোকালহোস্ট এবং লাইভ সার্ভার দুটিতেই অটোমেটিক কাজ করবে
  baseURL: window.location.hostname === "localhost" 
    ? "http://localhost:5000/api" 
    : "/api",
});

export default API;