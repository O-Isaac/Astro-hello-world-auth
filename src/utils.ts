interface RestResponseProps {
  message: string;
  status: number;
  response?: Record<string, any>;
}

export class RestResponse {
  private message: string;
  private status: number;
  private response?: Record<string, any>;

  constructor({ message, response, status }: RestResponseProps) {
    this.message = message;
    this.response = response;
    this.status = status;
  }

  public getMessage() {
    return this.message;
  }

  public getStatus() {
    return this.status;
  }

  public getResponse() {
    return this.response;
  }

  public setMessage(message: string) {
    this.message = message;
  }

  public setStatus(status: number) {
    this.status = status;
  }

  public setResponse(response: Record<string, any>) {
    this.response = response;
  }

  public get rest(): Response {
    const body = JSON.stringify({
      status: this.status,
      message: this.message,
      response: this.response,
    });

    return new Response(body, { status: this.status });
  }
}
