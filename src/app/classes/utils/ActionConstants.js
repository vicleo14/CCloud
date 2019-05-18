"use strict";
exports.__esModule = true;
var ActionConstants = /** @class */ (function () {
    function ActionConstants() {
    }
    ActionConstants.ACTION_SESSION_UNDEFINED = 1000;
    ActionConstants.ACTION_SESSION_LOGINSUCCESSFUL = 1001;
    ActionConstants.ACTION_SESSION_INCORRECTPASSWORD = 1002;
    ActionConstants.ACTION_SESSION_USERLOCKED = 1003;
    ActionConstants.ACTION_SESSION_USERUNLOCKED = 1004;
    ActionConstants.ACTION_SESSION_USERUPDATED = 1005;
    ActionConstants.ACTION_SESSION_USERREGISTRERED = 1006;
    ActionConstants.ACTION_SESSION_MASTERUSERREGISTRERED = 1007;
    ActionConstants.ACTION_SESSION_USERDELETED = 1008;
    ActionConstants.ACTION_SESSION_USERPASSWORDCHANGED = 1009;
    ActionConstants.ACTION_FILE_UNDEFINED = 2000;
    ActionConstants.ACTION_FILE_UPLOADED = 2001;
    ActionConstants.ACTION_FILE_DOWNLOADED = 2002;
    ActionConstants.ACTION_FILE_SHARED = 2003;
    ActionConstants.ACTION_FILE_NOTFOUND = 2004;
    ActionConstants.ACTION_FILE_CORRUPTED = 2005;
    ActionConstants.ACTION_KEY_UNDEFINED = 3000;
    ActionConstants.ACTION_KEY_NEWMASTERKEY = 3001;
    ActionConstants.ACTION_KEY_MASTERKEYCOMPROMISSED = 3002;
    ActionConstants.ACTION_KEY_SYMMETRICKEYGENERATED = 3003;
    ActionConstants.ACTION_KEY_SYMMETRICKEYUPLOADED = 3004;
    ActionConstants.ACTION_KEY_MACGENERATED = 3005;
    ActionConstants.ACTION_KEY_MACUPLOADED = 3006;
    ActionConstants.ACTION_KEY_SYMMETRICKEYDECIPHERED = 3007;
    ActionConstants.ACTION_KEY_MACDECIPHERED = 3008;
    ActionConstants.ACTION_KEY_SYMMETRICKEYCOMPROMISSED = 3009;
    return ActionConstants;
}());
exports.ActionConstants = ActionConstants;
