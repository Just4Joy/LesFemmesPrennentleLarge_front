
import { Dispatch, SetStateAction } from 'react';

export default interface IUser {
  id_user: number;
  firstname: string;
  lastname: string;
  city: string;
  email: string;
  password: string;
  zip_code: string;
  profile_pic: string;
  surf_skill: string;
  favorite_spot: string;
  created_date: Date;
  department: string;
  surf_style: string;
  wahine: boolean | number;
  desc: string;
  setActiveModal: Dispatch<SetStateAction<string>>;

}
