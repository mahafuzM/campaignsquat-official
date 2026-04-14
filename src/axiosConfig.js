import axios from "axios";

const API = axios.create({
  // হোস্টিং করার পর এখানে আপনার আসল ডোমেইন লিংক দেবেন
  // আপাতত লোকালহোস্ট দিয়ে রাখতে পারেন
  baseURL: "https://api.campaignsquat.com",
});

export default API;
