import { Eventing } from './Eventing';
import { Attributes } from './Attributes';
import { ApiSync } from './ApiSync';

interface ModelAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync {}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

export class Model {}
