import { IDAOContact } from "./IDAOContact";
import { DTOContact } from "../dto/DTOContact";
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
        console.log(query);
    }
    async findContacts(nickname: string)
    {
        const query = await pool.query(
            'CALL findUserContacts(?)',[nickname]);
        console.log(query[0][1]);
    }
    async findDetailedContacts(nickname: string)
    {
        const query = await pool.query(
            'CALL findUserDetailedContacts(?)',[nickname]);
        console.log(query[0][1]);
    }
    async findEmails(nickname: string)
    {
        const query = await pool.query(
            'CALL findUserContactsByType(?,?)',[nickname,ContactConstants.CONTACT_EMAIL]);
        console.log(query[0][0]);
    }
    async deleteContact(contact: string)
    {
        const query = await pool.query(
            'CALL deleteContact(?)',[contact]);
        console.log(query);
    }
}