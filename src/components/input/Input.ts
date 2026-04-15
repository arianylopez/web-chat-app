import { Block } from '../../utils/Block';
import { Validator } from '../../utils/Validator';
import template from './input.hbs?raw';
import Handlebars from 'handlebars';

interface InputProps extends Record<string, unknown> {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  errorText?: string | null;
  events?: {
    blur?: (e: Event) => void;
    focus?: (e: Event) => void;
  };
}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super('div', {
      ...props,
      type: props.type || 'text',
      value: props.value || '',
      errorText: props.errorText || null,
      events: {
        ...(props.events as Record<string, unknown>),
        blur: (e: Event) => {
          this.validate();
          if (props.events?.blur) props.events.blur(e);
        }
      }
    });
  }

  public validate(): boolean {
    const inputEl = this.element?.querySelector('input') as HTMLInputElement;
    if (!inputEl) return false;

    const value = inputEl.value;
    const errorMsg = Validator.validate(this.props.name as string, value);

    this.setProps({ 
      value: value,
      errorText: errorMsg 
    });

    return errorMsg === null;
  }

  public getValue(): string {
    const inputEl = this.element?.querySelector('input') as HTMLInputElement;
    return inputEl ? inputEl.value : (this.props.value as string) || '';
  }

  public getName(): string {
    return this.props.name as string;
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this.props);
  }
}