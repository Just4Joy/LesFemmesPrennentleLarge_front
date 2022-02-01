export default interface ISession {
  id_session: number;
  name: string;
  date: string;
  nice_date: string;
  nice_time: string;
  spot_name: string;
  address: string;
  nb_hiki_max: number;
  id_department: number;
  id_surf_style: number;
  carpool: number;
  region_name: string | undefined;
  name_session: string | undefined;
  id_region: number | string;
  id_user: number;
}
