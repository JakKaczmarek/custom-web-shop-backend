import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
const app = express();
const corsOptions = {
  origin: "*",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
};
app.use(cors(corsOptions));
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
 http://localhost:8000/api/bikes/bikesImages/bikeLogo/logoebike.png
*/
export default app;
