import Headers from "./headers";
import Query from "./query";

export default class Request {
  private _name: string;
  private _url: string;
  private _method: string
  private _attributes: Map<string, any>;
  private _query: Query;
  private _headers: Headers;
  public body: any;

  constructor(name: string, method: string, url: string, query?: Query, headers?: Headers, attributes?: Map<string, any>) {
    this._name = name;
    this._url = url;
    this._method = method.toLowerCase();
    this._attributes = attributes || new Map();
    this._query = query || new Query();
    this._headers = headers || new Headers();
  }

  get name(): string {
    return this._name;
  }

  get url(): string {
    return this._url;
  }

  get method(): string {
    return this._method;
  }

  get attributes(): Map<string, any> {
    return this._attributes;
  }

  get query(): Query {
    return this._query;
  }

  get headers(): Headers {
    return this._headers;
  }
}