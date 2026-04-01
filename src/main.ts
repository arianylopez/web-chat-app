import './styles/global.scss';
import './pages/auth/auth.scss';
import './pages/chat/chat.scss';
import Handlebars from 'handlebars';

import loginTemplateStr from './pages/auth/login.hbs?raw';
import registerTemplateStr from './pages/auth/register.hbs?raw';
import chatTemplateStr from './pages/chat/chat.hbs?raw';

const app = document.getElementById('app');

const loginTemplate = Handlebars.compile(loginTemplateStr);
const registerTemplate = Handlebars.compile(registerTemplateStr);
const chatTemplate = Handlebars.compile(chatTemplateStr);

const mockChats = [
  {
    name: 'Andrey',
    time: '12:00',
    lastMessage: 'I am so tired. The project is killing me...',
    unreadCount: 4,
    avatar: null 
  },
  {
    name: 'Kirill',
    time: 'Lun',
    lastMessage: 'Do you want to play a game?',
    unreadCount: null, 
    yourMessage: true, 
    avatar: null
  },
  {
    name: 'Sasha',
    time: 'Mar',
    lastMessage: 'See you later!',
    unreadCount: null,
    avatar: null
  }
];


function render(html: string) {
  if (app) {
    app.innerHTML = html;
    attachListeners();
  }
}

function attachListeners() {
  const btnGoToRegister = document.getElementById('go-to-register');
  const btnGoToLogin = document.getElementById('go-to-login');
  const loginForm = document.getElementById('login-form');

  if (btnGoToRegister) {
    btnGoToRegister.addEventListener('click', () => render(registerTemplate({})));
  }

  if (btnGoToLogin) {
    btnGoToLogin.addEventListener('click', () => render(loginTemplate({})));
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      render(chatTemplate({
        chats: mockChats,
        activeChat: null
      }));
    });
  }
}

render(loginTemplate({}));