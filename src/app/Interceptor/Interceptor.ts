import { Injectable, Injector } from "@angular/core";
import { HttpEvent,
        HttpInterceptor,
        HttpHandler,
        HttpRequest,
        HttpHeaders}
from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private injector:Injector) {}
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
      if(localStorage.getItem('token')){

      }
      let tokenStore = localStorage.getItem('token');
      let tokenData = tokenStore && JSON.parse(tokenStore);
      let token = tokenData;
      const headers = new HttpHeaders()
           .set("Authorization", "Bearer " + token);
      const AuthRequest = req.clone({headers: headers});
      return next.handle(AuthRequest);
    }
}
