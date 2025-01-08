import React, { useState, useEffect } from 'react';
import getWorkExperience from '../services/workExperienceService';
import IWorkExperience from '../interfaces/IWorkExperience';
import { useTranslation } from "react-i18next";
import BaseUrlApi from '../config/apiConfig';
import { formatDateToMonthYear } from '../utils/dateUtils';
import { LinkIcon } from '@heroicons/react/24/solid';
import retryApi from "../utils/renderRetryApi";

function WorkExperience() {
  const [workExperienceData, setWorkExperienceData] = useState<IWorkExperience[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<boolean>(true);
  const { t, i18n } = useTranslation();

  const API_BASE_URL: string = BaseUrlApi(i18n.language);
  const fetchWorkExperience = async () => {
    setLoading(true);
    setError(false);
    try {
      
      const data = await getWorkExperience(API_BASE_URL);
      setWorkExperienceData(data); 
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };


  const errorMessage = t('error_api');
  const renderRetryApi = retryApi(fetchWorkExperience, errorMessage);

  useEffect(() => {
      fetchWorkExperience();
    }, [API_BASE_URL]);

  const renderExperienceCard = (experience: IWorkExperience) => (
    <div
      className="mb-5 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
      key={experience.name}
    >
      {/* Header */}
      <h5 className="bg-blue-500 text-white p-3 rounded-t-lg font-semibold text-sm md:text-lg">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
    {/* Título */}
    <span className="block">{experience.name.toUpperCase()}</span>

    {/* Enlace */}
    {experience.siteURL && (
      <a
        href={experience.siteURL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 md:mt-0 flex items-center text-white hover:underline hover:text-gray-200 transition-colors duration-300"
      >
        <LinkIcon className="w-5 h-5 mr-1" />
        <span>{t('visitSite')}</span>
      </a>
    )}
  </div>
</h5>
 
      <div className="p-4">
        <p className="text-gray-700">{experience.description}</p>
      </div>
  
    
      <div className="bg-gray-200 text-gray-600 p-2 pr-10 rounded-b-lg text-right text-sm">
        {formatDateToMonthYear(experience.dateStarted)} -{' '}
        {experience.dateEnd
          ? formatDateToMonthYear(experience.dateEnd)
          : t('presentTime')}
      </div>
    </div>
  );
  return (
    <section >
      <h2 className="text-3xl font-bold text-black mb-4 transition-colors duration-500" id="workExperience">
        {t('work_experience.work_experience')}
      </h2>
      <hr className="mb-6" />


      {loading ? (
          t('loading')
        ) : error ? (
          renderRetryApi
        ) : (
          <>

        <div>
          {workExperienceData.map(renderExperienceCard)} 
        </div>
        </>
    )}

    </section>
  );
}

export default WorkExperience;
