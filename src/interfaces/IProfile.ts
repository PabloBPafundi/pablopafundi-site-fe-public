export default interface IProfile {
  residency: string;
  aboutMe: string;
  profileImageUrl: string | null; 
  ProfileTags: { ProfileTagName: string, ProfileTagId: number, ProfileId: number }[];
}