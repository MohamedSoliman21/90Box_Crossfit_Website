import { LanguageDirectionContext } from '@/helpers/langDirection';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

interface Career {
  Title: String,
  ArabicTitle: String,
  Description: String,
  ArabicDescription: String,
  Experience: String,
  Certificates: Array<String>
  ArabicCertificates: Array<String>
}

const careers = () => {
  const { isRTL } = useContext(LanguageDirectionContext);

  const [Careers, setCareers] = useState<Career[]>([]);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/careers');
      setCareers(response.data);
    } catch (error) {
      console.error('Error fetching Careers:', error);
    }
  };

  return (
    <div className={`w-full mx-auto py-8 bg-primary min-h-screen ${isRTL? "arabic" : "english"}`}>
      <h1 className="text-3xl text-white font-bold text-center mb-8">Careers</h1>
      <p className="text-gray-600 text-center">
        We have exciting career opportunities available. Join our team and make a difference!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {Careers.map((career, index) => (
          <div className='bg-white shadow-md rounded p-6'>
              <h2 className="text-xl font-bold mb-4">{`${isRTL? career.ArabicTitle : career.Title}`}</h2>
              <div className='flex mb-1'>
                <p className='text-pgrey font-bold mr-1'>Expreience: </p>
                <p className='text-pgrey'>{career.Experience}</p>
              </div>
              <div>
                <ul className="list-disc mb-1 ml-6">
                {isRTL? (
                  <div>
                    {career.ArabicCertificates.map((certificate: any, index: any) => (
                      <li key={index}>{certificate}</li>
                    ))}
                  </div>

                ) : (
                  <div>
                    {career.Certificates.map((certificate: any, index: any) => (
                      <li key={index}>{certificate}</li>
                    ))}
                  </div>
                )}
                
                </ul>  
              </div>
              <div className='flex'>
                <p className='text-pgrey font-bold mr-1'>Description: </p>
                <p className="text-gray-600">{`${isRTL? career.ArabicDescription : career.Description}`}</p>
              </div>
              <a href="#" className="text-blue-500 hover:text-blue-700">Apply Now</a>
          </div>
        ))}
        </div>
    </div>
  );
};

export default careers;
