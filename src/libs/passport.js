const passport=require("passport");
const LocalStrategy=require("passport-local").Strategy;

passport.use("local.login", new LocalStrategy({
    usernameField:'nickname',
    passwordField:'password',
    passReqToCallback:true
}, async (req,username,password,done)=>
{
    const BUser1=require("../app/classes/bussines/BUser");
    const DTOUser1=require("../app/classes/dataAccess/dto/DTOUser");
    var buser=new BUser1.BUser();
    try
    {
        
        var result=await buser.userLogin(username,password);
        if(result!=null)
        {
            //console.log("RESUTL::::",result);
            
            var user={
                username,
                role:result.getRole()
            }
            //console.log("Existe");
            //Subir objeto de usuario despues
            done(null,user,req.flash("success","Welcome "+user.username));
        }
        else
        {
            console.log("Entra al caso de error");
            done(null,false,req.flash("message","Sorry, something is wrong "));
        }       
    }
    catch(x)
    {
        console.log("ERROR:",x);
        done(null,false,req.flash("message","Sorry, something is wrong "));
    }
}));

passport.serializeUser((user,done)=>
{
    done(null,user);
});

passport.deserializeUser((user,done)=>
{
    //console.log(username);
    done(null,user);
});