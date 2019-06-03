window.confirmReq = function(code)
{
	{
		console.log(code.user);
		console.log(code.idFile);
		console.log(code.keyTypeNum);
		window.infoContainer = {
	          "user":code.user,
	          "idFile":code.idFile,
	          "keyType":code.keyTypeNum,
	          "code":code.code
	    }
	}
}
	/*var info={
		idFile:,
		code:
	}

	var petition=new XMLHttpRequest;
    var data=JSON.stringify(info);
    petition.open("POST","http://localhost:3000/key/findHashes");
    petition.setRequestHeader("Content-Type", "application/json");
    petition.send(data);*/
    /*window.infoContainer = {
    	"user":code.user,
    	"idFile":code.idFile,
    	"keyType":code.keyTypeNum
    	//"code":code
    }*/
}