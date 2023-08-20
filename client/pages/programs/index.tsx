import Loading from '@/components/Loading';
import { LanguageDirectionContext } from '@/helpers/langDirection';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

interface Program {
  Image: string;
  Title: string;
  ArabicTitle: string;
  Description: string;
  ArabicDescription: string;
}

const programs: React.FC = () => {
  const { isRTL } = useContext(LanguageDirectionContext);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [Programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get('http://localhost:4000/programs');
      const responseData: Program[] = response.data;

      setPrograms(responseData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching Programs:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full min-h-screen mx-auto py-8 bg-primary ${isRTL? "arabic" : "english"}`}>
      {isLoading ? (<Loading />) : (

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-white text-center mb-8"><FormattedMessage id='footer.programs' /></h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Programs.map((program, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg">
              <img className="w-full h-60 object-cover mb-4 rounded-t" src={`http://localhost:4000/`+ program.Image} alt={program.Title} />
              <div className='px-6 mb-4'>
              <h2 className={`${isRTL? "flex justify-end": "flex"} text-xl font-semibold mb-4`}>{`${isRTL? program.ArabicTitle : program.Title}`}</h2>
              <p className={`${isRTL? "flex justify-end": "flex"}`}>{`${isRTL? program.ArabicDescription : program.Description}`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}
    </div>
  );
};

export default programs;
