import { CloseOutlined, Title, Remove, Add, Description, Delete } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading";

const Contact = () => {
    const [contacts, setContacts]: any = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    useEffect(() => {
        fetchContact();
      }, []);
    
      const fetchContact = async () => {
        try {
          const response = await axios.get('http://localhost:4000/contact');
          setContacts(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching careers:', error);
            setIsLoading(false);
        }
      };

      const deleteContact = async (id: String) => {
        try {
            await axios.delete(`http://localhost:4000/contact/${id}`)
            .then(() => {
                setContacts(contacts.filter((val:any) => {
                    return val._id != id;
                })
            )})
        }
        catch (error) {
            console.error('Error deleting career:', error);
        }
      }

    return (  
        <div className="relative p-4 border-l border-pgrey h-[26rem]">
            <h2 className="text-2xl text-white font-bold mb-8">Contacts</h2>
            {isLoading? (<Loading />) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {contacts.map((contact: any) => (
                <div key={contact._id} className="bg-white p-4 rounded shadow">
                    <div className='flex flex-row-reverse'>
                        <button className="relative hover:text-red-500" onClick={(e)=>{deleteContact(contact._id)}}>
                        <Delete />
                        </button>
                    </div>

                    <h3 className="relative text-lg font-bold mb-2">{contact.Name}</h3>
                    <p className="text-gray-500 mt-2">Phone: {contact.Phone}</p>
                    <p>Email: {contact.Email}</p>
                    <p>Message: {contact.Message}</p>
                </div>
                ))}
            </div>
            )}
        </div>
    );
}
 
export default Contact;