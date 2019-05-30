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
//app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());
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
app.use("/key",require("./routes/keys"));
app.use(require("./routes/messages"));
app.use("/admin",require("./routes/admin"));
/* PUBLICO */
app.use(express.static(path.join(__dirname,"public")))
/* INIT */
app.listen(app.get("port"),()=>
{
    console.log("Servicio en ",app.get("port"));
});