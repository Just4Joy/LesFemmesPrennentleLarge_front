import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const errorData = (): void => {
  toast.warn('Email ou mot de passe incorrect');
};
const error = (): void => {
  toast.error(`Désolé, une erreur c'est produite.`);
};
const errorValidation = (): void => {
  toast.warn('Données invalides.');
};
const emailExist = (): void => {
  toast.warn(`L'email est déjà utilisé.`);
};

export { error, errorData, errorValidation, emailExist };
