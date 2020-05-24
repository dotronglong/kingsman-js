import constants from "./constants";
import Request from "./request";

type registryItem = {
  method: string,
  url: string
}

export default class Registry {
  private _data: Map<string, registryItem>;
  public parameters: object;

  constructor() {
    this._data = new Map();
    this.parameters = {};
  }

  private add(name: string, method: string, url: string): this {
    this._data.set(name, { method, url });
    return this;
  }

  private remove(name: string) : this {
    this._data.delete(name);
    return this;
  }

  public make(name: string) : Request {
    if (!this._data.has(name)) {
      return null;
    }
    const item = this._data.get(name);
    return new Request(name, item.method, item.url);
  }

  public GET(name: string, url: string): this {
    return this.add(name, constants.METHOD_GET, url);
  }

  public POST(name: string, url: string): this {
    return this.add(name, constants.METHOD_POST, url);
  }

  public PUT(name: string, url: string): this {
    return this.add(name, constants.METHOD_PUT, url);
  }

  public PATCH(name: string, url: string): this {
    return this.add(name, constants.METHOD_PATCH, url);
  }

  public DELETE(name: string, url: string): this {
    return this.add(name, constants.METHOD_DELETE, url);
  }

  public OPTIONS(name: string, url: string): this {
    return this.add(name, constants.METHOD_OPTIONS, url);
  }

  public HEAD(name: string, url: string): this {
    return this.add(name, constants.METHOD_HEAD, url);
  }
}