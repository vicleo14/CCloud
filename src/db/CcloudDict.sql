--requestState
CALL addRequestState(1,"New request");
CALL addRequestState(2,"Request confirmed by email");
CALL addRequestState(5,"Request finished");
--actionType
--1000-1999:Codigos de sesiones
--2000-2999: Codigos de archivos
--3000-3999:Codigos de llaves
CALL addActionType(1000,"Undefined session action","");
CALL addActionType(1001,"Login successful","A user login was successfully  completed");
CALL addActionType(1002,"Incorrect password","A user login failed because the password does not match");
CALL addActionType(1003,"User locked","A user account was locked because has to many attempts");
CALL addActionType(1004,"User unlocked","");
CALL addActionType(1005,"User updated","A user information was updated");
CALL addActionType(1006,"User registrered","New user registrered");
CALL addActionType(1007,"Master user registrered","New master user registrered");
CALL addActionType(2000,"Undefined file action","");
CALL addActionType(2001,"File uploaded","New file uploaded by a user");
CALL addActionType(2002,"File dowunloaded","A user download a file");
CALL addActionType(2003,"File shared","A user shared her file with another user");
CALL addActionType(2004,"File not found","The requested file was not found");
CALL addActionType(2005,"File corrupted","The calculated MAC does not match with the original MAC");
CALL addActionType(3000,"Undefined key action","");
CALL addActionType(3001,"New master-key generated","The system generates a new public and private keys for the managers");
CALL addActionType(3002,"Master master-key compromissed","Some of the master users notifies to the system tha the keys were compromised");
CALL addActionType(3003,"New symmetric key generated","The system generated a new symmetric key");
CALL addActionType(3004,"New symmetric key uploaded","A user uploaded a new symmetric key file");
CALL addActionType(3005,"New MAC key generated","The system generated a new MAC key");
CALL addActionType(3006,"New MAC key uploaded","A user uploaded a new MAC key file");
CALL addActionType(3007,"Symmetric key deciphered ","A master user deciphered a symmetric key by providing her master key");
CALL addActionType(3008,"Symmetric MAC key deciphered","The system user deciphered a MAC key by providing her master key");
CALL addActionType(3009,"Symmetric key compromissed","Some user notifies to the system that one of her symmetric files was compromised");
--role
CALL addRole(0,"Admin user","User with all privileges.");
CALL addRole(1,"Master user","User with privileges for decipher keys.");
CALL addRole(2,"Common user","Client user. Can upload, donload or share her files.");
--contactType
CALL addContactType(0,"Undefined","The contact type wan not defined");
CALL addContactType(1,"Email","An email address.");
CALL addContactType(2,"Phoe number","Phone number for calls");
CALL addContactType(3,"Facebook","");
CALL addContactType(4,"Twitter","");
CALL addContactType(5,"WhatsApp","Phone number associated with a whatsApp profile");
--keyType
CALL addKeyType(0,"Undefined key type","");
CALL addKeyType(1,"Encrypt/Decrypt key","Symmetric key for cipher and decipher files");
CALL addKeyType(2,"Integrity key","Key for check the file integrity");