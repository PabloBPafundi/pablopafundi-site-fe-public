import { useEffect } from 'react';
import { BrowserRouter as Router, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "./components/Navbar";
import MyProfile from "./components/MyProfile";
import WorkExperience from "./components/WorkExperience";
import Education from "./components/Education";
import Knowledge from "./components/Knowledge";
import Achievements from "./components/Achievement";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";



function App() {
  const { i18n } = useTranslation();

/*
const location = useLocation();
const validLangs = ['en', 'es']; 
const browserLang = navigator.language.split('-')[0]; 
const { i18n } = useTranslation();
const navigate = useNavigate();




  let lang = location.pathname.split('/')[1];

  if (lang !== i18n.language) { 

    if (!validLangs.includes(lang) || !lang) {
      lang = validLangs.includes(browserLang) ? browserLang : 'en'; 
      }
  
    i18n.changeLanguage(lang).then(() => {
        if (location.pathname !== `/${lang}`) {
         
          navigate(`/${lang}`, { replace: true });
        }    });

    }
    
    document.documentElement.lang = i18n.language;
 */  


    document.documentElement.lang = i18n.language;
  return (
    <>
      <Navbar />
      <main className="py-20 md:py-30 lg:py-40 bg-gradient-to-l from-blue-100 to-white flex flex-col min-h-screen">
        <div className="container mx-auto flex-grow px-4  lg:px-0">
          {/* MyProfile and WorkExperience */}
          <div className="flex flex-col lg:flex-row">
            <section className="basis-full lg:basis-1/3 lg:mx-10 mb-10 lg:mb-0">
              <MyProfile />
            </section>
            <section className="basis-full lg:basis-2/3 lg:mx-10">
              <WorkExperience />
            </section>
          </div>

          {/* Education and Knowledge */}
          <div className="flex flex-col lg:flex-row mt-16">
            <section className="basis-full lg:basis-1/2 lg:mx-10 mb-10 lg:mb-0">
              <Education />
            </section>
            <section className="basis-full lg:basis-1/2 lg:mx-10">
              <Knowledge />
            </section>
          </div>

          {/* Achievements */}
          <article className="mt-10">
            <section>
              <Achievements />
            </section>
          </article>

          {/* Portfolio */}
          <article className="mt-10">
            <section>
              <Portfolio />
            </section>
          </article>

          {/* Contact */}
          <article className="mt-10">
            <section>
              <Contact />
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
