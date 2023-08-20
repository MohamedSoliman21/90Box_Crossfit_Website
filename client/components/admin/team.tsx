import { Delete, Edit, CloseOutlined, Remove, Add } from "@mui/icons-material";
import axios from "axios";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Loading from "../Loading";

const Team = () => {
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [TeamImage, setTeamImage] = useState<File | null>(null);
    const [TeamID, setTeamID] = useState(""); 
    const [Name, setName] = useState("");
    const [ArabicName, setArabicName] = useState("");
    const [Title, setTitle] = useState("");
    const [ArabicTitle, setArabicTitle] = useState("");
    const [Certificates, setCertificates] = useState<string[]>([]);
    const [ArabicCertificates, setArabicCertificates] = useState<string[]>([]);
    const [certificateInput, setCertificateInput] = useState('');
    const [ArabicCertificateInput, setArabicCertificateInput] = useState('');
    const [Teams, setTeam]: any = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0 ) {
        const selectedImage = event.target.files[0];
        setTeamImage(selectedImage);

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
      setArabicName('');
      setTitle('');
      setArabicTitle('');
      setTeamID("");
      setTeamImage(null);
      setCertificates([]);
      setArabicCertificates([]);
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

      const handleAddArabicCertificate = () => {
        if (ArabicCertificateInput.trim() !== '') {
          setArabicCertificates([...ArabicCertificates, ArabicCertificateInput]);
          setArabicCertificateInput('');
        }
      };
    
      const handleRemoveArabicCertificate = (index: number) => {
        const updatedCertificates = [...ArabicCertificates];
        updatedCertificates.splice(index, 1);
        setArabicCertificates(updatedCertificates);
      };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
    
        if (TeamImage) {
            const formData = new FormData(); 
            formData.append("Name", Name);
            formData.append("Title", Title);
            formData.append("ArabicName", ArabicName);
            formData.append("ArabicTitle", ArabicTitle);
            Certificates.forEach((certificate, index) => {
                formData.append("Certificates", certificate)
            });
            ArabicCertificates.forEach((certificate, index) => {
              formData.append("ArabicCertificates", certificate);
            })
            formData.append("Image", TeamImage);

            if(isEdit) {
                const response = await axios.put(`http://localhost:4000/team/${TeamID}`, formData);
                const updatedTeam = Teams.map((team: any) => {
                    if (team._id === TeamID) {
                      return {...team, ...formData};
                    }
                    return team;
                  });
                  setTeam(updatedTeam);
                  ModalHandler();
            } else {
                try {
                    const response = await axios.post('http://localhost:4000/team', formData);
                    setTeam([...Teams, response.data]);
                    ModalHandler();
                    console.log('Image uploaded successfully:', response.data);
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            }
          };
        }
    
      useEffect(() => {
        fetchTeam();
      }, []);
    
      const fetchTeam = async () => {
        try {
          const response = await axios.get('http://localhost:4000/team');
          setTeam(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching Team:', error);
          setIsLoading(false);
        }
      };
      
      const EditHandler = (team: any) => {
        setIsEdit(true);
        setIsOpen(true);
        setTeamID(team._id);
        setName(team.Name);
        setArabicName(team.ArabicName);
        setTitle(team.Title);
        setArabicTitle(team.ArabicTitle);
        setTeamImage(team.Image);
        setCertificates(team.Certificates);
        setArabicCertificates(team.ArabicCertificates);
      };

      const deleteTeam = async (id: String) => {
        try {
            await axios.delete(`http://localhost:4000/team/${id}`)
            .then(() => {
                setTeam(Teams.filter((val:any) => {
                    return val._id != id;
                })
            )})
        }
        catch (error) {
            console.error('Error deleting Team:', error);
        }
      }

    return (  
        <div className="relative p-4 border-l border-pgrey h-[26rem] overflow-y-auto">
      <h2 className="text-2xl text-white font-bold mb-8">Team</h2>
      {isLoading? (<Loading />) : (
      <div>

      <div className='flex justify-end mb-8'>
        <button className='bg-green-500 text-xl w-16 h-8 rounded' onClick={ModalHandler}>New</button>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {Teams.map((member: any) => (
          <div key={member._id} className="bg-white p-4 rounded shadow">
            <div className='flex flex-row-reverse'>
                <button className="relative hover:text-red-500" onClick={(e)=>{deleteTeam(member._id)}}>
                <Delete />
                </button>
                <button className='relative hover:text-pyellow' onClick={(e)=>EditHandler(member)}>
                    <Edit />
                </button>
            </div>
            <img src={`http://localhost:4000/${member.Image}`}/>
            <h3 className="relative text-lg font-bold mb-2">{member.Title}</h3>
            <p className="text-gray-500 mt-2">{member.Description}</p>
            <ul className="list-disc ml-6">
              {member.Certificates?.map((certificate: String, index: 0) => (
                <li key={index}>{certificate}</li>
              ))}
            </ul>
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
            <h2 className="text-xl text-white font-bold mb-4">{isEdit ? 'Edit Team Member' : 'New Team Member'}</h2>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                <div className="flex justify-between">
                  <div className="flex flex-col">

                    <input className='text-pgrey mb-4' id='Name' value={Name} type='text' placeholder='Name' onChange={(e)=>setName(e.target.value)}></input>
                    <input className='mb-4' id='Content' value={Title} placeholder='Title' onChange={(e)=>{setTitle(e.target.value)}}></input>
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
                    </div>
                    <div className="flex flex-col">
                    <input className='text-pgrey mb-4' id='Name' value={ArabicName} type='text' placeholder='Arabic Name' onChange={(e)=>setArabicName(e.target.value)}></input>
                    <input className='mb-4' id='Content' value={ArabicTitle} placeholder='Arabic Title' onChange={(e)=>{setArabicTitle(e.target.value)}}></input>
                    <div>
                        {ArabicCertificates?.map((certificate, index) => (
                        <div className='flex justify-between mb-2' key={index}>
                            <input type="text" value={certificate} readOnly />
                            <button className='bg-pyellow' type="button" onClick={() => handleRemoveArabicCertificate(index)}>
                                <Remove />
                            </button>
                        </div>
                        ))}
                    </div>
                    <div className='flex justify-between mb-4'>
                        <input
                        type="text"
                        value={ArabicCertificateInput}
                        placeholder='Arabic Certificate'
                        onChange={(e) => setArabicCertificateInput(e.target.value)}
                        />
                        <button className='bg-pyellow' type="button" onClick={handleAddArabicCertificate}>
                            <Add />
                        </button>
                      </div>
                    </div>
                    </div>

                    <div className="mb-4 ">
                        <input className="w-24 mb-4" type="file" accept="image/*" onChange={handleFileChange} />
                        {isEdit && !previewImage  && <img src={`http://localhost:4000/`+ TeamImage} alt="Program Image" style={{ maxWidth: '100%', height: 'auto' }} />}
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
 
export default Team;