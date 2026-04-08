export type Listener<T extends any[] = any[]> = (...args: T) => void;

export class EventBus {
  private listeners: Record<string, Listener[]> = {};

  public on(event: string, callback: Listener): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  public off(event: string, callback: Listener): void {
    if (!this.listeners[event]) {
      throw new Error(`No hay evento: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  public emit(event: string, ...args: any[]): void {
    if (!this.listeners[event]) {
      throw new Error(`No hay evento: ${event}`);
    }

    this.listeners[event].forEach(function (listener) {
      listener(...args);
    });
  }
}