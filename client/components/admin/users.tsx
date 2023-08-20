import { CloseOutlined, Delete, Edit, Remove } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading";

const Users = () => {
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [users, setUsers]: any = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [UserID, setUserID] = useState('');
    const [Password, setPassword] = useState('');
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      const formData = {
          Name: Name,
          Email: Email,
          Password: Password,
      };
  
      try {
          if(isEdit) {
              await axios.put(`http://localhost:4000/user/${UserID}`, formData);
              const updatedCareers = users.map((career: any) => {
                if (career._id === UserID) {
                  return {...career, ...formData,};
                }
                return career;
              });
              setUsers(updatedCareers);
          }else {
              const response = await axios.post('http://localhost:4000/user', formData);
              console.log('Post successful:', response.data);
              setUsers([...users, response.data]);
        
              setPassword('');
              setEmail('');
              setName('');
            } 
          }catch (error) {
              console.error('Error posting data:', error);
          }
          ModalHandler();
    };
  
    const ModalHandler = () => {
      setIsEdit(false);
      setIsOpen(!isOpen);
      setPassword('');
      setName('');
      setEmail('');
    };
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/user');
        setUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching careers:', error);
        setIsLoading(false);
      }
    };
  
    const EditHandler = (career: any) => {
      setIsEdit(true);
      setIsOpen(true);
      setUserID(career._id);
      setPassword(career.Title);
      setName(career.Experience);
      setEmail(career.Description);
    };
    
    const deleteCareer = async (id: String) => {
      try {
          await axios.delete(`http://localhost:4000/user/${id}`)
          .then(() => {
              setUsers(users.filter((val:any) => {
                  return val._id != id;
              })
          )})
      }
      catch (error) {
          console.error('Error deleting User:', error);
      }
    }
  
    return (
      <div className="relative p-4 border-l border-pgrey w-full overflow-y-auto h-[26rem] max-h-[26rem]">
        <h2 className="text-2xl text-white font-bold mb-8">Users</h2>
        {isLoading? (<Loading />) : (
        <div>
        <div className='flex justify-end mb-8'>
          <button className='bg-green-500 text-xl w-16 h-8 rounded' onClick={ModalHandler}>New</button>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {users.map((user: any) => (
          <div key={user._id} className="bg-white p-4 rounded shadow">
            <div className='flex flex-row-reverse'>
              <button className="relative hover:text-red-500" onClick={(e)=>{deleteCareer(user._id)}}>
                <Delete />
              </button>
              <button className='relative hover:text-pyellow' onClick={(e)=>EditHandler(user)}>
                <Edit />
              </button>
            </div>

            <h3 className="relative text-lg font-bold mb-2">{user.Name}</h3>
            <p className="text-gray-500 mt-2 overflow-x-auto">Email: {user.Email}</p>
            <p className="relative text-gray-500 mt-2 overflow-hidden whitespace-nowrap overflow-ellipsis w-50">
              Password: {user.Password}
            </p>
          </div>
        ))}
          </div>
        </div>
        )}
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-primary w-1/3 rounded-lg p-6 shadow-md shadow-pyellow">
              <div className='w-full flex flex-row-reverse right-0'>
                  <button className="hover:text-red-500 text-pgrey font-bold py-2 px-4 rounded mb-4" onClick={ModalHandler}>
                      <CloseOutlined />
                  </button>
              </div>
              <div>
                  <h2 className="text-xl text-white font-bold mb-4">{isEdit ? 'Edit User' : 'New User'}</h2>
                  <form className='flex flex-col' onSubmit={handleSubmit}>
                      <input className='text-pgrey mb-4' type='text' id='Experience' value={Name} placeholder='Name' onChange={(e)=>setName(e.target.value)}></input>
                      <input className='mb-4' id='Description' value={Email} placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}></input>
                      <input className='text-pgrey mb-4' id='Title' value={Password} type='text' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}></input>
                      <button className='bg-pyellow' type='submit'>{isEdit ? "Update" : "Submit"}</button>
                  </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}
 
export default Users;