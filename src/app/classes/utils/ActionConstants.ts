export class ActionConstants
{
    public static readonly ACTION_SESSION_UNDEFINED:number=1000;
    public static readonly ACTION_SESSION_LOGINSUCCESSFUL:number=1001;
    public static readonly ACTION_SESSION_INCORRECTPASSWORD:number=1002;
    public static readonly ACTION_SESSION_USERLOCKED:number=1003;
    public static readonly ACTION_SESSION_USERUNLOCKED:number=1004;
    public static readonly ACTION_SESSION_USERUPDATED:number=1005;
    public static readonly ACTION_SESSION_USERREGISTRERED:number=1006;
    public static readonly ACTION_SESSION_MASTERUSERREGISTRERED:number=1007;
    public static readonly ACTION_SESSION_USERDELETED:number=1008;
    public static readonly ACTION_SESSION_USERPASSWORDCHANGED:number=1009;
    public static readonly ACTION_FILE_UNDEFINED:number=2000;
    public static readonly ACTION_FILE_UPLOADED:number=2001;
    public static readonly ACTION_FILE_DOWNLOADED:number=2002;
    public static readonly ACTION_FILE_SHARED:number=2003;
    public static readonly ACTION_FILE_NOTFOUND:number=2004;
    public static readonly ACTION_FILE_CORRUPTED:number=2005;
    public static readonly ACTION_KEY_UNDEFINED:number=3000;
    public static readonly ACTION_KEY_NEWMASTERKEY:number=3001;
    public static readonly ACTION_KEY_MASTERKEYCOMPROMISSED:number=3002;
    public static readonly ACTION_KEY_SYMMETRICKEYGENERATED:number=3003;
    public static readonly ACTION_KEY_SYMMETRICKEYUPLOADED:number=3004;
    public static readonly ACTION_KEY_MACGENERATED:number=3005;
    public static readonly ACTION_KEY_MACUPLOADED:number=3006;
    public static readonly ACTION_KEY_SYMMETRICKEYDECIPHERED:number=3007;
    public static readonly ACTION_KEY_MACDECIPHERED:number=3008;
    public static readonly ACTION_KEY_SYMMETRICKEYCOMPROMISSED:number=3009;

}