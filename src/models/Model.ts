import { AxiosPromise } from 'axios';

interface ModelAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

type Callback = () => void;
interface Events {
  on(eventName: string, Callback): void;
  trigger(eventName: string): void;
}

export class Model {}
