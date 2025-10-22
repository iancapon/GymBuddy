import express from "express";
import routes from "./routes/index";
import cors from "cors";

const app = express();

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};
app.use(cors());
app.use(express.json());


// Montar todas las rutas desde index.ts
app.use("/api", routes);


app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.listen(4000, () => {
  console.log("🚀 Server running at http://localhost:4000");

});
