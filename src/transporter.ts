import Request from "./request";
import Response from "./response";

export default interface Transporter {
  transport(request: Request): Promise<Response>
}