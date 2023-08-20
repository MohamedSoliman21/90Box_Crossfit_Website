import { LanguageDirectionContext } from '@/helpers/langDirection';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

interface Team {
  Image: string;
  Title: string;
  ArabicTitle: string;
  Name: string;
  ArabicName: string;
}

const team: React.FC = () => {
  const { isRTL } = useContext(LanguageDirectionContext);

  const [Team, setTeam] = useState<Team[]>([]);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await axios.get('http://localhost:4000/team');
      setTeam(response.data);
    } catch (error) {
      console.error('Error fetching Team:', error);
    }
  };

  return (
    <div className={`w-full min-h-screen mx-auto py-8 bg-primary ${isRTL? "arabic" : "english"}`}>
      <h1 className="text-3xl font-bold text-center mb-8">Our Team</h1>
      <div className="container mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Team.map((member, index) => (
          <div key={index} className=" shadow-lg rounded-lg p-6 flex flex-col items-center">
            <img src={`http://localhost:4000/`+ member.Image} alt={isRTL? member.ArabicName : member.Name} className="w-40 h-40 rounded-full mb-4" />
            <h2 className={`${isRTL? "flex justify-end": "flex"} text-xl font-semibold text-gray-800 mb-2`}>{isRTL? member.ArabicName : member.Name}</h2>
            <p className={`text-pgrey ${isRTL? "flex justify-end": "flex"}`}>{isRTL? member.ArabicTitle : member.Title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default team;
