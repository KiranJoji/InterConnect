import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCChaZGKpdhTtvbPm1s9mseHjAT-vU0kYE",
  authDomain: "interconnect-9f47a.firebaseapp.com",
  projectId: "interconnect-9f47a",
  storageBucket: "interconnect-9f47a.appspot.com",
  messagingSenderId: "845026843772",
  appId: "1:845026843772:web:040e7955ef8415e733fdf9",
  measurementId: "G-CW4F72JB5L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
