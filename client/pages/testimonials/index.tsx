import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LanguageDirectionContext } from "@/helpers/langDirection";
import { FormattedMessage } from "react-intl";

const testimonials = () => {
    
    const [testimonials, setTestimonials] = useState([]);

    const { isRTL } = useContext(LanguageDirectionContext);

    useEffect(() => {
      fetchTestimonials();
    }, []);
  
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('http://localhost:4000/testimonial');
        setTestimonials(response.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    return (  
        <div className={`w-full min-h-screen mx-auto py-8 bg-primary ${isRTL? "arabic" : "english"}`}>
            <div className="container mx-auto px-4">
            <h1 className="text-3xl text-white font-semibold text-center mb-8">
                <FormattedMessage id="navbar.testimonials"/>
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial:any) => (
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={`http://localhost:4000/${testimonial.Image}`}
                  alt={testimonial.Name}
                  className="w-full h-60 object-cover object-center"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{testimonial.Name}</h2>
                  <p className="text-gray-600">{testimonial.Content}</p>
                </div>
              </div>
                ))}
            </div>
            </div>
        </div>
        );
    };
 
export default testimonials;