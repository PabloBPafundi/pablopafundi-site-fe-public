import React, { useState, useEffect } from 'react';
import getContact from '../services/contactService';
import IContact from '../interfaces/IContact';
import { useTranslation } from "react-i18next";
import BaseUrlApi from '../config/apiConfig';
import { PhoneIcon, EnvelopeIcon, LinkIcon } from "@heroicons/react/24/solid";
import retryApi from "../utils/renderRetryApi";

function Contact(){

  const [contactData, setContactData] = useState<IContact[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
 const [error, setError] = useState<boolean>(true);
 const { t, i18n } = useTranslation();
 const API_BASE_URL: string = BaseUrlApi(i18n.language);



  const fetchContact = async () => {
    setLoading(true);
    setError(false);
    try {
      
      const data = await getContact(API_BASE_URL);
      setContactData(data); 
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const errorMessage = t('error_api');
  const renderRetryApi = retryApi(fetchContact, errorMessage);

  
   useEffect(() => {
  
        fetchContact();
    
      }, [API_BASE_URL]);
  


  const iconSelection = (channel: String) => {
switch (channel) {
  case "WhatsApp":
  return(

    <PhoneIcon className="h-6 w-6 text-green-500" />
  )
    case "Mail":

    return(
    <EnvelopeIcon className="h-6 w-6 text-red-500" />
  )

    case "LinkedIn":
      return(

    <LinkIcon className="h-6 w-6 text-blue-700" />
  )
  default:
    return null;
}

  }


  const renderContact = (contact: IContact) => (
    <div
      className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
      key={contact.channel}
    >
      {contact.url ? (
        <a
          href={contact.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-4 text-blue-500 hover:text-blue-600"
        >
          {iconSelection(contact.channel)}
          <h2 className="text-lg font-semibold text-gray-700">
            {contact.channel}:{' '}
            <span className="font-normal text-gray-500">{contact.contact}</span>
          </h2>
        </a>
      ) : (
        <div className="flex items-center space-x-4">
          {iconSelection(contact.channel)}
          <h2 className="text-lg font-semibold text-gray-700">
            {contact.channel}:{' '}
            <span className="font-normal text-gray-500">{contact.contact}</span>
          </h2>
        </div>
      )}
    </div>
  );
  






  return (
    <section className=" py-10 px-6 bg-white rounded-lg shadow-lg" >
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center transition-colors duration-500" id="contact">{t('contact.contact')}</h2>


      {loading ? (
          t('loading')
        ) : error ? (
          renderRetryApi
        ) : (
          <>


      <div className="space-y-6">
           
    {loading ? (
        <p>{t('loading')}</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
       <>
          {contactData.map(renderContact)}
       </>
      )}

      </div>


      </>
    )}

    </section>
  );
};

export default Contact;
