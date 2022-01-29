import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';

const errorData = (): void => {
  toast.warn('Email ou mot de passe incorrect');
};
const error = (): void => {
  toast.error(`Désolé, une erreur s'est produite.`);
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
  toast.error(`Aucun utilisateur correspondant.`);
};
const sessionNotFound = (): void => {
  toast.error(`Aucune session correspondante.`);
};
const alreadySubscribe = (): void => {
  toast.warn('Vous êtes déjà inscrite à la session.');
};
const notSubscribe = (): void => {
  toast.warn(`Vous n'êtes pas inscrite à la session.`);
};

export {
  alreadySubscribe,
  emailExist,
  error,
  errorData,
  errorValidation,
  notSubscribe,
  sessionNotFound,
  unauthorized,
  userNotFound,
};
