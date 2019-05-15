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
	INSERT INTO typeContact(id_type_contact,tx_name,tx_descrpiption)
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

--obtener contactos de usuario
DROP PROCEDURE IF EXISTS findUserContacts;
DELIMITER #
CREATE PROCEDURE findUserContacts(IN nickname VARCHAR(50))
BEGIN
	SET @curp=(SELECT tx_curp FROM users WHERE tx_nickname LIKE nickname);
	select * from contact where tx_curp LIKE @curp;
	
END #
DELIMITER ;

--Agregar contacto
DROP PROCEDURE IF EXISTS addContact;
DELIMITER #
CREATE PROCEDURE addContact(IN nickname VARCHAR(50),IN contact VARCHAR(100),IN contTypeIn INT)
BEGIN
	SET @curp=(SELECT tx_curp FROM users WHERE tx_nickname LIKE nickname);
	INSERT INTO contact VALUES(contact,@curp,contTypeIn);
END #
DELIMITER ;

