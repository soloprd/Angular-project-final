import { User } from "../user.model";
import * as fromAuthActions from "./auth.actions";
export interface State {
  user: User;
}
let initialState: State = {
  user: null
};
export function authReducer(
  state: State = initialState,
  action: fromAuthActions.AuthActions
) {
  switch (action.type) {
    case fromAuthActions.LOGIN:
        //میتونستیم یوزر جدید رو تو اوس سرویس داخل هندل اوسنتیکیشن هم درست کنیم ولی داده هاش رو دیسپچ کرد و یوزر جدید رو اینجا درست کرد
      const user = new User(
        action.payload.email,
        action.payload.localId, 
        action.payload.tokenId,
        action.payload.tokenExpiration
      );
      return {
        ...state,
        user: user
      };
    case fromAuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };  
    default:
      return state;
  }
}
