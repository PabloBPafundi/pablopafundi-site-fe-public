import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDownIcon, GlobeAltIcon, FolderIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import highlightTitle from '../utils/highlightTitle';



function Navbar() {
  const { t, i18n } = useTranslation();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  const currentLanguage = i18n.language === 'es' ? 'Español' : 'English';

  const closeMenu = () => {
    setMenuVisible(false);
    document.body.classList.remove("overflow-hidden");
    setDropdownVisible(false);
  };

  const changeDirectory = (lang: string, e: React.MouseEvent) => {
    e.preventDefault();
   
    i18n.changeLanguage(lang).then(() => {
      if (location.pathname !== `/${lang}`) {
        navigate(`/${lang}`, { replace: true });
      }    });

    closeMenu();
  };

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    document.body.classList.toggle("overflow-hidden", !menuVisible);
  };

  const handleNavigation = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      if (element.tagName === "H2") {
        highlightTitle(sectionId);
      }
    }
    closeMenu();
  };

  useEffect(() => {
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full py-4 bg-gradient-to-r from-blue-500 to-blue-700 shadow-md z-50">
      <nav className="flex items-center justify-between px-4 container mx-auto">
        {/* Título */}
        <div className="text-white text-xl font-bold">Pablo Miguel Pafundi Bruzza</div>

        <button
          className="text-white focus:outline-none lg:hidden"
          onClick={toggleMenu}
        >
          {menuVisible ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>

        <ul
          className={`fixed inset-0 h-screen w-full flex flex-col space-y-6 items-center justify-center bg-blue-600 text-white transition-transform transform lg:relative lg:inset-auto lg:h-auto lg:w-auto lg:flex-row lg:space-y-0 lg:space-x-6 lg:bg-transparent ${
            menuVisible ? "translate-x-0" : "translate-x-full lg:translate-x-0"
          }`}
        >
          {menuVisible && (
            <button
              className="absolute top-4 right-4 text-white focus:outline-none lg:hidden"
              onClick={toggleMenu}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          )}
          <li className="hover:text-gray-200 cursor-pointer" onClick={() => handleNavigation('aboutMe')}>
            {t('navbar.aboutMe')}
          </li>
          <li className="hover:text-gray-200 cursor-pointer" onClick={() => handleNavigation('workExperience')}>
            {t('navbar.workExperience')}
          </li>
          <li className="hover:text-gray-200 cursor-pointer" onClick={() => handleNavigation('education')}>
            {t('navbar.education')}
          </li>
          <li className="hover:text-gray-200 cursor-pointer" onClick={() => handleNavigation('knowledge')}>
            {t('navbar.knowledge')}
          </li>
          <li className="hover:text-gray-200 cursor-pointer" onClick={() => handleNavigation('achievements')}>
            {t('navbar.achievements')}
          </li>
          <li className="hover:text-gray-200 cursor-pointer" onClick={() => handleNavigation('contact')}>
            {t('navbar.contact')}
          </li>
          <li
            className="bg-white text-black font-bold py-1 px-2 rounded-md hover:bg-blue-100 cursor-pointer flex items-center space-x-2"
            onClick={() => handleNavigation('portfolio')}
          >
            <FolderIcon className="w-5 h-5 text-black mr-2" />
            {t('navbar.portfolio')}
          </li>

          <li className="relative">
            <button
              className="flex items-center space-x-2 px-4 py-2 rounded-md focus:outline-none"
              onClick={toggleDropdown}
            >
              <GlobeAltIcon className="w-5 h-5" />
              <span>{currentLanguage}</span>
              <ChevronDownIcon className="w-4 h-4" />
            </button>

            {dropdownVisible && (
              <div className="absolute left-0 mt-2 space-y-2 p-2 bg-gray-700 text-white rounded-md">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm hover:bg-gray-600"
                  onClick={(e) => changeDirectory('es', e)}
                >
                  {t('navbar.spanish')}
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm hover:bg-gray-600"
                  onClick={(e) => changeDirectory('en', e)}
                >
                  {t('navbar.english')}
                </a>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;




/*
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDownIcon, GlobeAltIcon, FolderIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { t, i18n } = useTranslation();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  const currentLanguage = i18n.language === 'es' ? 'Español' : 'English';

  const changeDirectory = (lang: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/${lang}`);
    setDropdownVisible(false);
    setMenuVisible(false);
  };

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);
  const toggleMenu = () => setMenuVisible(!menuVisible);

  const handleNavigation = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
    setMenuVisible(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full py-4 bg-gradient-to-r from-blue-500 to-blue-700 shadow-md z-50">
      <nav className="flex items-center justify-between px-4 container mx-auto">
      
        <div className="text-white text-xl font-bold">Pablo Miguel Pafundi Bruzza</div>

    
        <button
          className="text-white focus:outline-none lg:hidden xl:hidden"
          onClick={toggleMenu}
        >
          {menuVisible ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>

     
        <ul
          className={`fixed inset-0 flex flex-col items-center justify-center space-y-6 bg-blue-600 lg:bg-transparent text-white transition-transform transform lg:relative lg:inset-auto lg:flex-row lg:space-y-0 lg:space-x-6 ${menuVisible ? 'translate-x-0' : 'translate-x-full lg:translate-x-0 xl:translate-x-0'}`}
        >
          {menuVisible && (
            <button
              className="absolute top-4 right-4 text-white focus:outline-none lg:hidden xl:hidden"
              onClick={toggleMenu}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          )}
          <li className="hover:text-gray-200 cursor-pointer" onClick={() => handleNavigation('aboutMe')}>{t('navbar.aboutMe')}</li>
          <li className="hover:text-gray-200 cursor-pointer" onClick={() => handleNavigation('workExperience')}>{t('navbar.workExperience')}</li>
          <li className="hover:text-gray-200 cursor-pointer" onClick={() => handleNavigation('education')}>{t('navbar.education')}</li>
          <li className="hover:text-gray-200 cursor-pointer" onClick={() => handleNavigation('knowledge')}>{t('navbar.knowledge')}</li>
          <li className="hover:text-gray-200 cursor-pointer" onClick={() => handleNavigation('achievements')}>{t('navbar.achievements')}</li>
          <li className="hover:text-gray-200 cursor-pointer" onClick={() => handleNavigation('contact')}>{t('navbar.contact')}</li>
          <li className="bg-white text-black font-bold py-1 px-2 rounded-md hover:bg-blue-100 cursor-pointer flex items-center space-x-2" onClick={() => handleNavigation('portfolio')}>
            <FolderIcon className="w-5 h-5 text-black mr-2" />
            {t('navbar.portfolio')}
          </li>

         
          <li className="relative">
            <button
              className="flex items-center space-x-2 px-4 py-2 rounded-md focus:outline-none"
              onClick={toggleDropdown}
            >
              <GlobeAltIcon className="w-5 h-5" />
              <span>{currentLanguage}</span>
              <ChevronDownIcon className="w-4 h-4" />
            </button>

            {dropdownVisible && (
              <div className="absolute left-0 mt-2 space-y-2 p-2 bg-gray-700 text-white rounded-md">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm hover:bg-gray-600"
                  onClick={(e) => changeDirectory('es', e)}
                >
                  {t('navbar.spanish')}
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm hover:bg-gray-600"
                  onClick={(e) => changeDirectory('en', e)}
                >
                  {t('navbar.english')}
                </a>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
*/
