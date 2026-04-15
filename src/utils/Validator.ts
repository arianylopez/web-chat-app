export class Validator {
  static patterns = {
    name: /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/, 
    login: /^(?!^\d+$)[a-zA-Z0-9_-]{3,20}$/, 
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/, 
    phone: /^\+?\d{10,15}$/,
    message: /^.+$/ 
  };

  static validate(inputName: string, inputValue: string): string | null {
    switch (inputName) {
      case 'first_name':
      case 'last_name':
        if (!this.patterns.name.test(inputValue)) {
          return 'Debe empezar con mayúscula. Sin espacios ni números.';
        }
        break;
      case 'login':
        if (!this.patterns.login.test(inputValue)) {
          return 'De 3 a 20 caracteres, sin espacios. No puede ser solo números.';
        }
        break;
      case 'email':
        if (!this.patterns.email.test(inputValue)) {
          return 'Debe ser un correo electrónico válido.';
        }
        break;
      case 'password':
      case 'oldPassword':
      case 'newPassword':
      case 'password_confirm':
        if (!this.patterns.password.test(inputValue)) {
          return 'De 8 a 40 caracteres, al menos una mayúscula y un número.';
        }
        break;
      case 'phone':
        if (!this.patterns.phone.test(inputValue)) {
          return 'Debe tener entre 10 y 15 números. Puede incluir un + inicial.';
        }
        break;
      case 'message':
        if (!this.patterns.message.test(inputValue)) {
          return 'El mensaje no puede estar vacío.';
        }
        break;
      default:
        if (inputValue.trim().length === 0) {
          return 'Este campo es obligatorio.';
        }
        break;
    }
    return null;
  }
}