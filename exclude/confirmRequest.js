window.confirmReq = function (code) {
    {
        console.log(code.user);
        console.log(code.idFile);
        console.log(code.keyTypeNum);
        window.infoContainer = {
            "user": code.user,
            "idFile": code.idFile,
            "keyType": code.keyTypeNum,
            "code": code.code
        };
    }
};
