import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";
import { Store } from "@ngrx/store";
import * as fromAppReducer from "../store/app.reducer";
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private store:Store<fromAppReducer.AppState>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler 
  ): Observable<HttpEvent<any>> {
    //interceptor توکن رو برای تمامی درخواست های اچ تی تی پی ارسال میکنه دیگه نمیخواد دستی دونهدونه برای هر درخواست توکن اضافه کنی
    //اگر  کاربر در لوکال استورج ذخیره شود به معنی اوسنتیکیت شده است پس اوسنتیکیت تورو است.
    return this.store.select("auth").pipe(
      take(1), 
      map(authState=>{
        return authState.user
      }),
      exhaustMap(user => {
        console.log(user)    
        if (!user) {
          return next.handle(req);
        }
        let modifiedRequest = req.clone({
          params: new HttpParams().set("auth", user._token)
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
