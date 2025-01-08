import axios from 'axios';
import ProfileData from '../interfaces/IProfile';

const getProfile = async (apiBaseUrl: string): Promise<ProfileData> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/my-profile`);
    
    return {
      residency: response.data.Residency,
      aboutMe: response.data.AboutMe,
      profileImageUrl: response.data.ProfileImage, 
      ProfileTags: response.data.ProfileTags.map((tag: any) => ({
        ProfileTagName: tag.ProfileTagName,
        ProfileTagId: tag.ProfileTagId,
        ProfileId: tag.ProfileId,
      })),
    };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default getProfile;