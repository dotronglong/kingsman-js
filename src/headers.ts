export default class Headers implements Map<string, string> {
  private _data: Map<string, string>;

  constructor(data?: object) {
    this._data = new Map();
    if (data) {
      for (let key of Object.keys(data)) {
        this.set(key, data[key]);
      }
    }
  }

  clear(): void {
    this._data.clear();
  }

  delete(key: string): boolean {
    return this._data.delete(key);
  }

  forEach(callbackfn: (value: string, key: string, map: Map<string, string>) => void, thisArg?: any): void {
    for (let [key, value] of this._data.entries()) {
      callbackfn(value, key, this._data);
    }
  }

  has(key: string): boolean {
    return this._data.has(key);
  }

  get size(): number {
    return this._data.size;
  }

  get [Symbol.toStringTag]() {
    return "Headers";
  }

  get data(): object {
    const data = {};
    for (let [key, value] of this._data.entries()) {
      data[key] = value;
    }
    return data;
  }

  set(key: string, value: string): this {
    this._data.set(this._key(key), value);
    return this;
  }

  get(key: string): string {
    return this._data.get(this._key(key)) || null;
  }

  private _key(key: string): string {
    const parts = key.split('-');
    for (let i = 0; i < parts.length; i++) {
      parts[i] = parts[i].toLowerCase();
      parts[i] = `${parts[i][0].toUpperCase()}${parts[i].substring(1, parts[i].length)}`;
    }

    return parts.join('-');
  }

  [Symbol.iterator](): IterableIterator<[string, string]> {
    return this._data.entries();
  }
  
  entries(): IterableIterator<[string, string]> {
    return this._data.entries();
  }
  
  keys(): IterableIterator<string> {
    return this._data.keys();
  }

  values(): IterableIterator<string> {
    return this._data.values();
  }
}