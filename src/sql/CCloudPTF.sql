--addRequestState(IN in_desc VARCHAR(300))
--addActionType(IN cod INT,IN in_name VARCHAR(50),IN in_desc VARCHAR(300))
--addRole(IN cod INT,IN in_name VARCHAR(50),IN in_desc VARCHAR(300))
--addContactType(IN cod INT,IN in_name VARCHAR(50),IN in_desc VARCHAR(300))
--addKeyType(IN cod INT,IN in_name VARCHAR(50),IN in_desc VARCHAR(300))
--signIn(IN curp VARCHAR(18),IN nameIn VARCHAR(50),	IN lastname_a VARCHAR(50),IN lastname_b VARCHAR(50),IN birthday DATE,IN roleIn INT,IN nickname VARCHAR(50),IN hash_password VARCHAR(256),IN stateIn BOOLEAN,IN contact VARCHAR(100),IN contTypeIn INT)

--Agrega un requestState
DROP PROCEDURE IF EXISTS addRequestState;
DELIMITER #
CREATE PROCEDURE addRequestState(IN cod INT,IN in_desc VARCHAR(300))
BEGIN
	INSERT INTO requestState(id_reqS,tx_desc) VALUES(cod,in_desc);
END #
DELIMITER ;

--Agrega un actionType
DROP PROCEDURE IF EXISTS addActionType;
DELIMITER #
CREATE PROCEDURE addActionType(IN cod INT,IN in_name VARCHAR(50),IN in_desc VARCHAR(300))
BEGIN
	INSERT INTO actionType(id_action_type,tx_name,tx_description) VALUES(cod,in_name,in_desc);
END #
DELIMITER ;
--Agrega un Rol
DROP PROCEDURE IF EXISTS addRole;
DELIMITER #
CREATE PROCEDURE addRole(IN cod INT,IN in_name VARCHAR(50),IN in_desc VARCHAR(300))
BEGIN
	INSERT INTO roles(id_role,tx_name,tx_description) VALUES(cod,in_name,in_desc);
END #
DELIMITER ;
--Agrega un contactType
DROP PROCEDURE IF EXISTS addContactType;
DELIMITER #
CREATE PROCEDURE addContactType(IN cod INT,IN in_name VARCHAR(50),IN in_desc VARCHAR(300))
BEGIN
	INSERT INTO typeContact(id_type_contact,tx_name,tx_description)
    VALUES(cod,in_name,in_desc);
END #
DELIMITER ;
--Agrega un keyType
DROP PROCEDURE IF EXISTS addKeyType;
DELIMITER #
CREATE PROCEDURE addKeyType(IN cod INT,IN in_name VARCHAR(50),IN in_desc VARCHAR(300))
BEGIN
	INSERT INTO keyType(id_key_type,tx_type,tx_description) 
    VALUES(cod,in_name,in_desc);
END #
DELIMITER ;

--Registrar usuario
DROP PROCEDURE IF EXISTS signIn;
DELIMITER #
CREATE PROCEDURE signIn(
	IN curp VARCHAR(18),
	IN nameIn VARCHAR(50),
	IN lastname_a VARCHAR(50),
	IN lastname_b VARCHAR(50),
	IN birthday DATE,
	IN roleIn INT,
	IN nickname VARCHAR(50),
	IN hash_password VARCHAR(256),
	IN stateIn BOOLEAN
)
BEGIN
	INSERT INTO person VALUES(curp,nameIn,lastname_a,lastname_b,birthday,roleIn);
	INSERT INTO users VALUES(nickname,hash_password,stateIn,curp);
	INSERT INTO actions VALUES(now(),nickname,1006);
END #
DELIMITER ;
----------------------------------------------------------------------
--Actualizar usuario
DROP PROCEDURE IF EXISTS updateUser;
DELIMITER #
CREATE PROCEDURE updateUser(
	IN nameIn VARCHAR(50),
	IN lastname_a VARCHAR(50),
	IN lastname_b VARCHAR(50),
	IN birthday DATE,
	IN roleIn INT,
	IN nickname VARCHAR(50),
	IN hash_password VARCHAR(256)
)
BEGIN
	SET @curp=(SELECT tx_curp FROM users WHERE tx_nickname LIKE nickname);
	UPDATE person
	SET tx_name=nameIn,tx_lastname_a=lastname_a,tx_lastname_b=lastname_b,dt_birthday=birthday,id_role=roleIn 
	WHERE tx_curp LIKE @curp;
	UPDATE users SET tx_hash_password=hash_password WHERE tx_nickname LIKE nickname;
	INSERT INTO actions VALUES(now(),nickname,1005);
