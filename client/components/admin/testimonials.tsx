import { CloseOutlined, Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Loading from "../Loading";

const Testimonials:React.FC = () => {
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [TImage, setImage] = useState<File | null>(null);
    const [TestimonialID, setTestimonialID] = useState(""); 
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [testi, setTesti]: any = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0 ) {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(selectedImage);
      }  
    };

    const ModalHandler = () => {
      setPreviewImage(null)
      setIsOpen(!isOpen);
      setIsEdit(false);
      setName('');
      setContent('')
      setTestimonialID("");
      setImage(null);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
    
        if (TImage) {
            const formData = new FormData(); 
            formData.append("Name", name);
            formData.append("Content", content);
            formData.append("Image", TImage);

            if(isEdit) {
                const response = await axios.put(`http://localhost:4000/testimonial/${TestimonialID}`, formData);
                const updatedTestimonial = testi.map((testimonial: any) => {
                    if (testimonial._id === TestimonialID) {
                      return {...testimonial, ...formData};
                    }
                    return testimonial;
                  });
                  setTesti(updatedTestimonial);
                  ModalHandler();
            } else {
                try {
                    const response = await axios.post('http://localhost:4000/testimonial', formData);
                    setTesti([...testi, response.data]);
                    ModalHandler();
                    console.log('Image uploaded successfully:', response.data);
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            }
          };
        }
    
      useEffect(() => {
        fetchTestimonials();
      }, []);
    
      const fetchTestimonials = async () => {
        try {
          const response = await axios.get('http://localhost:4000/testimonial');
          setTesti(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching testimonials:', error);
          setIsLoading(false);
        }
      };
      
      const EditHandler = (testimonial: any) => {
        setIsEdit(true);
        setIsOpen(true);
        setTestimonialID(testimonial._id);
        setName(testimonial.Name);
        setContent(testimonial.Content);
        setImage(testimonial.Image)
      };

      const deleteTestimonial = async (id: String) => {
        try {
            await axios.delete(`http://localhost:4000/testimonial/${id}`)
            .then(() => {
                setTesti(testi.filter((val:any) => {
                    return val._id != id;
                })
            )})
        }
        catch (error) {
            console.error('Error deleting career:', error);
        }
      }

    return (  
        <div className="relative p-4 border-l border-pgrey h-[26rem] overflow-y-auto">
      <h2 className="text-2xl text-white font-bold mb-8">Testimonials</h2>
      {isLoading? (<Loading />) : (
      <div>

      <div className='flex justify-end mb-8'>
        <button className='bg-green-500 text-xl w-16 h-8 rounded' onClick={ModalHandler}>New</button>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {testi.map((testimonial: any) => (
          <div key={testimonial._id} className="bg-white p-4 rounded shadow">
            <div className='flex flex-row-reverse'>
                <button className="relative hover:text-red-500" onClick={(e)=>{deleteTestimonial(testimonial._id)}}>
                <Delete />
                </button>
                <button className='relative hover:text-pyellow' onClick={(e)=>EditHandler(testimonial)}>
                    <Edit />
                </button>
            </div>
            <img src={`http://localhost:4000/${testimonial.Image}`}/>
            <h3 className="relative text-lg font-bold mb-2">{testimonial.Name}</h3>
            <p className="text-gray-500 mt-2">{testimonial.Content}</p>
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
                <h2 className="text-xl text-white font-bold mb-4">{isEdit ? 'Edit Testimonial' : 'New Testimonial'}</h2>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <input className='text-pgrey mb-4' id='Name' value={name} type='text' placeholder='Name' onChange={(e)=>setName(e.target.value)}></input>
                    <textarea className='mb-4' id='Content' value={content} placeholder='Description' onChange={(e)=>{setContent(e.target.value)}}></textarea>
                    <div className="mb-4 ">
                        <input className="w-24 mb-4" type="file" accept="image/*" onChange={handleFileChange} />
                        {isEdit && !previewImage  && <img src={`http://localhost:4000/`+ TImage} alt="Testimonial Image" style={{ maxWidth: '100%', height: 'auto' }} />}
                        {previewImage && <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />}
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
 
export default Testimonials;