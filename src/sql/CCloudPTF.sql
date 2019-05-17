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


