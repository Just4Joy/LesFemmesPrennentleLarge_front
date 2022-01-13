export default interface IUser {
  id_user: number;
  firstname: string;
  lastname: string;
  city: string;
  email: string;
  password: string;
  zip_code: string;
  profile_pic: string;
  id_surf_skill: string;
  favorite_spot: string;
  created_date: Date;
  id_departement: string;
  id_surf_style: string;
  wahine: boolean | number;
  desc: string;
}
