import { CloseOutlined, Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import Loading from "../Loading";

const Faq = () => {
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [FaqID, setFaqID] = useState(""); 
    const [Question, setQuestion] = useState("");
    const [ArabicQuestion, setArabicQuestion] = useState("");
    const [Answer, setAnswer] = useState("");
    const [ArabicAnswer, setArabicAnswer] = useState("");
    const [Faqs, setFaqs]: any = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
      };
    const ModalHandler = () => {
      setIsOpen(!isOpen);
      setIsEdit(false);
      setQuestion('');
      setArabicQuestion('');
      setArabicAnswer('');
      setAnswer('')
      setFaqID("");
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const formData = { 
        Question: Question,
        Answer: Answer,
        ArabicQuestion: ArabicQuestion,
        ArabicAnswer: ArabicAnswer
        }
        if(isEdit) {
            await axios.put(`http://localhost:4000/faq/${FaqID}`, formData);
            const updatedTestimonial = Faqs.map((testimonial: any) => {
                if (testimonial._id === FaqID) {
                    return {...testimonial, ...formData};
                }
                return testimonial;
                });
                setFaqs(updatedTestimonial);
                ModalHandler();
        } else {
            try {
                const response = await axios.post('http://localhost:4000/faq', formData);
                setFaqs([...Faqs, response.data]);
                ModalHandler();
                console.log('uploaded successfully:', response.data);
            } catch (error) {
                console.error('Error uploading:', error);
            }
        }
    };
        
      useEffect(() => {
        fetchFAQs();
      }, []);
    
      const fetchFAQs = async () => {
        try {
          const response = await axios.get('http://localhost:4000/faq');
          setFaqs(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching testimonials:', error);
          setIsLoading(false);
        }
      };
      
      const EditHandler = (faq: any) => {
        setIsEdit(true);
        setIsOpen(true);
        setFaqID(faq._id);
        setQuestion(faq.Question);
        setArabicQuestion(faq.ArabicQuestion);
        setArabicAnswer(faq.ArabicAnswer);
        setAnswer(faq.Answer);
      };

      const deleteFAQ = async (id: String) => {
        try {
            await axios.delete(`http://localhost:4000/faq/${id}`)
            .then(() => {
                setFaqs(Faqs.filter((val:any) => {
                    return val._id != id;
                })
            )})
        }
        catch (error) {
            console.error('Error deleting programs:', error);
        }
      }

    return (  
        <div className="relative p-4 border-l border-pgrey h-[26rem] overflow-y-auto">
      <h2 className="text-2xl text-white font-bold mb-8">Faq</h2>
      {isLoading ? (<Loading />) : (
      <div>
         <div className='flex justify-end mb-8'>
        <button className='bg-green-500 text-xl w-16 h-8 rounded' onClick={ModalHandler}>New</button>
      </div>
      <div className="container mx-auto">
        {Faqs.map((faq:any, index:number) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-4">
            <div className='flex flex-row-reverse'>
                <button className="relative hover:text-red-500" onClick={(e)=>{deleteFAQ(faq._id)}}>
                <Delete />
                </button>
                <button className='relative hover:text-pyellow' onClick={(e)=>EditHandler(faq)}>
                    <Edit />
                </button>
            </div>
            <button
              className="w-full flex justify-between items-center focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              <h2 className="text-xl font-semibold text-gray-800">{faq.Question}</h2>
              <svg
                className={`w-6 h-6 transition-transform ${
                  expandedIndex === index ? 'transform rotate-180' : ''
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {expandedIndex === index && (
              <p className="text-gray-600 mt-2">{faq.Answer}</p>
            )}
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
                <h2 className="text-xl text-white font-bold mb-4">{isEdit ? 'Edit FAQ' : 'New FAQ'}</h2>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <input className='text-pgrey mb-4' id='Name' value={Question} type='text' placeholder='Question' onChange={(e)=>setQuestion(e.target.value)}></input>
                        <textarea className='mb-4' id='Content' value={Answer} placeholder='Answer' onChange={(e)=>{setAnswer(e.target.value)}}></textarea>
                    </div>
                    <div className="flex flex-col">
                        <input className='text-pgrey mb-4' id='Name' value={ArabicQuestion} type='text' placeholder='Arabic Question' onChange={(e)=>setArabicQuestion(e.target.value)}></input>
                        <textarea className='mb-4' id='Content' value={ArabicAnswer} placeholder='Arabic Answer' onChange={(e)=>{setArabicAnswer(e.target.value)}}></textarea>
                    </div>
                    <button className='bg-pyellow' type='submit'>{isEdit ? "Update" : "Submit"}</button>
                </form>
            </div>
          </div>
        </div>
      )}
    </div>
    );
}
 
export default Faq;