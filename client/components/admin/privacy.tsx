import { CloseOutlined, Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import Loading from "../Loading";

const Privacy = () => {
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [TermID, seTermID] = useState(""); 
    const [Title, setTitle] = useState("");
    const [ArabicTitle, setArabicTitle] = useState("");
    const [Content, setContent] = useState("");
    const [ArabicContent, setArabicContent] = useState("");
    const [Terms, setTerms]: any = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
      };
    const ModalHandler = () => {
      setIsOpen(!isOpen);
      setIsEdit(false);
      setTitle('');
      setArabicTitle('');
      setArabicContent('');
      setContent('')
      seTermID("");
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const formData = { 
        Title: Title,
        Content: Content,
        ArabicTitle: ArabicTitle,
        ArabicContent: ArabicContent
        }
        if(isEdit) {
            await axios.put(`http://localhost:4000/terms/${TermID}`, formData);
            const updatedTerm = Terms.map((term: any) => {
                if (term._id === TermID) {
                    return {...term, ...formData};
                }
                return term;
                });
                setTerms(updatedTerm);
                ModalHandler();
        } else {
            try {
                const response = await axios.post('http://localhost:4000/terms', formData);
                setTerms([...Terms, response.data]);
                ModalHandler();
                console.log('uploaded successfully:', response.data);
            } catch (error) {
                console.error('Error uploading:', error);
            }
        }
    };
        
      useEffect(() => {
        fetchTerms();
      }, []);
    
      const fetchTerms = async () => {
        try {
          const response = await axios.get('http://localhost:4000/terms');
          setTerms(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching terms:', error);
          setIsLoading(false);
        }
      };
      
      const EditHandler = (faq: any) => {
        setIsEdit(true);
        setIsOpen(true);
        seTermID(faq._id);
        setTitle(faq.Question);
        setArabicTitle(faq.ArabicQuestion);
        setArabicContent(faq.ArabicAnswer);
        setContent(faq.Answer);
      };

      const deleteTerm = async (id: String) => {
        try {
            await axios.delete(`http://localhost:4000/terms/${id}`)
            .then(() => {
                setTerms(Terms.filter((val:any) => {
                    return val._id != id;
                })
            )})
        }
        catch (error) {
            console.error('Error deleting terms:', error);
        }
      }

    return (  
        <div className="relative p-4 border-l border-pgrey h-[26rem] overflow-y-auto">
      <h2 className="text-2xl text-white font-bold mb-8">Terms</h2>
      {isLoading ? (<Loading />) : (
      <div>
         <div className='flex justify-end mb-8'>
        <button className='bg-green-500 text-xl w-16 h-8 rounded' onClick={ModalHandler}>New</button>
      </div>
      <div className="container mx-auto">
        {Terms.map((term:any, index:number) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-4">
            <div className='flex flex-row-reverse'>
                <button className="relative hover:text-red-500" onClick={(e)=>{deleteTerm(term._id)}}>
                <Delete />
                </button>
                <button className='relative hover:text-pyellow' onClick={(e)=>EditHandler(term)}>
                    <Edit />
                </button>
            </div>
            <button
              className="w-full flex justify-between items-center focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              <h2 className="text-xl font-semibold text-gray-800">{term.Title}</h2>
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
              <p className="text-gray-600 mt-2">{term.Content}</p>
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
                <h2 className="text-xl text-white font-bold mb-4">{isEdit ? 'Edit Terms' : 'New Terms'}</h2>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <input className='text-pgrey mb-4' id='Name' value={Title} type='text' placeholder='Title' onChange={(e)=>setTitle(e.target.value)}></input>
                        <textarea className='mb-4' id='Content' value={Content} placeholder='Content' onChange={(e)=>{setContent(e.target.value)}}></textarea>
                    </div>
                    <div className="flex flex-col">
                        <input className='text-pgrey mb-4' id='Name' value={ArabicTitle} type='text' placeholder='Arabic Title' onChange={(e)=>setArabicTitle(e.target.value)}></input>
                        <textarea className='mb-4' id='Content' value={ArabicContent} placeholder='Arabic Content' onChange={(e)=>{setArabicContent(e.target.value)}}></textarea>
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
 
export default Privacy;