const defineLang = () => {
    const validLangs = ['en', 'es'];
    const browserLang = navigator.language.split('-')[0];
    let lang;  

    lang = validLangs.includes(browserLang) ? browserLang : 'en';

    
    return lang;
  };
  
  export default defineLang; 
  