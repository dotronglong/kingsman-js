import Headers from "./headers";

export default interface Response {
  readonly statusCode: number;
  readonly body: any;
  readonly headers: Headers;
}