import axios from 'axios';
import IWorkExperience from '../interfaces/IWorkExperience';


const getWorkExperience = async (apiBaseUrl: string | undefined): Promise<IWorkExperience[]> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/work-experience`);


    return response.data.map((item: any) => ({
      name: item.Name,
      description: item.Description,
      dateStarted: item.DateStarted, 
      dateEnd: item.DateEnd,
      siteURL: item.SiteURL
    }));

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default getWorkExperience;