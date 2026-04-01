import './styles/global.scss';
import './pages/auth/auth.scss';
import './pages/chat/chat.scss';
import './pages/profile/profile.scss'; 
import Handlebars from 'handlebars';

import loginTemplateStr from './pages/auth/login.hbs?raw';
import registerTemplateStr from './pages/auth/register.hbs?raw';
import chatTemplateStr from './pages/chat/chat.hbs?raw';
import profileTemplateStr from './pages/profile/profile.hbs?raw';
import profileEditTemplateStr from './pages/profile/profile-edit.hbs?raw';
import profilePasswordTemplateStr from './pages/profile/profile-password.hbs?raw';

const app = document.getElementById('app');

const templates = {
  login: Handlebars.compile(loginTemplateStr),
  register: Handlebars.compile(registerTemplateStr),
  chat: Handlebars.compile(chatTemplateStr),
  profile: Handlebars.compile(profileTemplateStr),
  profileEdit: Handlebars.compile(profileEditTemplateStr),
  profilePassword: Handlebars.compile(profilePasswordTemplateStr),
};

const mockChats = [
  { name: 'Andrey', time: '12:00', lastMessage: 'I am so tired. The project is killing me...', unreadCount: 4 },
  { name: 'Kirill', time: 'Lun', lastMessage: 'Do you want to play a game?', yourMessage: true }
];

const mockUser = {
  first_name: 'Iván',
  avatar: null
};

const profileFields = [
  { label: 'Correo electrónico', name: 'email', type: 'email', value: 'pochta@gmail.com' },
  { label: 'Login', name: 'login', type: 'text', value: 'ivanivanov' },
  { label: 'Nombre', name: 'first_name', type: 'text', value: 'Iván' },
  { label: 'Apellido', name: 'last_name', type: 'text', value: 'Ivanov' },
  { label: 'Nombre en el chat', name: 'display_name', type: 'text', value: 'Iván' },
  { label: 'Teléfono Celular', name: 'phone', type: 'tel', value: '+591 7654321' }
];

const passwordFields = [
  { label: 'Antigua contraseña', name: 'oldPassword', type: 'password', placeholder: '••••••••' },
  { label: 'Nueva contraseña', name: 'newPassword', type: 'password', placeholder: '••••••••' },
  { label: 'Repita la nueva contraseña', name: 'confirmPassword', type: 'password', placeholder: '••••••••' }
];

function render(template: HandlebarsTemplateDelegate, context: any = {}) {
  if (app) {
    app.innerHTML = template(context);
    attachListeners();
  }
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

  document.getElementById('back-to-chat')?.addEventListener('click', () => {
    render(templates.chat, { chats: mockChats, activeChat: null });
  });

  document.getElementById('go-to-edit-profile')?.addEventListener('click', () => {
    render(templates.profileEdit, { user: mockUser, fields: profileFields });
  });

  document.getElementById('go-to-edit-password')?.addEventListener('click', () => {
    render(templates.profilePassword, { user: mockUser, passwordFields });
  });

  const backToProfileBtns = document.querySelectorAll('#back-to-profile');
  backToProfileBtns.forEach(btn => {
    btn.addEventListener('click', () => render(templates.profile, { user: mockUser, fields: profileFields }));
  });

  document.getElementById('edit-profile-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    render(templates.profile, { user: mockUser, fields: profileFields });
  });
  document.getElementById('edit-password-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    render(templates.profile, { user: mockUser, fields: profileFields });
  });
}

render(templates.login);