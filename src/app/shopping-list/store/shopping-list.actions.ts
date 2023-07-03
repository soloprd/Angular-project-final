import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

// export const ADD_INGREDIENT = "ADD_INGREDIENT";
// export const ADD_INGREDIENTS = "ADD_INGREDIENTS";
// export const UPDATE_INGREDIENTS = "UPDATE_INGREDIENTS";
// export const DELETE_INGREDIENTS = "DELETE_INGREDIENTS";
// export const START_EDIT = " START_EDIT";
// export const STOP_EDIT = " STOP_EDIT";
export const ADD_INGREDIENT = "[Shopping List] Add Ingredient";
export const ADD_INGREDIENTS = "[Shopping List] Add Ingredients";
export const UPDATE_INGREDIENTS = "[Shopping List] Update Ingredients";
export const DELETE_INGREDIENTS = "[Shopping List] Delete Ingredients";
export const START_EDIT = "[Shopping List] Start Edit";
export const STOP_EDIT = "[Shopping List] Stop Edit";
export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}
export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}
export class UpdateIngredients implements Action {
  readonly type = UPDATE_INGREDIENTS;
  constructor(public payload: Ingredient) {}
}
//برای هر دکمه ای که کلیک میکنیم یک اکشن حساب میشه)(update,delete,add,...)
export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENTS;
  // constructor(public payload: number) {} دیگر به این نیاز نداریم چون ایندکس رو داخل store داریم
}
export class StartEdit implements Action {
  readonly type = START_EDIT;
  constructor(public payload: number) {}
}
export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}
export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredients
  | DeleteIngredient
  | StartEdit
  | StopEdit;
