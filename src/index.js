const express=require("express");
const morgan=require("morgan");
const exphbs=require("express-handlebars");
const path=require("path");
var bodyParser = require('body-parser')
/* INICIALIZACIONES */
const app=express();
/* CONFIGURACIONES */
app.set("port",process.env.PORT || 3000);
app.set("views",path.join(__dirname,"views"))
app.engine(".hbs",exphbs({
    defaultLayout:"main",
    layoutsDir:path.join(app.get("views"),"layouts"),
    partialsDir:path.join(app.get("views"),"partials"),
    extname:".hbs",
    helpers:require("./libs/handlebars")
}));
app.set('view engine','hbs');

/* MIDDLEWARES */
app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(bodyParser({limit: '4MB'}));
/* VAIABLES GLOBALES */
app.use((req,res,next)=>
{
    next();
});
/* RUTAS */
app.use(require("./routes/index"));
app.use(require("./routes/authentication"));
app.use("/user",require("./routes/user"));
app.use("/authentication",require("./routes/authentication"));
app.use(require("./routes/messages"));
/* PUBLICO */
app.use(express.static(path.join(__dirname,"public")))
/* INIT */
app.listen(app.get("port"),()=>
{
    console.log("Servicio en ",app.get("port"));
});