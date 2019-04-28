--addRequestState(IN in_desc VARCHAR(300))
--addActionType(IN cod INT,IN in_name VARCHAR(50),IN in_desc VARCHAR(300))
--addRole(IN cod INT,IN in_name VARCHAR(50),IN in_desc VARCHAR(300))
--addContactType(IN cod INT,IN in_name VARCHAR(50),IN in_desc VARCHAR(300))
--addKeyType(IN cod INT,IN in_name VARCHAR(50),IN in_desc VARCHAR(300))


--Agrega un requestState
DROP DATABASE IF EXISTS addRequestState;
DELIMITER #
CREATE PROCEDURE addRequestState(IN cod INT,IN in_desc VARCHAR(300))
BEGIN
	INSERT INTO requestState(id_reqS,tx_desc) VALUES(cod,in_desc);
END #
DELIMITER ;

--Agrega un actionType
DROP DATABASE IF EXISTS addActionType;
DELIMITER #
CREATE PROCEDURE addActionType(IN cod INT,IN in_name VARCHAR(50),IN in_desc VARCHAR(300))
BEGIN
	INSERT INTO actionType(id_action_type,tx_name,tx_description) VALUES(cod,in_name,in_desc);
END #
DELIMITER ;
--Agrega un Rol
DROP DATABASE IF EXISTS addRole;
DELIMITER #
CREATE PROCEDURE addRole(IN cod INT,IN in_name VARCHAR(50),IN in_desc VARCHAR(300))
BEGIN
	INSERT INTO roles(id_role,tx_name,tx_description) VALUES(cod,in_name,in_desc);
END #
DELIMITER ;
--Agrega un contactType
DROP DATABASE IF EXISTS addContactType;
DELIMITER #
CREATE PROCEDURE addContactType(IN cod INT,IN in_name VARCHAR(50),IN in_desc VARCHAR(300))
BEGIN
	INSERT INTO typeContact(id_type_contact,tx_name,tx_descrpiption)
    VALUES(cod,in_name,in_desc);
END #
DELIMITER ;
--Agrega un keyType
DROP DATABASE IF EXISTS addKeyType;
DELIMITER #
CREATE PROCEDURE addKeyType(IN cod INT,IN in_name VARCHAR(50),IN in_desc VARCHAR(300))
BEGIN
	INSERT INTO keyType(id_key_type,tx_type,tx_description) 
    VALUES(cod,in_name,in_desc);
END #
DELIMITER ;
