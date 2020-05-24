import Replacer from "../replacer";

export default class FactoryReplacer implements Replacer {
  private _markerStart: string = '{{';
  private _markerStop: string = '}}';

  constructor(markerStart?: string, markerStop?: string) {
    if (markerStart !== undefined) this._markerStart = markerStart;
    if (markerStop !== undefined) this._markerStop = markerStop;
  }

  replace(text: string, parameters: object): string {
    if (parameters === null) {
      return text;
    }
    
    let result: string = text;
    Object.keys(parameters).forEach(key => {
      result = result.replace(`${this._markerStart}${key}${this._markerStop}`, parameters[key]);
    });
    
    return result;
  }
}