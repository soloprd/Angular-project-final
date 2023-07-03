import { Action } from "@ngrx/store";

export const LOGIN = "[Auth] Login";
export const LOGOUT = "[Auth] LogOut";
export class Login implements Action {
  readonly type = LOGIN;
  constructor(
    public payload: {
      email: string;
      localId: string;
      tokenId: string;
      tokenExpiration: Date;
    }
  ) {}
}
export class LogOut implements Action { 
  readonly type = LOGOUT;
}

export type AuthActions = Login | LogOut;
