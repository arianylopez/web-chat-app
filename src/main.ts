import './styles/global.scss';
import './pages/auth/auth.scss';
import Handlebars from 'handlebars';

import loginTemplateStr from './pages/auth/login.hbs?raw';
import registerTemplateStr from './pages/auth/register.hbs?raw';

const app = document.getElementById('app');

const loginTemplate = Handlebars.compile(loginTemplateStr);
const registerTemplate = Handlebars.compile(registerTemplateStr);

function render(html: string) {
  if (app) {
    app.innerHTML = html;
    attachListeners();
  }
}

function attachListeners() {
  const btnGoToRegister = document.getElementById('go-to-register');
  const btnGoToLogin = document.getElementById('go-to-login');

  if (btnGoToRegister) {
    btnGoToRegister.addEventListener('click', () => render(registerTemplate({})));
  }

  if (btnGoToLogin) {
    btnGoToLogin.addEventListener('click', () => render(loginTemplate({})));
  }
}

render(loginTemplate({}));