import { DTOContact } from "../src/app/classes/dataAccess/dto/DTOContact";
import { DTODetailedContact } from "../src/app/classes/dataAccess/dto/DTODetailedContact";
import { MDBDAOContact } from "../src/app/classes/dataAccess/dao/MDBDAOContact";
import { IDAOContact } from "../src/app/classes/dataAccess/dao/IDAOContact";
import { ContactConstants } from "../src/app/classes/utils/ContactConstants";


async function main()
{
    console.log("Pruebas de DAO para User:");

        var dtoContact:DTOContact=new DTOContact();
        var daoContact:IDAOContact=new MDBDAOContact();
       /*Agregar un contacto con DAO*/
        /*
       dtoContact.setContact("vicleo.morales@hotmail.com");
       dtoContact.setContatType(ContactConstants.CONTACT_EMAIL);
       await daoContact.createContact("vicleo14",dtoContact);
       */ 
        
        /*Buscar usuario con DAO*/
        /*
        var contacts:DTOContact[]=await daoContact.findContacts("vicleo14");
        var contactsD:DTODetailedContact[]=await daoContact.findDetailedContacts("vicleo14");
        var emails:DTOContact[]=await daoContact.findEmails("vicleo14");
        console.log(contacts);
        console.log(contactsD);
        console.log(emails);
        */
        
        /*Delete user*/
        /*await daoContact.deleteContact("vicleo.morales@hotmail.com");*/
}

main()