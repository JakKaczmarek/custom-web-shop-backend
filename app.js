const express = require("express");
const app = express();
app.use(express.json());
app.use("/api/bikes", express.static("public"));

/* 
static public
for example when u click or type like below:
 http://localhost:3001/api/bikes/bikesImages/bike1/bike1.jpg
*/
module.exports = app;

/*
  Zad 1
  1. Dodanie możliwości filtrowania i sortowania bikes do /api/bikes
  2. Np. /api/bikes?sort_by=biketitle&sort_order=desc&q=Bike1
  Zad 2
  1. Utworzenie tabeli z images w relacji do bikes
  2. Bike może mieć wiele images, images ma jeden bike
  3. Images przechowuje path
  4. np. { path: "/img/bike1/variant1.jpg" }
  Zad 3
  1.Relacje miedzy images a paths
  2.Połączyć front z back 
  

*/
