import { IDAOContact } from "./IDAOContact";
import { DTOContact } from "../dto/DTOContact";
import { DTODetailedContact } from "../dto/DTODetailedContact";
import * as pool from "../connector/Connection"
import { ContactConstants } from "../../utils/ContactConstants";
export class MDBDAOContact implements IDAOContact
{
    async createContact(nickname: string, contact:DTOContact)
    {
        const query = await pool.query(
            'CALL addContact(?,?,?)',
             [nickname,
                contact.getContact(),
                contact.getType()
             ]);
    }
    async findContacts(nickname: string)
    {
        let contacts:DTOContact[]=new Array();
        const query = await pool.query(
            'CALL findUserContacts(?)',[nickname]);
        for(var i=0;i<query[0].length;i++)
        {
            var aux:DTOContact=new DTOContact();
            aux.setContact(query[0][i].id_contact);
            aux.setContatType(query[0][i].id_type);  
            contacts.push(aux); 
        }
        return contacts;
    }
    async findDetailedContacts(nickname: string)
    {
        let detailedContacts:DTODetailedContact[]=new Array();
        const query = await pool.query(
            'CALL findUserDetailedContacts(?)',[nickname]);
        for(var i=0;i<query[0].length;i++)
        {
            var aux:DTODetailedContact=new DTODetailedContact();
            aux.setContact(query[0][i].id_contact);
            aux.setType(query[0][i].tx_name);
            aux.setDescription(query[0][i].tx_description);
            detailedContacts.push(aux); 
        }
        return detailedContacts;
    }
    async findEmails(nickname: string)
    {
        let contacts:DTOContact[]=new Array();
        const query = await pool.query(
            'CALL findUserContactsByType(?,?)',[nickname,ContactConstants.CONTACT_EMAIL]);
        for(var i=0;i<query[0].length;i++)
        {
            var aux:DTOContact=new DTOContact();
            aux.setContact(query[0][i].id_contact);
            aux.setContatType(query[0][i].id_type);  
            contacts.push(aux); 
        }
        return contacts;
    }
    async deleteContact(contact: string)
    {
        const query = await pool.query(
            'CALL deleteContact(?)',[contact]);
        
    }
}