import React, { useState, useEffect } from 'react';
import getProfile from '../services/profileService';
import IProfile from '../interfaces/IProfile';
import { ArrowDownTrayIcon, CogIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import BaseUrlApi from '../config/apiConfig';
import { useTranslation } from "react-i18next";
import retryApi from "../utils/renderRetryApi";

function MyProfile() {
  const [profileData, setProfileData] = useState<IProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  const API_BASE_URL: string = BaseUrlApi(i18n.language);
  const getProfileImage = `${profileData?.profileImageUrl || ''}`;

  const fetchProfile = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await getProfile(API_BASE_URL);
      setProfileData(data);
    } catch (err: any) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const errorMessage = t('error_api');
  const renderRetryApi = retryApi(fetchProfile, errorMessage);

  useEffect(() => {
  
    fetchProfile();
 
  }, [API_BASE_URL]);

  return (
    <article
      id="aboutMe"
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl border border-blue-400 transition-shadow duration-300"
    >
      <div className="flex flex-col items-center">
        {loading ? (
            t('loading')
        ) : error ? (
          renderRetryApi
        ) : (
          <>
            {/* Imagen de Perfil */}
            <img
              src={getProfileImage}
              alt="Perfil"
              className="w-44 h-44 rounded-full border-4 border-blue-500 mb-4 object-cover"
            />

            {/* Información Personal */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">{t('profile.about_me')}</h3>
              <hr className="w-20 mx-auto border-blue-400 my-2" />
              <p className="text-gray-600 leading-relaxed">
                {profileData?.aboutMe || 'Información no disponible.'}
              </p>
            </div>

            {/* Perfil Profesional */}
            <div className="text-center mb-6">
              <h4 className="text-lg font-bold text-gray-800 mb-2">{t('profile.tag')}</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {profileData?.ProfileTags.map((tag, index) => (
                  <span
                    key={tag.ProfileTagId}
                    className="flex items-center bg-gray-100 text-gray-800 text-sm font-medium py-1 px-3 rounded-full shadow-sm transform hover:scale-105 transition duration-200"
                  >
                    <CogIcon className="w-4 h-4 mr-2 text-blue-500" />
                    {tag.ProfileTagName}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-center mb-6">
              <h4 className="text-lg font-bold text-gray-800">{t('profile.residency')}</h4>
              <p className="text-gray-600">{profileData?.residency || 'No especificado.'}</p>
            </div>

      
          </>
        )}
      </div>
    </article>
  );
}

export default MyProfile;
