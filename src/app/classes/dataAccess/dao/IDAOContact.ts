import { DTOContact } from "../dto/DTOContact";
import { DTODetailedContact } from "../dto/DTODetailedContact";
export interface IDAOContact
{
    createContact(nickname: string, contact:DTOContact):any;
    findContacts(nickname: string):any;
    findEmails(nickname: string):any;
    findDetailedContacts(nickname: string):any;
    deleteContact(contact: string):any;
}