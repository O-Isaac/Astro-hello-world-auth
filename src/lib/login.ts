type RestResponse = ResponseInit & {
  readonly headers: Headers;
};

export default class LoginUtils {
  private request: Request;
  private domain: string = "http://localhost:4321";
  private response: RestResponse;

  constructor(request: Request, response: RestResponse) {
    this.request = request;
    this.response = response;
  }

  private sendSignRequest(url: string, body: FormData) {
    return fetch(this.domain + url, { method: "POST", body });
  }

  private async proccedToSign(url: string) {
    const body = await this.request.formData();
    const request = await this.sendSignRequest(url, body);
    return [await request.json(), request.headers.getSetCookie()[0]];
  }

  public createErrorMessage(response: any[]) {
    const formatter = new Intl.ListFormat("en", {
      style: "long",
      type: "conjunction",
    });

    return formatter.format(
      response.map((el) => `${el.path[0]} ${el.message.toLowerCase()}`)
    );
  }

  public signIn() {
    return this.proccedToSign("/api/signin");
  }

  public singUp() {
    return this.proccedToSign("/api/signup");
  }

  public redirectTo(cookies: string, href: string) {
    this.response.status = 303;
    this.response.headers.append("set-cookie", cookies);
    this.response.headers.append("Location", href);
  }
}
