import React, {PropsWithChildren} from "react"
import Navbar from "./navbar";
import Chatbot from "./chatbot";
import Footer from "./footer";
import { LanguageDirectionProvider } from "@/helpers/langDirection";
import { useRouter } from "next/router";
import AuthContextProvider from "@/helpers/AuthContext";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: PropsWithChildren<LayoutProps>) => {
    const router = useRouter();
    const {asPath} = router;
    const noNav = ['/login', '/admin'];
    return (  
        <LanguageDirectionProvider>
            {noNav.includes(asPath)? null : <Navbar />}
            <AuthContextProvider>
                {children}
            </AuthContextProvider>
            {noNav.includes(asPath)? null : <Chatbot />}
            {noNav.includes(asPath)? null : <Footer />}
        </LanguageDirectionProvider>
    );
}
 
export default Layout;