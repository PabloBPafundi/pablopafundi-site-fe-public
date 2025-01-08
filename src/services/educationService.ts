import axios from 'axios';
import EducationData from '../interfaces/IEducation';

const getEducationData = async (apiBaseUrl: string): Promise<EducationData[]> => {
try {

    const response = await axios.get(`${apiBaseUrl}/education`)
    
 
      return response.data.map((item: any) => ({
        name: item.Name,
        description: item.Description,
        dateStarted: item.DateStart, 
        dateEnd: item.DateEnd,
        siteURL: item.SiteURL
      }));


} catch (error) {
  console.error('Error:', error);
    throw error;
    
}


};
export default getEducationData;