import express from "express"; //modules exports
import morgan from "morgan";
import pkgs from "../package.json";
import Manualroutes from "./routes/manual.routes";
import UserRoutes from './routes/user.routes';
import Authroutes from "./routes/auth.routes";
import { createRoles } from "./libs/InitilUSP";
const app = express(); //require the framework
createRoles();

app.set("pkgs", pkgs);

app.use(express.json());
createRoles();
app.use(morgan("dev")); //use morgan for requests of the server

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

export default app; //require the route
