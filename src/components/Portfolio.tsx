import React, { useState, useEffect } from 'react';
import { CodeBracketIcon, ArrowRightIcon } from "@heroicons/react/24/solid"; 
import getPortfolio from '../services/portfolioService';
import IPortfolio from '../interfaces/IPortfolio';
import { useTranslation } from "react-i18next";
import BaseUrlApi from '../config/apiConfig';
import { formatDateToYear } from '../utils/dateToYear';
import retryApi from "../utils/renderRetryApi";

function Portfolio() {
  const [portfolioData, setPortfolioData] = useState<IPortfolio[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(true);
  const { t, i18n } = useTranslation();
  const API_BASE_URL: string = BaseUrlApi(i18n.language);
  const fetchPorfolio = async () => {
    setLoading(true);
    setError(false);
    try {
       const data = await getPortfolio(API_BASE_URL);
      setPortfolioData(data); 
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const errorMessage = t('error_api');
  const renderRetryApi = retryApi(fetchPorfolio, errorMessage);


     useEffect(() => {
        
          fetchPorfolio();
        }, [API_BASE_URL]);
    

  const renderPortfolioCard = (portfolio: IPortfolio) => (
    <div
  key={portfolio.name}
  className="bg-gray-100 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full"
>
  <div>
    <div className="flex items-center gap-2 mb-4">
      <CodeBracketIcon className="h-8 w-8 text-blue-500" />
      <h5 className="text-xl font-semibold text-gray-800">{portfolio.name}</h5>
    </div>
    <p className="text-gray-700 mb-4">{portfolio.description}</p>
  </div>

  <div className="mt-auto">
    <div className="flex justify-center my-4">
      <a
        href={portfolio.urlRepository}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
      >
        <ArrowRightIcon className="h-5 w-5" />
        {t('portfolio.repository')}
      </a>
    </div>
    <p className="text-sm text-gray-500 text-center">
      <small>
        {t('portfolio.completed_in')} {formatDateToYear(portfolio.dateCompleted)}
      </small>
    </p>
  </div>
</div>

  );

  return (
    <section className="py-10 px-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center transition-colors duration-500" id="portfolio">{t('portfolio.portfolio')}</h2>
      <hr className="border-gray-300 mb-6" />

      {loading ? (
          t('loading')
        ) : error ? (
          renderRetryApi
        ) : (
          <>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.map(renderPortfolioCard)}
        </div>
        </>
    )}


    </section>
  );
}

export default Portfolio;

