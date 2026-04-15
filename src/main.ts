import './styles/global.scss';
import './pages/auth/auth.scss';
import './pages/chat/chat.scss';
import './pages/profile/profile.scss';
import './components/modal/modal.scss'; 
import './pages/error/error.scss';     
import Handlebars from 'handlebars';

import loginTemplateStr from './pages/auth/login.hbs?raw';
import registerTemplateStr from './pages/auth/register.hbs?raw';
import chatTemplateStr from './pages/chat/chat.hbs?raw';
import profileTemplateStr from './pages/profile/profile.hbs?raw';
import profileEditTemplateStr from './pages/profile/profile-edit.hbs?raw';
import profilePasswordTemplateStr from './pages/profile/profile-password.hbs?raw';
import avatarModalTemplateStr from './components/modal/avatar-modal.hbs?raw';
import errorTemplateStr from './pages/error/error.hbs?raw';

const app = document.getElementById('app');

const templates = {
  login: Handlebars.compile(loginTemplateStr),
  register: Handlebars.compile(registerTemplateStr),
  chat: Handlebars.compile(chatTemplateStr),
  profile: Handlebars.compile(profileTemplateStr),
  profileEdit: Handlebars.compile(profileEditTemplateStr),
  profilePassword: Handlebars.compile(profilePasswordTemplateStr),
  avatarModal: Handlebars.compile(avatarModalTemplateStr),
  error: Handlebars.compile(errorTemplateStr)
};

const mockChats = [
  { name: 'Andrey', time: '12:00', lastMessage: 'I am so tired. The project is killing me...', unreadCount: 4 },
  { name: 'Kirill', time: 'Lun', lastMessage: 'Do you want to play a game?', yourMessage: true }
];

const mockUser = { first_name: 'Iván', avatar: null };

const profileFields = [
  { label: 'Correo electrónico', name: 'email', type: 'email', value: 'pochta@gmail.com' },
  { label: 'Login', name: 'login', type: 'text', value: 'ivanivanov' },
  { label: 'Nombre', name: 'first_name', type: 'text', value: 'Iván' },
  { label: 'Apellido', name: 'last_name', type: 'text', value: 'Ivanov' },
  { label: 'Nombre en el chat', name: 'display_name', type: 'text', value: 'Iván' },
  { label: 'Teléfono Celular', name: 'phone', type: 'tel', value: '+591 7654321' }
];

const passwordFields = [
  { label: 'Antigua contraseña', name: 'oldPassword', type: 'password', placeholder: '' },
  { label: 'Nueva contraseña', name: 'newPassword', type: 'password', placeholder: '' },
  { label: 'Repita la nueva contraseña', name: 'confirmPassword', type: 'password', placeholder: '' }
];

let modalState = {
  title: 'Cargar archivo',
  fileName: null as string | null,
  isError: false,
  errorText: null as string | null
};

function render(template: HandlebarsTemplateDelegate, context: Record<string, unknown> = {}) {
  if (app) {
    app.innerHTML = template(context);
    attachListeners();
  }
}

function renderModal() {
  const modalContainer = document.getElementById('modal-root') || document.createElement('div');
  modalContainer.id = 'modal-root';
  modalContainer.innerHTML = templates.avatarModal(modalState);
  document.body.appendChild(modalContainer);

  document.getElementById('avatar-modal-backdrop')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      document.body.removeChild(modalContainer);
      resetModalState();
    }
  });

  const fileInput = document.getElementById('avatar-input') as HTMLInputElement;
  fileInput?.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      modalState = {
        title: 'Archivo cargado',
        fileName: target.files[0].name,
        isError: false,
        errorText: null
      };
      renderModal(); 
    }
  });

  document.getElementById('avatar-upload-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!modalState.fileName) {
      modalState = {
        title: 'Error, intente de nuevo',
        fileName: null,
        isError: true,
        errorText: 'Es necesario seleccionar un archivo'
      };
      renderModal();
    } else {
      document.body.removeChild(modalContainer);
      resetModalState();
    }
  });
}

function resetModalState() {
  modalState = { title: 'Cargar archivo', fileName: null, isError: false, errorText: null };
}

function attachListeners() {
  document.getElementById('go-to-register')?.addEventListener('click', () => render(templates.register));
  document.getElementById('go-to-login')?.addEventListener('click', () => render(templates.login));
  document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    render(templates.chat, { chats: mockChats, activeChat: null });
  });

  document.getElementById('go-to-profile')?.addEventListener('click', (e) => {
    e.preventDefault();
    render(templates.profile, { user: mockUser, fields: profileFields });
  });
  
  const backToChatBtns = document.querySelectorAll('#back-to-chat');
  backToChatBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      render(templates.chat, { chats: mockChats, activeChat: null });
    });
  });

  document.getElementById('go-to-edit-profile')?.addEventListener('click', () => render(templates.profileEdit, { user: mockUser, fields: profileFields }));
  document.getElementById('go-to-edit-password')?.addEventListener('click', () => render(templates.profilePassword, { user: mockUser, passwordFields }));
  
  const backToProfileBtns = document.querySelectorAll('#back-to-profile');
  backToProfileBtns.forEach(btn => btn.addEventListener('click', () => render(templates.profile, { user: mockUser, fields: profileFields })));

  const avatarElements = document.querySelectorAll('.profile-layout__avatar');
  avatarElements.forEach(avatar => {
    avatar.addEventListener('click', () => renderModal());
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === '4') render(templates.error, { code: '404', message: 'No encontrado' });
    if (e.key === '5') render(templates.error, { code: '500', message: 'Ya lo estamos solucionando' });
  });
}

render(templates.login);