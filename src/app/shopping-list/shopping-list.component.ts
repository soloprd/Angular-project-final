import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
// import { ShoppingListService } from "../shared/shopping-list.service";
// import * as fromShoppingListReducer from "../shopping-list/store/shopping-list.reducer";
import * as shoppingListActions from "../shopping-list/store/shopping-list.actions";
import * as appReducer from "../store/app.reducer";
@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients: Ingredient[] = [
  //   new Ingredient("Apple", 5),
  //   new Ingredient("Orange", 10)
  // ];
  constructor(
    // private slService: ShoppingListService,
    private store: Store<appReducer.AppState>
  ) {}
  // ingredients: Ingredient[];
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  private shoppingSub: Subscription;
  ngOnInit() {
    this.ingredients = this.store.select("shoppingList");

    console.log(
      this.ingredients.subscribe(data => {
        console.log(data);
      })
    );
    // this.ingredients = this.slService.getIngredients();
    // this.shoppingSub = this.slService.saveEventData.subscribe(
    //   (data: Ingredient[]) => {
    //     this.ingredients = data;
    //   }
    // );
  }
  onEdit(index: number) {
    // this.slService.getIndex.next(index);
    this.store.dispatch(new shoppingListActions.StartEdit(index));
  }
  ngOnDestroy(): void {
    this.shoppingSub.unsubscribe();
  }
  // spread(event: Ingredient) {
  //   this.ingredients.push(event);
  // }
}
