import EventEmitter from 'events';
import constants from './constants';
import Executor from './executor';
import { OnError, OnInit, OnReceive, OnSend } from './middleware';
import Registry from './registry';
import Replacer from './replacer';
import FactoryReplacer from './replacer/factory';
import Transporter from './transporter';
import AxiosTransporter from './transporter/axios';

export default class Kingsman {
  private _transporter: Transporter;
  private _replacer: Replacer;
  private _emitter: EventEmitter;
  private _registry: Registry;

  constructor(onInit?: OnInit, transporter?: Transporter, replacer?: Replacer) {
    this._transporter = transporter || new AxiosTransporter();
    this._replacer = replacer || new FactoryReplacer();
    this._emitter = new EventEmitter();
    this._registry = new Registry();
    if (onInit) {
      onInit(this._registry);
    }
  }

  public onSend(onSend: OnSend): this {
    this._emitter.on(constants.EVENT_SEND, onSend);
    return this;
  }

  public onReceive(onReceive: OnReceive): this {
    this._emitter.on(constants.EVENT_RECEIVE, onReceive);
    return this;
  }

  public onError(onError: OnError): this {
    this._emitter.on(constants.EVENT_ERROR, onError);
    return this;
  }

  make(name: string, parameters?: Object): Executor {
    return new Executor(
      this._registry.make(name),
      this._transporter,
      this._replacer,
      this._emitter,
      Object.assign({}, this._registry.parameters, parameters)
    );
  }
}