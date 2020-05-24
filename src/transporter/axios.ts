import axios, { AxiosResponse, Method } from 'axios';
import constants from '../constants';
import Headers from '../headers';
import Request from "../request";
import Response from "../response";
import Transporter from "../transporter";

export default class AxiosTransporter implements Transporter {
  transport(request: Request): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      axios({
        method: this.method(request),
        url: request.url,
        headers: request.headers.data,
        data: request.body || null
      }).then(response => resolve(this.response(response)))
      .catch(error => {
        if (error.response) {
          resolve(this.response(error.response));
        } else if (error.request) {
          reject(new Error("No responses found"));
        } else {
          reject(new Error(error.message));
        }
      });
    });
  }

  private method(request): Method {
    switch (request.method) {
      case constants.METHOD_GET:
        return 'get';
      case constants.METHOD_POST:
        return 'post';
      case constants.METHOD_PUT:
        return 'put';
      case constants.METHOD_PATCH:
        return 'patch';
      case constants.METHOD_DELETE:
        return 'delete';
      case constants.METHOD_HEAD:
        return 'head';
      case constants.METHOD_OPTIONS:
        return 'options';
      default:
        return 'get';
    }
  }

  private response(response: AxiosResponse<any>): Response {
    return new axiosResponse(response);
  }
}

class axiosResponse implements Response {
  statusCode: number;
  body: any;
  headers: Headers;

  constructor(response: AxiosResponse<any>) {
    this.statusCode = response.status;
    this.headers = new Headers(response.headers);
    this.body = response.data;
  }
}