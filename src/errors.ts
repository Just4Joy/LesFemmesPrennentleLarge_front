import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';

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

const unauthorized = (): void => {
  toast.warn('Non autorisé. Veuillez vous connecter.');
};
const userNotFound = (): void => {
  toast.error(`Aucuns utilisateurs correspondants.`);
};

export { emailExist, error, errorData, errorValidation, unauthorized, userNotFound };
