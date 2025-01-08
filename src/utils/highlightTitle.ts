const highlightTitle = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.classList.remove("text-gray-800"); 
      element.classList.add("opacity-100", "text-blue-400", "transition-colors", "duration-500"); 
        setTimeout(() => {
        element.classList.remove("text-blue-400"); 
        element.classList.add("text-gray-800"); 
      }, 2000); 
    }
  };
  export default highlightTitle;