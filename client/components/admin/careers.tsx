import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Add, CloseOutlined, Delete, Edit, Remove } from '@mui/icons-material';
import Loading from '../Loading';

const Careers: React.FC = () => {
  const [isLoading, setIsLoading]= useState<Boolean>(true);
  const [careers, setCareers] = useState<String []>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [Title, setTitle] = useState('');
  const [CareerID, setCareerID] = useState('');
  const [Certificates, setCertificates] = useState<string[]>([]);
  const [certificateInput, setCertificateInput] = useState('');
  const [Experience, setExperience] = useState('');
  const [Description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
        Title: Title,
        Experience: Experience,
        Certificates: Certificates,
        Description: Description
    };

    try {
        if(isEdit) {
            await axios.put(`http://localhost:4000/careers/${CareerID}`, formData);
            const updatedCareers = careers.map((career: any) => {
              if (career._id === CareerID) {
                return {...career, ...formData,};
              }
              return career;
            });
            setCareers(updatedCareers);
        }else {
            const response = await axios.post('http://localhost:4000/careers', formData);
            console.log('Post successful:', response.data);
            setCareers([...careers, response.data]);
      
            setTitle('');
            setCertificates([]);
            setCertificateInput('');
            setDescription('');
            setExperience('');
          } 
        }catch (error) {
            console.error('Error posting data:', error);
        }
        ModalHandler();
  };

  const handleAddCertificate = () => {
    if (certificateInput.trim() !== '') {
      setCertificates([...Certificates, certificateInput]);
      setCertificateInput('');
    }
  };

  const handleRemoveCertificate = (index: number) => {
    const updatedCertificates = [...Certificates];
    updatedCertificates.splice(index, 1);
    setCertificates(updatedCertificates);
  };

  const ModalHandler = () => {
    setIsEdit(false);
    setIsOpen(!isOpen);
    setTitle('');
    setExperience('');
    setCertificates([]);
    setDescription('');
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/careers');
      setCareers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching careers:', error);
      setIsLoading(false);
    }
  };

  const EditHandler = (career: any) => {
    setIsEdit(true);
    setIsOpen(true);
    setCareerID(career._id);
    setTitle(career.Title);
    setCertificates(career.Certificates);
    setExperience(career.Experience);
    setDescription(career.Description);
  };
  
  const deleteCareer = async (id: String) => {
    try {
        await axios.delete(`http://localhost:4000/careers/${id}`)
        .then(() => {
            setCareers(careers.filter((val:any) => {
                return val._id != id;
            })
        )})
    }
    catch (error) {
        console.error('Error deleting career:', error);
    }
  }

  return (
    <div className="relative p-4 border-l border-pgrey w-full overflow-y-auto h-[26rem] max-h-[26rem]">
      <h2 className="text-2xl text-white font-bold mb-8">Careers</h2>
      {isLoading? (<Loading />) : (
      <div>
      <div className='flex justify-end mb-8'>
        <button className='bg-green-500 text-xl w-16 h-8 rounded' onClick={ModalHandler}>New</button>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {careers.map((career: any) => (
          <div key={career._id} className="bg-white p-4 rounded shadow">
            <div className='flex flex-row-reverse'>
                <button className="relative hover:text-red-500" onClick={(e)=>{deleteCareer(career._id)}}>
                <Delete />
                </button>
                <button className='relative hover:text-pyellow' onClick={(e)=>EditHandler(career)}>
                    <Edit />
                </button>
            </div>

            <h3 className="relative text-lg font-bold mb-2">{career.Title}</h3>
            <p className="text-gray-500 mt-2">Experience: {career.Experience}</p>
            <p className="text-gray-500 mt-2">Certificates:</p>
            <ul className="list-disc ml-6">
              {career.Certificates.map((certificate: any, index: any) => (
                <li key={index}>{certificate}</li>
              ))}
            </ul>
            <p>Description: {career.Description}</p>
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
                <h2 className="text-xl text-white font-bold mb-4">{isEdit ? 'Edit Career' : 'New Career'}</h2>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <input className='text-pgrey mb-4' id='Title' value={Title} type='text' placeholder='Title' onChange={(e)=>setTitle(e.target.value)}></input>
                    <input className='text-pgrey mb-4' type='text' id='Experience' value={Experience} placeholder='Experience' onChange={(e)=>setExperience(e.target.value)}></input>
                    <div>
                        {Certificates?.map((certificate, index) => (
                        <div className='flex justify-between mb-2' key={index}>
                            <input type="text" value={certificate} readOnly />
                            <button className='bg-pyellow' type="button" onClick={() => handleRemoveCertificate(index)}>
                                <Remove />
                            </button>
                        </div>
                        ))}
                    </div>
                    <div className='flex justify-between mb-4'>
                        <input
                        type="text"
                        value={certificateInput}
                        placeholder='Certificate'
                        onChange={(e) => setCertificateInput(e.target.value)}
                        />
                        <button className='bg-pyellow' type="button" onClick={handleAddCertificate}>
                            <Add />
                        </button>
                    </div>
                    <textarea className='mb-4' id='Description' value={Description} placeholder='Description' onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                    <button className='bg-pyellow' type='submit'>{isEdit ? "Update" : "Submit"}</button>
                </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;