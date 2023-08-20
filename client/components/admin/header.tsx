import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { AuthContext } from "@/helpers/AuthContext";
import React, { useContext } from "react";

export const Header: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  }

    return (
      <header className="bg-pgrey text-white p-4">
        <h1 className="text-2xl font-bold">Welcome Back, {Cookies.get('Name')}</h1>
        <div className="flex justify-end">
          <button onClick={handleLogout} className="text-gray-400 hover:text-white">Logout</button>
        </div>
      </header>
    );
  };
  
  export default Header;