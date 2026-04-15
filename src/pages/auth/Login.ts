import { Block } from '../../utils/Block';
import { Input } from '../../components/input/Input';
import { Button } from '../../components/button/Button';
import template from './login.hbs?raw';
import Handlebars from 'handlebars';

export class LoginPage extends Block {
  constructor() {
    super('div', {});
  }

  protected init() {
    this.children.loginInput = new Input({
      label: 'Login',
      name: 'login',
      type: 'text',
      placeholder: 'ivanivanov',
    });

    this.children.passwordInput = new Input({
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: '••••••••••••',
    });

    this.children.submitBtn = new Button({
      label: 'Iniciar sesión',
      type: 'primary',
      events: {
        click: (e: Event) => this.onSubmit(e),
      },
    });

    this.children.registerLink = new Button({
      label: '¿No tienes una cuenta?',
      type: 'link',
      events: {
        click: (e: Event) => {
          e.preventDefault();
          console.log('Navegar a Registro');
        },
      },
    });
  }

  private onSubmit(e: Event) {
    e.preventDefault();

    const loginInput = this.children.loginInput as Input;
    const passwordInput = this.children.passwordInput as Input;

    const isLoginValid = loginInput.validate();
    const isPasswordValid = passwordInput.validate();

    if (isLoginValid && isPasswordValid) {
      const formData = {
        [loginInput.getName()]: loginInput.getValue(),
        [passwordInput.getName()]: passwordInput.getValue(),
      };

      console.log('--- Datos del Formulario Recolectados ---');
      console.log(formData);
      
      alert('Login exitoso. Revisa la consola.');
    } else {
      console.warn('Formulario inválido');
    }
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this.props);
  }
}