import { useState } from "react";

interface SidebarProps {
  onSelectButton: (buttonName: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({onSelectButton}:any)  => {
  const [selectedButton, setSelectedButton] = useState('');

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
    onSelectButton(buttonName);
  };

    return (
      <div className="relative bg-primary text-white h-[26rem] lg:w-1/4 md:w-fit sm:w-fit overflow-x-auto">
        <ul className="py-4 h-full ">
          <li className="py-2 hover:bg-pgrey">
            <button 
              className={`w-full ${selectedButton === 'Users' ? 'font-bold bg-pgrey text-pyellow' : ''}`}
              onClick={(e)=>handleButtonClick('Users')}>
                Users
            </button>
          </li>
          <li className="py-2 hover:bg-pgrey">
            <button 
              className={`w-full ${selectedButton === 'Team' ? 'font-bold bg-pgrey text-pyellow' : ''}`}
              onClick={(e)=>handleButtonClick('Team')}>
                Team
            </button>
          </li>
          <li className="py-2 hover:bg-pgrey">
            <button 
              className={`w-full ${selectedButton === 'Contact' ? 'font-bold bg-pgrey text-pyellow' : ''}`}
              onClick={(e)=>handleButtonClick('Contact')}>
                Contact
            </button>
          </li>
          <li className="py-2 hover:bg-pgrey">
            <button 
              className={`w-full ${selectedButton === 'Programs' ? 'font-bold bg-pgrey text-pyellow' : ''}`}
              onClick={(e)=>handleButtonClick('Programs')}>
                Programs
              </button>
          </li>
          <li className="py-2 hover:bg-pgrey">
            <button 
              className={`w-full ${selectedButton === 'Schedule' ? 'font-bold bg-pgrey text-pyellow' : ''}`}
              onClick={(e)=>handleButtonClick('Schedule')}>
                Schedule
            </button>
          </li>
          <li className="py-2 hover:bg-pgrey">
            <button 
              className={`w-full ${selectedButton === 'Careers' ? 'font-bold bg-pgrey text-pyellow' : ''}`}
              onClick={(e)=>handleButtonClick('Careers')}>
                Careers
            </button>
          </li>
          <li className="py-2 hover:bg-pgrey">
            <button 
              className={`w-full ${selectedButton === 'Testimonials' ? 'font-bold bg-pgrey text-pyellow' : ''}`}
              onClick={(e)=>handleButtonClick('Testimonials')}>
                Testimonial
            </button>
          </li>
          <li className="py-2 hover:bg-pgrey">
            <button 
              className={`w-full ${selectedButton === 'Chatbot' ? 'font-bold bg-pgrey text-pyellow' : ''}`}
              onClick={(e)=>handleButtonClick('Chatbot')}>
                Chatbot
            </button>
          </li>
          <li className="py-2 hover:bg-pgrey">
            <button 
              className={`w-full ${selectedButton === 'Terms' ? 'font-bold bg-pgrey text-pyellow' : ''}`}
              onClick={(e)=>handleButtonClick('Terms')}>
                Terms
            </button>
          </li>
          <li className="py-2 hover:bg-pgrey">
            <button 
              className={`w-full ${selectedButton === 'Privacy' ? 'font-bold bg-pgrey text-pyellow' : ''}`}
              onClick={(e)=>handleButtonClick('Privacy')}>
                Privacy
            </button>
          </li>
          <li className="py-2 hover:bg-pgrey">
            <button 
              className={`w-full ${selectedButton === 'Faq' ? 'font-bold bg-pgrey text-pyellow' : ''}`}
              onClick={(e)=>handleButtonClick('Faq')}>
                Faq
            </button>
          </li>
        </ul>
      </div>
    );
  };
  
  export default Sidebar;