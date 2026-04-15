import { Block } from '../../utils/Block';
import template from './button.hbs?raw';
import Handlebars from 'handlebars';

interface ButtonProps extends Record<string, unknown> {
  label: string;
  type?: 'primary' | 'link' | 'danger';
  events?: {
    click: (e: Event) => void;
  };
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super('div', props); 
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this.props);
  }
}