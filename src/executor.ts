import EventEmitter from 'events';
import constants from './constants';
import { OnError, OnReceive, OnSend } from './middleware';
import Replacer from './replacer';
import Request from './request';
import Response from './response';
import Transporter from './transporter';

export default class Executor {
  private _transporter: Transporter;
  private _replacer: Replacer;
  private _emitter: EventEmitter;
  private _request: Request;
  private _onSend: OnSend;
  private _onReceive: OnReceive;
  private _onError: OnError;
  private _parameters: Object;

  constructor(request: Request, transporter: Transporter, replacer: Replacer, emitter: EventEmitter, parameters: Object) {
    if (!transporter || !replacer || !emitter) {
      throw new Error("transporter, replacer and emitter must not be null");
    }
    this._request = request;
    this._transporter = transporter;
    this._replacer = replacer;
    this._emitter = emitter;
    this._parameters = parameters || {};
  }

  public onSend(onSend: OnSend): this {
    this._onSend = onSend;
    return this;
  }

  public onReceive(onReceive: OnReceive): this {
    this._onReceive = onReceive;
    return this;
  }

  public onError(onError: OnError): this {
    this._onError = onError;
    return this;
  }

  public send(): Promise<Response> {
    return new Promise<Response>(async (resolve, reject) => {
      if (!this._request) {
        return reject(new Error("Request could not be found"));
      }
      try {
        if (this._onSend) {
          this._onSend(this._request);
        }
        await this._emitter.emit(constants.EVENT_SEND, this._request);

        let url = this._request.url;
        url = this._replacer.replace(url, this._parameters);
        const query = this._request.query.toString();
        if (query !== "") {
          url = `${url}?${query}`;
        }
        this._request = new Request(
          this._request.name,
          this._request.method,
          url,
          this._request.query,
          this._request.headers,
          this._request.attributes
        );

        try {
          const response = await this._transporter.transport(this._request);
          await this._emitter.emit(constants.EVENT_RECEIVE, this._request, response);
          if (this._onReceive) {
            this._onReceive(this._request, response);
          }
          resolve(response);
        } catch (e) {
          await this._emitter.emit(constants.EVENT_ERROR, this._request, e);
          if (this._onError) {
            this._onError(this._request, e);
          }
          reject(e);
        }
      } catch (e) {
        reject(e);
      }
    });
  }
}