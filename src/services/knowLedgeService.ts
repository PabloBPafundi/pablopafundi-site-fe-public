import axios from 'axios';
import IKnowledge from '../interfaces/IKnowledge';

const getKnowledge = async (apiBaseUrl: String): Promise<IKnowledge[]> => {

try {

const response = await axios.get(`${apiBaseUrl}/knowledges`);

return response.data.map( (item: any) => ({
    knowledgeId: item.KnowledgeId,
    name: item.Name,
    skillType: item.SkillType,
    skillLevel: item.SkillLevel
}));


} catch (error) {


    console.error('Error:', error);
throw error;

}
};



export default getKnowledge;