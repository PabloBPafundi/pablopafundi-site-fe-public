import React, { useState, useEffect } from 'react';
import { AcademicCapIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import getEducationData from "../services/educationService";
import IEducation from "../interfaces/IEducation";
import { useTranslation } from "react-i18next";
import BaseUrlApi from '../config/apiConfig';
import { formatDateToMonthYear } from '../utils/dateUtils';
import retryApi from "../utils/renderRetryApi";


function Education() {
const [educationData, setEducationData] = useState<IEducation[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<boolean>(true);
const { t, i18n } = useTranslation();

const API_BASE_URL: string = BaseUrlApi(i18n.language);


 const fetchWorkExperience = async () => {
  setLoading(true);
  setError(false);
  try {

    const data = await getEducationData(API_BASE_URL);
    setEducationData(data); 
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

const renderEducationCard = (educationItem: IEducation) => (

  <div key={educationItem.name} className=" bg-white border border-gray-200 rounded-lg shadow  hover:shadow-xl transition-shadow duration-300 mb-4">
  <div className="p-6">
    <div className="flex items-center justify-center mb-4">
      <AcademicCapIcon className="w-10 h-10 text-blue-500" />
    </div>
    <h5 className="text-xl font-bold text-center text-gray-800 mb-2">
    {educationItem.name}
    </h5>
    <p className="text-gray-600 text-sm text-left mb-4">
    {educationItem.description}
    </p>
    <div className="text-center">
    
      {educationItem.siteURL && (
          <a
            href={educationItem.siteURL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            <span>Visitar</span>
            <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2" />
          </a>
        )}

    </div>
  </div>
  <div className="px-6 py-4 bg-gray-100 border-t border-gray-200 text-center">
    <p className="text-xs text-gray-500 font-medium">

       {formatDateToMonthYear(educationItem.dateStarted)} -{' '}
              {educationItem.dateEnd
                ? formatDateToMonthYear(educationItem.dateEnd)
                : t('presentTime')}

    </p>
  </div>
</div>

);






  return (
<section >
<h2 className="text-3xl font-bold text-black mb-4 transition-colors duration-500" id="education">

{t('education.education')}

</h2>
<hr className="mb-6" />

{loading ? (
          t('loading')
        ) : error ? (
          renderRetryApi
        ) : (
          <>
          
          <div>{educationData.map(renderEducationCard)}</div>  
          
             </>
    )}

</section>


  );
};

export default Education;