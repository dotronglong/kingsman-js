import Registry from "./registry";
import Request from "./request";
import Response from "./response";

type OnInit = (registry: Registry) => void;
type OnSend = (request: Request) => void;
type OnReceive = (request: Request, response: Response) => void;
type OnError = (request: Request, error: any) => void;

export { OnInit, OnSend, OnReceive, OnError };

