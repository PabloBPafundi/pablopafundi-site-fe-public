import axios from 'axios';
import IAchievement from '../interfaces/IAchievement';


const getAchievement = async (apiBaseUrl: string): Promise<IAchievement[]> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/achievements`);


    return response.data.map((item: any) => ({
      name: item.Name,
      description: item.Description,
    }));

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default getAchievement;