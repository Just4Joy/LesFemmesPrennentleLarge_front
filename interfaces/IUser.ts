export default interface IUser {
  id_user: number;
  firstname: string;
  lastname: string;
  city: string;
  email: string;
  password: string;
  zipCode: string;
  profilePic: string;
  id_surf_skill: number;
  favoriteSpot: string;
  createdDate: Date;
  id_departement: number;
  id_surf_style: number;
  wahine: boolean;
}
