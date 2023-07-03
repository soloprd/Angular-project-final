import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "./ingredient.model";
import { Store } from "@ngrx/store";
import * as shoppingListActions from "../shopping-list/store/shopping-list.actions";
import * as fromShoppingListReducer from "../shopping-list/store/shopping-list.reducer";
import * as appReducer from "../store/app.reducer";

@Injectable({
  providedIn: "root"
})
export class ShoppingListService {
  // saveEventData = new EventEmitter<Ingredient[]>();
  constructor(private store: Store<appReducer.AppState>) {}
  saveEventData = new Subject<Ingredient[]>();
  getIndex = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient("Apple", 5),
    new Ingredient("Orange", 10)
  ];
  updatingItem(index: number, newIngredient) {
    this.ingredients[index] = newIngredient;
    this.saveEventData.next(this.ingredients.slice());
  }
  getIngredients() {
    return this.ingredients.slice();
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.saveEventData.next(this.ingredients.slice());
  }
  getItemIndex(Index: number) {
    return this.ingredients[Index];
  }
  sendIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    //pass a copy of ingredients with slice method in saveEventData and then subscribe that out of this service.
    this.saveEventData.next(this.ingredients.slice());
  }
  // getIngredientsFromRecipeService(ingredientItems: Ingredient[]) {
  //   this.saveIngredients = ingredientItems;
  // }
  getIngredientsFromDetail(recieveIngredients: Ingredient[]) {
    // for (let item of recieveIngredients) {
    //   this.ingredients.push(item);
    // }
    // this.ingredients.push(...recieveIngredients);
    // this.saveEventData.next(this.ingredients.slice());
    this.store.dispatch(
      new shoppingListActions.AddIngredients(recieveIngredients)
    );
  }
}
