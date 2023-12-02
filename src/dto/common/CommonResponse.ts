export default class CommonResponse {
  status?: number;
  statusMessage?: string;
  body?: any;

  constructor(status: number, statusMessage: string, body: any) {
    this.status = status;
    this.statusMessage = statusMessage;
    this.body = body;
  }
}
