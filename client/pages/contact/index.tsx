import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React, { useContext, useState } from "react";
import {FormattedMessage} from "react-intl"
import {useIntl} from "react-intl"
import { LanguageDirectionContext } from "@/helpers/langDirection";
import classNames from "classnames";
import { Person, Email, Phone, Message } from '@mui/icons-material';
import axios from "axios";

const contact: React.FC = () => {
    const { isRTL } = useContext(LanguageDirectionContext);

    const {formatMessage} = useIntl();
    
    const validationSchema = Yup.object({
        name: Yup.string().required(formatMessage({ id: 'contact.name.error' }))
        .matches(/^[a-zA-Z\u0600-\u06FF,-\s][\s\a-zA-Z\u0600-\u06FF,-]*$/i, formatMessage({ id: 'contact.name.invalid' })),
        email: Yup.string().email(formatMessage({ id: 'contact.email.invalid' })).required(formatMessage({ id: 'contact.email.error' })),
        phone: Yup.string().matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, formatMessage({ id: 'contact.phone.invalid' }))
        .required(formatMessage({ id: 'contact.phone.error' })),
        message: Yup.string().required(formatMessage({ id: 'contact.message.error' }))
    })

    const initialValues ={
        name: "",
        email: "",
        phone: "",
        message: ""
    }

    const handleSubmit = async(values:any, { resetForm }:any) => {
        validationSchema
          .validate(values)
          .then(async () => {
            const formData = {
                Name: values.name,
                Email: values.email,
                Phone: values.phone,
                Message: values.message
            }

            console.log(formData);
            await axios.post("http://localhost:4000/contact", formData);
            toast.success(formatMessage({ id: 'contact.toast.success' }));
            resetForm();
          })
          .catch((error) => {      
            toast.error(formatMessage({ id: 'contact.toast.error' }));
          });
      };
      
    return (  
        <div className={classNames(`${isRTL ? 'arabic' : 'english'}`,{ 'text-right': isRTL },"flex flex-col md:flex-row max-w mx-auto justify-around")}>
            <div className="grid w-full h-full place-items-center" >
                <h1 className="text-4xl font-bold m-10"><FormattedMessage id="navbar.contact" /></h1>
                <img className="m-10" src={"http://localhost:3000/logo.png"}/>
            </div>
            <div className="w-full">
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit= {handleSubmit}
            >

            <Form className="space-y-5 m-10">
            <div>
                <div>
                    {isRTL ? (
                        <div>
                            <FormattedMessage id="contact.name" />
                            <Person />
                        </div>
                    ): (
                        <div className="flex">
                            <Person />
                            <FormattedMessage id="contact.name" />  
                        </div>
                    )} 
                       
                </div>
                <Field
                type="text"
                id="name"
                name="name"
                className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
                <div>
                    {isRTL ? (
                        <div>
                            <FormattedMessage id="contact.phone" />
                            <Phone />
                        </div>
                    ): (
                        <div className="flex">
                            <Phone />
                            <FormattedMessage id="contact.phone" />  
                        </div>
                    )}    
                </div>
                <Field
                type="text"
                id="phone"
                name="phone"
                className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
                <div>
                    {isRTL ? (
                        <div>
                            <FormattedMessage id="contact.email" />
                            <Email />
                        </div>
                    ): (
                        <div className="flex">
                            <Email />
                            <FormattedMessage id="contact.email" />  
                        </div>
                    )}    
                </div>
                <Field
                type="email"
                id="email"
                name="email"
                className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
                <div>
                    {isRTL ? (
                        <div>
                            <FormattedMessage id="contact.message" />
                            <Message />
                        </div>
                    ): (
                        <div className="flex">
                            <Message />
                            <FormattedMessage id="contact.message" />  
                        </div>
                    )}    
                </div>
                <Field
                as="textarea"
                id="message"
                name="message"
                rows={4}
                className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
                />
                <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <button
                type="submit"
                className="bg-pyellow text-pgrey px-4 py-2 rounded-md hover:bg-black hover:text-white" >
                <FormattedMessage id="contact.submit" />
            </button>

            </Form>
        </Formik>
            </div>
    
        <ToastContainer 
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"/>
    </div>
    );
}
 
export default contact;