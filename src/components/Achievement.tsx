import React, { useState, useEffect } from 'react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";
import getAchievement from '../services/achievementService';
import IAchievement from '../interfaces/IAchievement';
import { useTranslation } from "react-i18next";
import BaseUrlApi from '../config/apiConfig';
import retryApi from "../utils/renderRetryApi";

function Achievements(){
  const [achievementData, setAchievementData] = useState<IAchievement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(true);
  const { i18n, t} = useTranslation();

  const API_BASE_URL: string = BaseUrlApi(i18n.language);



  const [activeIndex, setActiveIndex] = useState<string | null>(null);


  const toggleAccordion = (name: string) => {
    setActiveIndex(activeIndex === name ? null : name);
  };


  const fetchAchievement = async () => {
    setLoading(true);
    setError(false);
    try {

      const data = await getAchievement(API_BASE_URL);
      setAchievementData(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const errorMessage = t('error_api');
  const renderRetryApi = retryApi(fetchAchievement, errorMessage);


 useEffect(() => {
    
      fetchAchievement();
  
    }, [API_BASE_URL]);


  return (
    <div className="mx-auto bg-white shadow-md rounded-lg p-6" id="achievements">

    {loading ? (
          t('loading')
        ) : error ? (
          renderRetryApi
        ) : (
          <>

      <h2 className="text-3xl font-bold text-gray-800 mb-6 transition-colors duration-500" id="achievements">{t('achievement.achievement')}</h2>
      <div className="divide-y divide-gray-200">
        {achievementData.map((achievement) => (
          <div key={achievement.name} className="py-4">

            <button
              className="flex justify-between items-center w-full text-left text-gray-700 hover:text-gray-900 font-semibold text-lg focus:outline-none"
              onClick={() => toggleAccordion(achievement.name)}
            >
              <span className="flex items-center gap-2">
                <TrophyIcon className="h-6 w-6 text-black" />
                {achievement.name}
              </span>
              {activeIndex === achievement.name ? (
                <ChevronUpIcon className="h-6 w-6 text-gray-500" />
              ) : (
                <ChevronDownIcon className="h-6 w-6 text-gray-500" />
              )}
            </button>

         
            {activeIndex === achievement.name && (
              <div className="mt-4 text-gray-600">
                <p>{achievement.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      </>
    )}

    </div>
  );
};

export default Achievements;









