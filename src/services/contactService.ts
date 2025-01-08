import axios from 'axios';
import IContact from '../interfaces/IContact';


const getContact = async (apiBaseUrl: string): Promise<IContact[]> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/contact`);


    return response.data.map((item: any) => ({
      channel: item.Channel,
      contact: item.Contact,
      url: item.URL
    }));

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default getContact;