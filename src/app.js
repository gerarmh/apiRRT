import express from "express";
import morgan from "morgan";
import pkgs from "../package.json";
import Manualroutes from "./routes/manual.routes";
import UserRoutes from './routes/user.routes';
import Authroutes from "./routes/auth.routes";
import soliroutes from "./routes/soli.routes"
import { createRoles } from "./libs/InitilUSP";
import cors from 'cors';


const app = express();
createRoles();
app.set("pkgs", pkgs);

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000'
}));

createRoles();

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    nombre: app.get("pkgs").name,
    versionado: app.get("pkgs").version,
    descripcion: app.get("pkgs").description,
    autor: app.get("pkgs").author,
  });
});

app.use("/api/manual", Manualroutes);

app.use("/api/auth", Authroutes);

app.use("/api/users", UserRoutes);

app.use("/api/soli", soliroutes);



export default app;