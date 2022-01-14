export default interface ISession {
  id_session: number;
  name: string;
  date: string;
  nice_date: string;
  nice_time: string;
  spot_name: string;
  adress: string;
  nb_hiki_max: number;
  id_departement: number;
  id_surf_style: number;
  carpool: number;
  region_name: string;
  name_session: string;
  id_region: number | string;
}
