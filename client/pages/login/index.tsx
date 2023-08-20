import { AuthContext } from "@/helpers/AuthContext";
import React, { useContext, useState } from 'react';

const login:React.FC = () => {
    const { login } = useContext(AuthContext)
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
  
    // const handleLogin = async (event: React.FormEvent) => {
    //   event.preventDefault();
  
    //   try {
    //     const response = await axios.post('http://localhost:4000/user/login', {
    //       Email: Email,
    //       Password: Password,
    //     });
  
    //     const { Token } = response.data;
  
    //     Cookies.set('token', Token);
  
    //     window.location.href = '/admin';
    //   } catch (error) {
    //     console.error('Error logging in:', error);
    //   }
    // };

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        login(Email, Password);
    }
    
    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-scheduleBackground bg-cover bg-center">
        <div className="bg-primary rounded-lg shadow-lg p-8 mx-4 md:w-1/3">
        <h2 className="text-2xl text-white font-bold mb-6">Welcome Back!</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
            <input
            type="text"
            className="border border-gray-300 rounded-md py-2 px-4 w-full"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            />
            <input
            type="password"
            className="border border-gray-300 rounded-md py-2 px-4 w-full"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            />
            <button
            type="submit"
            className="bg-pyellow hover:bg-pgrey hover:text-pyellow text-primary py-2 px-4 rounded-md w-full"
            
            >
            Login
            </button>
        </form>
        </div>
    </div>
    );
};

 
export default login;