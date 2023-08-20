import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Add, CloseOutlined, Delete, Edit, Remove } from '@mui/icons-material';
import Loading from '../Loading';

const Bot: React.FC = () => {
  const [isLoading, setIsLoading]= useState<Boolean>(true);
  const [messages, setMessages] = useState<String []>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [Question, setQuestion] = useState('');
  const [Answer, setAnswer] = useState('');
  const [MessageID, setMessageID] = useState('');
  const [ArabicQuestion, setArabicQuestion] = useState('');
  const [ArabicAnswer, setArabicAnswer] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
        Question: Question,
        ArabicQuestion: ArabicQuestion,
        Answer: Answer,
        ArabicAnswer: ArabicAnswer
    };

    try {
        if(isEdit) {
            await axios.put(`http://localhost:4000/bot/${MessageID}`, formData);
            const updatedMessages = messages.map((message: any) => {
              if (message._id === MessageID) {
                return {...message, ...formData,};
              }
              return message;
            });
            setMessages(updatedMessages);
        }else {
            const response = await axios.post('http://localhost:4000/bot', formData);
            console.log('Post successful:', response.data);
            setMessages([...messages, response.data]);
      
            setQuestion('');
            setAnswer('');
            setArabicAnswer('');
            setArabicQuestion('');
          } 
        }catch (error) {
            console.error('Error posting data:', error);
        }
        ModalHandler();
  };

  const ModalHandler = () => {
    setIsEdit(false);
    setIsOpen(!isOpen);
    setQuestion('');
    setArabicQuestion('');
    setAnswer('');
    setArabicAnswer('');
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:4000/bot');
      setMessages(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching Messages:', error);
      setIsLoading(false);
    }
  };

  const EditHandler = (message: any) => {
    setIsEdit(true);
    setIsOpen(true);
    setMessageID(message._id);
    setQuestion(message.Title);
    setAnswer(message.Answer);
    setArabicQuestion(message.Experience);
    setArabicAnswer(message.Description);
  };
  
  const deleteMessage = async (id: String) => {
    try {
        await axios.delete(`http://localhost:4000/bot/${id}`)
        .then(() => {
            setMessages(messages.filter((val:any) => {
                return val._id != id;
            })
        )})
    }
    catch (error) {
        console.error('Error deleting message:', error);
    }
  }

  return (
    <div className="relative p-4 border-l border-pgrey w-full overflow-y-auto h-[26rem] max-h-[26rem]">
      <h2 className="text-2xl text-white font-bold mb-8">Chatbot</h2>
      {isLoading? (<Loading />) : (
      <div>
      <div className='flex justify-end mb-8'>
        <button className='bg-green-500 text-xl w-16 h-8 rounded' onClick={ModalHandler}>New</button>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {messages.map((message: any) => (
          <div key={message._id} className="bg-white p-4 rounded shadow">
            <div className='flex flex-row-reverse'>
                <button className="relative hover:text-red-500" onClick={(e)=>{deleteMessage(message._id)}}>
                <Delete />
                </button>
                <button className='relative hover:text-pyellow' onClick={(e)=>EditHandler(message)}>
                    <Edit />
                </button>
            </div>

            <p className="text-gray-500 mt-2">Question: {message.Question}</p>
            <p className="text-gray-500 mt-2">Answer: {message.Answer}</p>
            <p className="text-gray-500 mt-2">Arabic Question: {message.ArabicQuestion}</p>
            <p className="text-gray-500 mt-2">Arabic Answer: {message.ArabicAnswer}</p>
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
                <h2 className="text-xl text-white font-bold mb-4">{isEdit ? 'Edit Message' : 'New Message'}</h2>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <input className='text-pgrey mb-4' id='Title' value={Question} type='text' placeholder='Question' onChange={(e)=>setQuestion(e.target.value)}></input>
                    <input className='mb-4' id='Description' value={Answer} placeholder='Answer' onChange={(e)=>{setAnswer(e.target.value)}}></input>

                    <input className='text-pgrey mb-4' type='text' id='Experience' value={ArabicQuestion} placeholder='Arabic Question' onChange={(e)=>setArabicQuestion(e.target.value)}></input>
                    <input className='mb-4' id='Description' value={ArabicAnswer} placeholder='Arabic Answer' onChange={(e)=>{setArabicAnswer(e.target.value)}}></input>
                    <button className='bg-pyellow' type='submit'>{isEdit ? "Update" : "Submit"}</button>
                </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bot;