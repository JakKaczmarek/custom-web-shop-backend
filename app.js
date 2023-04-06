const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static('public'));

module.exports = app;

/*
  Zad 1
  1. Dodanie możliwości filtrowania i sortowania bikes do /api/bikes
  2. Np. /api/bikes?sort_by=title&sort_order=desc&q=Bike1
  Zad 2
  1. Utworzenie tabeli z images w relacji do bikes
  2. Bike może mieć wiele images, images ma jeden bike
  3. Images przechowuje path
  4. np. { path: "/img/bike1/variant1.jpg" }
*/