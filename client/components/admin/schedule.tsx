import { Delete, Edit, CloseOutlined } from "@mui/icons-material";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Loading from "../Loading";

const Schedule = () => {
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [ProgramImage, setProgramImage] = useState<File | null>(null);
    const [ProgramID, setTestimonialID] = useState(""); 
    const [Name, setName] = useState("");
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [Programs, setPrograms]: any = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0 ) {
          const selectedImage = event.target.files[0];
          setProgramImage(selectedImage);
  
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
        setProgramImage(null);
      };
      
      const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
    
        if (ProgramImage) {
            const formData = new FormData(); 
            formData.append("Name", Name);
            formData.append("Image", ProgramImage);

            if(isEdit) {
                const response = await axios.put(`http://localhost:4000/schedule/${ProgramID}`, formData);
                const updatedTestimonial = Programs.map((testimonial: any) => {
                    if (testimonial._id === ProgramID) {
                      return {...testimonial, ...formData};
                    }
                    return testimonial;
                  });
                  setPrograms(updatedTestimonial);
                  ModalHandler();
            } else {
                try {
                    const response = await axios.post('http://localhost:4000/schedule', formData);
                    setPrograms([...Programs, response.data]);
                    ModalHandler();
                    console.log('Image uploaded successfully:', response.data);
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            }
          };
        }

        useEffect(() => {
            fetchPrograms();
          }, []);
        
          const fetchPrograms = async () => {
            try {
              const response = await axios.get('http://localhost:4000/schedule');
              setPrograms(response.data);
              setIsLoading(false);
            } catch (error) {
              console.error('Error fetching schedule:', error);
              setIsLoading(false);
            }
          };
          
          const EditHandler = (schedule: any) => {
            setIsEdit(true);
            setIsOpen(true);
            setTestimonialID(schedule._id);
            setName(schedule.Name);
            setProgramImage(schedule.Image)
          };
    
          const deleteProgram = async (id: String) => {
            try {
                await axios.delete(`http://localhost:4000/schedule/${id}`)
                .then(() => {
                    setPrograms(Programs.filter((val:any) => {
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
          <h2 className="text-2xl text-white font-bold mb-8">Schedule</h2>
            {isLoading? (<Loading />) : (
          <div>
          <div className='flex justify-end mb-8'>
            <button className='bg-green-500 text-xl w-16 h-8 rounded' onClick={ModalHandler}>New</button>
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {Programs.map((program: any) => (
              <div key={program._id} className="bg-white p-4 rounded shadow">
                <div className='flex flex-row-reverse'>
                    <button className="relative hover:text-red-500" onClick={(e)=>{deleteProgram(program._id)}}>
                    <Delete />
                    </button>
                    <button className='relative hover:text-pyellow' onClick={(e)=>EditHandler(program)}>
                        <Edit />
                    </button>
                </div>
                <img src={`http://localhost:4000/${program.Image}`}/>
                <h3 className="relative text-lg font-bold mb-2">{program.Name}</h3>
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
                    <h2 className="text-xl text-white font-bold mb-4">{isEdit ? 'Edit Schedule' : 'New Schedule'}</h2>
                    <form className='flex flex-col' onSubmit={handleSubmit}>
                        <input className='text-pgrey mb-4' id='Name' value={Name} type='text' placeholder='Name' onChange={(e)=>setName(e.target.value)}></input>
                        <div className="mb-4 ">
                            <input className="w-24 mb-4" type="file" accept="image/*" onChange={handleFileChange} />
                            {isEdit && !previewImage  && <img src={`http://localhost:4000/`+ ProgramImage} alt="Program Image" style={{ maxWidth: '100%', height: 'auto' }} />}
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
 
export default Schedule;