import axios from 'axios';
import IPortfolio from '../interfaces/IPortfolio';


const getPortfolio = async (apiBaseUrl: string): Promise<IPortfolio[]> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/portfolio`);


    return response.data.map((item: any) => ({
      name: item.Name,
      description: item.Description,
      dateCompleted: item.DateCompleted,
      urlRepository: item.URLRepository
    }));

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default getPortfolio;