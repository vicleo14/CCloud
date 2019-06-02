const express=require("express");
const morgan=require("morgan");
const exphbs=require("express-handlebars");
const path=require("path");
var bodyParser = require('body-parser');
const passport=require("passport");
var expressSession = require('express-session');
var flash=require("connect-flash");
/* INICIALIZACIONES */
const app=express();
require("./libs/passport");
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
/* INICIALIZACION DE PASSPORT PARA SESIONES */
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
/** SEGURIDAD DE RUTAS **/
app.use('/user/', function (req, res, next) {
    if(req.isAuthenticated())
    {
        next();
    }
    else
    {
        req.flash("message","Please login to continue");
        res.redirect("/login");
    }
  });
app.use('/admin/', function (req, res, next) {
    if(req.isAuthenticated() && req.session.user.admin)
    {
            next();
    }
    else
    {
        req.flash("message","Please login to continue");
        res.redirect("/login");
    }
});



/* VAIABLES GLOBALES */
app.use((req,res,next)=>
{   
    
    app.locals.success=req.flash("success");
    app.locals.message=req.flash("message");
    app.locals.user =req.user;
    console.log("---USER:",req.user);
    /* REVISAR  */
    req.session.user=req.user;
    
    if(req.session.user!=undefined)
    {
        if (req.session.user.role==1)
        {
            req.session.user.admin=true;
        }
        else
        {
            req.session.user.admin=false;
        }
    }
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