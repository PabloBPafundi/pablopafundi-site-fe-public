import React, { useState, useEffect } from 'react';
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import BaseUrlApi from '../config/apiConfig';
import getKnowledge from "../services/knowLedgeService";
import IKnowLedge from "../interfaces/IKnowledge";
import retryApi from "../utils/renderRetryApi";

function Knowledge() {
  const [knowledgeData, setKnowledgeData] = useState<IKnowLedge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(true);
  const { t, i18n } = useTranslation();

  const API_BASE_URL: string = BaseUrlApi(i18n.language);

  const fetchKnowledge = async () => {
    setLoading(true);
    setError(false);
    try {
   
      const data = await getKnowledge(API_BASE_URL);
      setKnowledgeData(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  
const errorMessage = t('error_api');
const renderRetryApi = retryApi(fetchKnowledge, errorMessage);

  useEffect(() => {
    fetchKnowledge();
  }, [API_BASE_URL]);

  const getSkillPercentage = (level: string): number => {
    const levelMappings: { [key: string]: number } = {
      BEGINNER: 25,
      PRINCIPIANTE: 25,
      INTERMEDIATE: 50,
      INTERMEDIO: 50,
      AVANZADO: 75,
      ADVANCED: 75,
      EXPERTO: 100,
      EXPERT: 100,
      NATIVO: 100,
      NATIVE: 100,
    };
    return levelMappings[level.toUpperCase()] || 0;
  };

  const renderSkillSection = (title: string, skills: IKnowLedge[]) => (
    <section className="mb-10">
      <h3 className="text-2xl font-bold mb-6 bg-blue-400 text-white py-2 px-4 rounded-md shadow">
        {title}
      </h3>
      <div className="space-y-6">
        {skills.map((skill) => (
          <div key={skill.knowledgeId}>
            <h4 className="text-lg font-medium text-gray-700 mb-2">{skill.name}</h4>
            {/* Muestra las barras solo en pantallas grandes */}
            <div className="relative w-full bg-gray-200 rounded-full h-6 hidden md:block">
              <div
                className="absolute top-0 left-0 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold"
                style={{ width: `${getSkillPercentage(skill.skillLevel)}%` }}
              >
                {skill.skillLevel}
              </div>
            </div>
            {/* Muestra el nivel de conocimiento en pantallas medianas y pequeñas */}
            <p className="text-sm font-semibold text-gray-500 md:hidden">
              {skill.skillLevel}
            </p>
          </div>
        ))}
      </div>
    </section>
  );

  const renderSimpleList = (title: string, items: IKnowLedge[]) => (
    <section className="w-full mb-8">
      <h3 className="text-2xl font-bold mb-6 bg-blue-400 text-white py-2 px-4 rounded-md shadow">
        {title}
      </h3>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.knowledgeId}
            className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-sm"
          >
            <CheckCircleIcon className="h-6 w-6 text-green-500" />
            <div>
              <h4 className="text-lg font-medium text-gray-700">{item.name}</h4>
              <p className="text-sm text-gray-500">{item.skillLevel}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );

  const categorizedData = {
    LFL: knowledgeData.filter(skill => ["LIBRARY", "FRAMEWORK", "PROGRAMMING_LANGUAGE"].includes(skill.skillType)),
    Languages: knowledgeData.filter(skill => skill.skillType === "LANGUAGE"),
    OS: knowledgeData.filter(skill => skill.skillType === "OS"),
  };



  return (
    <article id="knowledge" className="rounded-lg border border-gray-200 shadow hover:shadow-lg p-6 bg-white">

{loading ? (
          t('loading')
        ) : error ? (
          renderRetryApi
        ) : (
          <>

      {renderSkillSection(t('knowledge.LFL'), categorizedData.LFL)}

      <section className="flex flex-col md:flex-row md:space-x-4">
        {renderSimpleList(t('knowledge.language'), categorizedData.Languages)}
        {renderSimpleList(t('knowledge.OS'), categorizedData.OS)}
      </section>

      </>
    )}
    </article>
  );
}

export default Knowledge;