END #
DELIMITER ;

--Actualizar contrasenia
DROP PROCEDURE IF EXISTS updatePassword;
DELIMITER #
CREATE PROCEDURE updatePassword(
	IN nickname VARCHAR(50),
	IN hash_password VARCHAR(256)
)
BEGIN
	
	UPDATE users 
	SET tx_hash_password=hash_password
	WHERE tx_nickname LIKE nickname;
	INSERT INTO actions VALUES(now(),nickname,1009);
END #
DELIMITER ;

--Bloquear usuario 
DROP PROCEDURE IF EXISTS lockUser;
DELIMITER #
CREATE PROCEDURE lockUser(
	IN nickname VARCHAR(50)
)
BEGIN
	
	UPDATE users 
	SET bl_state=0
	WHERE tx_nickname LIKE nickname;
	INSERT INTO actions VALUES(now(),nickname,1003);
END #
DELIMITER ;
-----------------------------------------------------------------------

--Eliminar usuario
DROP PROCEDURE IF EXISTS deleteUser;
DELIMITER #
CREATE PROCEDURE deleteUser(IN nickname VARCHAR(50))
BEGIN
	SET @curp=(SELECT tx_curp FROM users WHERE tx_nickname LIKE nickname);
	DELETE FROM contact WHERE tx_curp LIKE @curp;
	DELETE FROM actions WHERE id_user  LIKE nickname;	
	DELETE FROM users WHERE tx_nickname LIKE nickname;
	DELETE FROM person WHERE tx_curp LIKE @curp;	
END #
DELIMITER ;

--obtener usuario
DROP PROCEDURE IF EXISTS findUser;
DELIMITER #
CREATE PROCEDURE findUser(IN nickname VARCHAR(50))
BEGIN
	SELECT tx_nickname,tx_hash_password,bl_state,person.tx_curp,tx_name,tx_lastname_a,tx_lastname_b,dt_birthday,id_role
	FROM users INNER JOIN person ON users.tx_curp=person.tx_curp
	WHERE tx_nickname LIKE nickname;
END #
DELIMITER ;


--------------------------------CONTACTOS-------------------------
--Agregar contacto
DROP PROCEDURE IF EXISTS addContact;
DELIMITER #
CREATE PROCEDURE addContact(IN nickname VARCHAR(50),IN contact VARCHAR(100),IN contTypeIn INT)
BEGIN
	SET @curp=(SELECT tx_curp FROM users WHERE tx_nickname LIKE nickname);
	INSERT INTO contact VALUES(contact,@curp,contTypeIn);
END #
DELIMITER ;

--obtener contactos de usuario
DROP PROCEDURE IF EXISTS findUserContacts;
DELIMITER #
CREATE PROCEDURE findUserContacts(IN nickname VARCHAR(50))
BEGIN
	SET @curp=(SELECT tx_curp FROM users WHERE tx_nickname LIKE nickname);
	select id_contact,id_type from contact where tx_curp LIKE @curp;
	
END #
DELIMITER ;

--obtener contactos de usuario DETALLADO
DROP PROCEDURE IF EXISTS findUserDetailedContacts;
DELIMITER #
CREATE PROCEDURE findUserDetailedContacts(IN nickname VARCHAR(50))
BEGIN
	SET @curp=(SELECT tx_curp FROM users WHERE tx_nickname LIKE nickname);
	select id_contact,tx_name,tx_description from contact 
	INNER JOIN typeContact ON contact.id_type=typeContact.id_type_contact 
	where tx_curp LIKE @curp;
	
END #
DELIMITER ;

--obtener contactos de usuario con tipo especifico
DROP PROCEDURE IF EXISTS findUserContactsByType;
DELIMITER #
CREATE PROCEDURE findUserContactsByType(IN nickname VARCHAR(50), IN typeC INT)
BEGIN
	SET @curp=(SELECT tx_curp FROM users WHERE tx_nickname LIKE nickname);
	select id_contact,id_type from contact where tx_curp LIKE @curp AND id_type=typeC;
	
END #
DELIMITER ;

--eliminar contacto
DROP PROCEDURE IF EXISTS deleteContact;
DELIMITER #
CREATE PROCEDURE deleteContact( IN contactID VARCHAR(100))
BEGIN
	
	DELETE FROM contact WHERE id_contact LIKE contactID;
