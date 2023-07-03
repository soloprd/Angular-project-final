import { ActionReducerMap } from "@ngrx/store";
import * as fromShoppingListReducer from "../shopping-list/store/shopping-list.reducer";
import * as fromAuthReducer from "../auth/store/auth.reducer";

export interface AppState {
  shoppingList: fromShoppingListReducer.State;
  auth: fromAuthReducer.State;
}

export let appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingListReducer.shoppingListReducer,
  auth: fromAuthReducer.authReducer
};
