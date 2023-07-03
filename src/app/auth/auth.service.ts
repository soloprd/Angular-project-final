import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  catchError,
  tap,
  map,
  throwError,
  Subject,
  BehaviorSubject
} from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "./user.model";
import { Store } from "@ngrx/store";
import * as AppReducer from "../store/app.reducer";
import * as AuthActions from "../auth/store/auth.actions";
interface signAndLoginUpDataType {
  email: string;
  password: string;
  returnSecureToken: boolean;
}
export interface responseDataa {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({ providedIn: "root" })
export class AuthService implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<AppReducer.AppState>
  ) {}
  private expirationTimer: any;
  // storeUser = new BehaviorSubject<User>(null);
  ngOnInit() {
    // console.log(this.storeUser);
  }
  signUp(signUpData: signAndLoginUpDataType) {
    return this.http
      .post<responseDataa>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
          environment.firebaseApiKey,
        signUpData
      )
      .pipe(
        tap(resData => {
          this.HandleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        }),
        catchError(this.HandleError)
      );
    // map(responseData => {
    //   if (responseData) {
    //     return ".اطلاعات با موفقیت ثبت شد";
    //   }
    // }),
  }
  login(loginData: signAndLoginUpDataType) {
    return this.http
      .post<responseDataa>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          environment.firebaseApiKey,
        loginData
      )
      .pipe(
        tap(resData => {
          this.HandleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        }),
        catchError(this.HandleError)
      );
  }
  logOut() {
    // this.storeUser.next(null);
    this.store.dispatch(new AuthActions.LogOut());
    this.router.navigate(["/auth"]);
    localStorage.removeItem("authState");
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
    }
    this.expirationTimer = null;
  }
  autoLogOut(expirationTimerInMiliSec: number) {
    //فانشن اتو لاگ اوت در داخل کامپوننت اپ کال شده بنابراین در پس زمینه در حال شمارش است اگر کاربر دستی لاگ اوت کند باید باید ست تایک اوت را نیز کلییر تایم اوت کند.
    //اگر کاربر دستی لاگ اوت کند ست تایم اوت سرجاش باقی میماند پس باید وقتی کاربر کلییر تایم اوت کرد تایمر هم پاک شود.
    this.expirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationTimerInMiliSec);
  }
  autoLogin() {
    //میخواد ببینه کاربر در لوکال استورج وجود داره یا نه
    const userData: {
      email: string;
      localId: string;  
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("authState"));
    if (!userData) {
      return;
    }
    //زمان اتمام تایم توکن را که استرینگ است داخل آبجکت نیو دیت قرار میدهیم سپس با متد گت تایم آن را به میلی ثانیه تبدیل میکنیم منهای تایم فعلی که باز با متد گت تایم به میلی ثانیه تبدیل کردیم میکنیم.
    const newUser = new User(
      userData.email,
      userData.localId,
      userData._token,
      new Date(userData._tokenExpirationDate)
    ); 
    //if new .token method is valid has expiration date for future so we can emit newUser and store it Subject.
    if (newUser.token) {
      // this.storeUser.next(newUser);
      this.store.dispatch(
        new AuthActions.Login({
          email: userData.email,
          localId: userData.localId,     
          tokenId: userData._token,  
          tokenExpiration: new Date(userData._tokenExpirationDate) 
        })
      );
      const timer =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime(); //اول تایم انقضا رو که رشته هست به فرم نیو دیت آبجکت تبدیل میکنیم به میلی ثانیه بعدش منهای تاری و زمان فعلی به میلی ثانیه تا زمان باقی موندهی انقضای توکن رو به دست بیاریم.
      console.log(timer);
      this.autoLogOut(timer);
    }
  }
  private HandleAuthentication(
    email: string,
    localId: string,
    tokenId: string,
    tokenExpiresIn: number
  ) {
    const tokenExpiration = new Date(
      new Date().getTime() + tokenExpiresIn * 1000
    );
    // console.log( typeof new Date(new Date().getTime() + tokenExpiresIn * 1000));
    const user = new User(email, localId, tokenId, tokenExpiration);
    console.log(user);
    // this.storeUser.next(user);
    //میفرستیم تو ریدوسر یک یوسر آبجکت جدید درست میکنیم به جای اینجا
    this.store.dispatch(
      new AuthActions.Login({
        email: email,
        localId: localId,
        tokenId: tokenId,
        tokenExpiration: tokenExpiration
      })
    );
    this.autoLogOut(tokenExpiresIn * 1000); //change to millisecond
    localStorage.setItem("authState", JSON.stringify(user));
  }

  private HandleError(errorRes: HttpErrorResponse) {
    console.log(errorRes);
    let errorMessage = ".خطایی رخ داده لطفا اتصال به اینترنت را بررسی کنید!";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = ".این ایمیل و رمز عبور قبلا ثبت شده است";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = ".آدرس ایمیل اشتباه است";
        break;
      case "INVALID_PASSWORD":
        errorMessage = ".رمز عبور اشتباه است";
    }
    return throwError(() => new Error(errorMessage));
  }
}
