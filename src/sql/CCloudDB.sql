DROP DATABASE IF EXISTS db_Ccloud;
CREATE DATABASE db_Ccloud;
USE db_Ccloud;

CREATE TABLE actionType(
id_action_type INT NOT NULL PRIMARY KEY,
tx_name VARCHAR(50) NOT NULL,
tx_description VARCHAR(300)
)ENGINE=InnoDB;
CREATE TABLE roles(
id_role INT NOT NULL PRIMARY KEY,
tx_name VARCHAR(50) NOT NULL,
tx_description VARCHAR(300)
)ENGINE=InnoDB;
CREATE TABLE requestState(
id_reqS INT NOT NULL PRIMARY KEY,
tx_desc VARCHAR(300) NOT NULL
)ENGINE=InnoDB;
CREATE TABLE typeContact(
id_type_contact INT NOT NULL PRIMARY KEY,
tx_name VARCHAR(50) NOT NULL,
tx_description VARCHAR(300)
)ENGINE=InnoDB;
CREATE TABLE keyType(
id_key_type INT NOT NULL PRIMARY KEY,
tx_type VARCHAR(50) NOT NULL,
tx_description VARCHAR(300)
)ENGINE=InnoDB;
CREATE TABLE person(
tx_curp VARCHAR(18) NOT NULL PRIMARY KEY,
tx_name VARCHAR(50) NOT NULL,
tx_lastname_a VARCHAR(50) NOT NULL,
tx_lastname_b VARCHAR(50) NOT NULL,
dt_birthday DATE,
id_role INT NOT NULL,
FOREIGN KEY(id_role) REFERENCES roles(id_role)
)ENGINE=InnoDB;
CREATE TABLE users(
tx_nickname VARCHAR(50) NOT NULL PRIMARY KEY,
tx_hash_password VARCHAR(256) NOT NULL,
bl_state BOOLEAN NOT NULL,
tx_curp VARCHAR(18),
FOREIGN KEY(tx_curp) REFERENCES person(tx_curp)
)ENGINE=InnoDB;
CREATE TABLE actions(
tst_action TIMESTAMP(6) NOT NULL,
id_user VARCHAR(50) NOT NULL,
id_type INT NOT NULL,
PRIMARY KEY(tst_action,id_user,id_type),
FOREIGN KEY(id_user) REFERENCES users(tx_nickname)
)ENGINE=InnoDB;
CREATE TABLE contact(
id_contact VARCHAR(100) NOT NULL PRIMARY KEY,
tx_curp VARCHAR(18) NOT NULL,
id_type INT NOT NULL,
FOREIGN KEY(tx_curp) REFERENCES person(tx_curp),
FOREIGN KEY(id_type) REFERENCES typeContact(id_type_contact)
)ENGINE=InnoDB;
CREATE TABLE access(
id_access INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
dt_attempt DATE NOT NULL,
dt_reset DATE,
nb_attempt INT NOT NULL,
id_user VARCHAR(50) NOT NULL,
FOREIGN KEY(id_user) REFERENCES users(tx_nickname)
)ENGINE=InnoDB;
-------------------------------------
CREATE TABLE files(
id_file VARCHAR(256) NOT NULL PRIMARY KEY,
tx_ciphered_name VARCHAR(100) NOT NULL,
tx_deciphered_name VARCHAR(100) NOT NULL,
tx_mac VARCHAR(256),
nb_size INT,
dt_update DATE
)ENGINE=InnoDB;
CREATE TABLE users_files(
id_user VARCHAR(50) NOT NULL,
id_file  VARCHAR(256) NOT NULL,
PRIMARY KEY(id_user,id_file),
FOREIGN KEY(id_user) REFERENCES users(tx_nickname),
FOREIGN KEY(id_file) REFERENCES files(id_file)
)ENGINE=InnoDB;
CREATE TABLE keysC(
id_file  VARCHAR(256) NOT NULL,
id_type INT NOT NULL,
tx_key_name VARCHAR(100),
tx_hash VARCHAR(256),
PRIMARY KEY (id_file,id_type),
FOREIGN KEY(id_file) REFERENCES files(id_file),
FOREIGN KEY(id_type) REFERENCES keyType(id_key_type)
)ENGINE=InnoDB;
CREATE TABLE keyRequest(
id_file  VARCHAR(256) NOT NULL,
id_keyType INT NOT NULL,
id_user VARCHAR(50) NOT NULL,
nb_state INT NOT NULL,
nb_code INT,
tst_code TIMESTAMP,
PRIMARY KEY(id_file,id_keyType,id_user),
FOREIGN KEY(id_user) REFERENCES users(tx_nickname),
FOREIGN KEY(id_keyType) REFERENCES keysC(id_type),
FOREIGN KEY(id_file) REFERENCES keysC(id_file)
)ENGINE=InnoDB;