END #
DELIMITER ;

--------------------------------FILES-------------------------
--crear
DROP PROCEDURE IF EXISTS createFile;
DELIMITER #
CREATE PROCEDURE createFile(IN nickname VARCHAR(50),IN idFile VARCHAR(256),cName VARCHAR(100),dName VARCHAR(100),mac VARCHAR(256),nb_size INT)
BEGIN
	INSERT INTO files VALUES(idFile,cName,dName,mac,nb_size,now());
	INSERT INTO users_files VALUES(nickname,idFile);
END #
DELIMITER ;
--compartir archivo
DROP PROCEDURE IF EXISTS shareFile;
DELIMITER #
CREATE PROCEDURE shareFile(IN nickname VARCHAR(50),IN idFile VARCHAR(256))
BEGIN
	INSERT INTO users_files VALUES(nickname,idFile);
END #
DELIMITER ;
--quitar acceso a archivo
DROP PROCEDURE IF EXISTS unshareFile;
DELIMITER #
CREATE PROCEDURE unshareFile(IN nickname VARCHAR(50),IN idFile VARCHAR(256))
BEGIN
	DELETE FROM users_files WHERE id_user LIKE nickname AND id_file LIKE idFile;
END #
DELIMITER ;
--actualizar
DROP PROCEDURE IF EXISTS updateFile;
DELIMITER #
CREATE PROCEDURE updateFile(IN idFile VARCHAR(256),cName VARCHAR(100),dName VARCHAR(100),mac VARCHAR(256),size INT)
BEGIN
	UPDATE files 
	SET tx_ciphered_name=cName,tx_deciphered_name= dName,tx_mac=mac,nb_size=size 
	WHERE id_file LIKE idFile;
END #
DELIMITER ;

--eliminar
DROP PROCEDURE IF EXISTS deleteFile;
DELIMITER #
CREATE PROCEDURE deleteFile(IN idFile VARCHAR(256))
BEGIN
	DELETE FROM files WHERE id_file LIKE idFile;
END #
DELIMITER ;
--encontrar archivos por usuario
DROP PROCEDURE IF EXISTS findFilesByUser;
DELIMITER #
CREATE PROCEDURE findFilesByUser(IN nickname VARCHAR(50))
BEGIN
	SELECT * FROM files INNER JOIN users_files 
	ON files.id_file= users_files.id_file 
	WHERE id_user LIKE nickname;

END #
DELIMITER ;
--encontrar archivos por usuario
DROP PROCEDURE IF EXISTS findFileById;
DELIMITER #
CREATE PROCEDURE findFileById(IN idFile VARCHAR(256))
BEGIN
	SELECT * FROM files 
	WHERE id_file LIKE idFile;

END #
DELIMITER ;
--encontrar usuarios con acceso por archivos
DROP PROCEDURE IF EXISTS findUsersOfFile;
DELIMITER #
CREATE PROCEDURE findUsersOfFile(IN idFile VARCHAR(256))
BEGIN
	SELECT id_user FROM users_files 
	WHERE id_file LIKE idFile;

END #
DELIMITER ;
---------------------------------KEYS-------------------------
--crear
DROP PROCEDURE IF EXISTS createKey;
DELIMITER #
CREATE PROCEDURE createKey(IN idFile VARCHAR(256),IN idType INT,IN txKeyName VARCHAR(100),IN txHash VARCHAR(256))
BEGIN
	INSERT INTO keysC VALUES(idFile,idType,txKeyName,txHash);
END #
DELIMITER ;

--actualizar
DROP PROCEDURE IF EXISTS updateKey;
DELIMITER #
CREATE PROCEDURE updateKey(IN idFile VARCHAR(256),IN idType INT,IN txKeyName VARCHAR(100),IN txHash VARCHAR(256))
BEGIN
	UPDATE keysC 
	SET tx_key_name=txKeyName,tx_hash=txHash 
	WHERE id_file LIKE idFile AND id_type LIKE idType;
END #
DELIMITER ;
--encontrar llaves por id de archivo
DROP PROCEDURE IF EXISTS findKeysByFile;
DELIMITER #
CREATE PROCEDURE findKeysByFile(IN idFile VARCHAR(256))
BEGIN
	SELECT * FROM keysC WHERE id_file LIKE idFile;
END #
DELIMITER ;
--encontrar llave por id de archivo y tipo
DROP PROCEDURE IF EXISTS findKeyByFileType;
DELIMITER #
CREATE PROCEDURE findKeyByFileType(IN idFile VARCHAR(256), IN idType INT)
BEGIN
	SELECT * FROM keysC WHERE id_file LIKE idFile AND id_type=idType;
