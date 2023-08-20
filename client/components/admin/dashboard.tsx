import { useState } from "react";
import Sidebar from "./sidebar";
import Careers from "./careers";
import Contact from "./contact";
import Team from "./team";
import Users from "./users";
import Programs from "./programs";
import Schedule from "./schedule";
import Testimonials from "./testimonials";
import Bot from "./bot";
import Faq from "./faq";
import Terms from "./terms";
import Privacy from "./privacy";

const Dashboard: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState('');

  const handleSelectButton = (buttonName: string): void => {
    setSelectedButton(buttonName);
  }
    return (
      <div className="flex">
      <Sidebar onSelectButton={handleSelectButton} />
      <div className="ml-1/4 w-full">
        {selectedButton === '' && <img className="w-80 ml-60" src="http://localhost:3000/logo.png"/>}
        {selectedButton === 'Careers' && <Careers />}
        {selectedButton === 'Team' && <Team />}
        {selectedButton === 'Contact' && <Contact />}
        {selectedButton === 'Users' && <Users />}
        {selectedButton === 'Programs' && <Programs />}
        {selectedButton === 'Schedule' && <Schedule />}
        {selectedButton === 'Testimonials' && <Testimonials />}
        {selectedButton === 'Chatbot' && <Bot />}
        {selectedButton === 'Terms' && <Terms />}
        {selectedButton === 'Privacy' && <Privacy />}
        {selectedButton === 'Faq' && <Faq />}
      </div>
    </div>
    );
  };
  
  export default Dashboard;