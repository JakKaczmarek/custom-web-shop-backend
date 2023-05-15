import express from "express";
import fileUpload from "express-fileupload";

const app = express();
app.use(express.json());
app.use("/api/bikes", express.static("public"));
app.use(
  fileUpload({
    limits: {
      fileSize: 10000000,
    },
    abortOnLimit: true,
  })
);

/* 
static public
for example when u click or type like below:
 http://localhost:3000/api/bikes/bikesImages/bike1/bike1.jpg
*/
export default app;