END #
DELIMITER ;
--eliminar
DROP PROCEDURE IF EXISTS deleteKey;
DELIMITER #
CREATE PROCEDURE deleteKey(IN idFile VARCHAR(50), IN idType INT)
BEGIN
	DELETE FROM keysC WHERE id_file LIKE idFile AND id_type LIKE idType;
END #
DELIMITER ;

--------------------------------ACTIONS-------------------------
--crear
DROP PROCEDURE IF EXISTS createAction;
DELIMITER #
CREATE PROCEDURE createAction(IN nickname VARCHAR(50), IN typeAct INT)
BEGIN
	INSERT INTO actions VALUES(now(),nickname,typeAct);
END #
DELIMITER ;

--eliminar acciones de un usuario
DROP PROCEDURE IF EXISTS deleteActions;
DELIMITER #
CREATE PROCEDURE deleteActions(IN nickname VARCHAR(50))
BEGIN
	DELETE FROM actions WHERE id_user LIKE nickname;
END #
DELIMITER ;

--encontrar acciones de un usuario
DROP PROCEDURE IF EXISTS findActionsByUser;
DELIMITER #
CREATE PROCEDURE findActionsByUser(IN nickname VARCHAR(50))
BEGIN
	SELECT * FROM actions INNER JOIN actionType 
	ON actions.id_type=actionType.id_action_type WHERE id_user LIKE nickname;
END #
DELIMITER ;

--encontrar acciones de un tipo
DROP PROCEDURE IF EXISTS findActionsByType;
DELIMITER #
CREATE PROCEDURE findActionsByType(IN typeAc INT)
BEGIN
	SELECT * FROM actions INNER JOIN actionType 
	ON actions.id_type=actionType.id_action_type WHERE id_type=typeAc;
END #
DELIMITER ;

--------------------------------REQUEST-------------------------
--crear
DROP PROCEDURE IF EXISTS createRequest;
DELIMITER #
CREATE PROCEDURE createRequest(IN idFile VARCHAR(256),IN idType INT,IN nickname VARCHAR(50))
BEGIN
	INSERT INTO keyRequest VALUES(idFile,idType,nickname,1,-1,now());
END #
DELIMITER ;
--actualizar
DROP PROCEDURE IF EXISTS updateRequest;
DELIMITER #
CREATE PROCEDURE updateRequest(IN idFile VARCHAR(256),IN idType INT,IN nickname VARCHAR(50), IN stateR INT,IN codeR INT)
BEGIN
	UPDATE keyRequest 
	SET nb_state=stateR,nb_code=codeR,tst_code=now() 
	WHERE id_file LIKE idFile AND  id_keyType=idType AND id_user LIKE nickname; 
END #
DELIMITER ;

--delete request
DROP PROCEDURE IF EXISTS deleteRequest;
DELIMITER #
CREATE PROCEDURE deleteRequest(IN idFile VARCHAR(256),IN idType INT, IN nickname VARCHAR(50))
BEGIN
	DELETE FROM keyRequest 	WHERE id_file LIKE idFile AND  id_keyType=idType AND id_user LIKE nickname; 
END #
DELIMITER ;

--find requests by user
DROP PROCEDURE IF EXISTS findRequestsByUser;
DELIMITER #
CREATE PROCEDURE findRequestsByUser(IN nickname VARCHAR(50))
BEGIN
	SELECT * FROM keyRequest 
	WHERE id_user LIKE nickname;
END #
DELIMITER ;

--find requests by user and file id
DROP PROCEDURE IF EXISTS findRequestByUserAndFile;
DELIMITER #
CREATE PROCEDURE findRequestByUserAndFile(IN nickname VARCHAR(50),IN idFile VARCHAR(256))
BEGIN
	SELECT * FROM keyRequest 
	WHERE id_user LIKE nickname AND id_file LIKE idFile;
END #
DELIMITER ;

--find requests by user and file id
DROP PROCEDURE IF EXISTS findRequestByUserFileType;
DELIMITER #
CREATE PROCEDURE findRequestByUserFileType(IN nickname VARCHAR(50),IN idFile VARCHAR(256),IN idKey INT)
BEGIN
	SELECT * FROM keyRequest 
	WHERE id_user LIKE nickname AND id_file LIKE idFile AND id_keyType=idKey;
END #
DELIMITER ;