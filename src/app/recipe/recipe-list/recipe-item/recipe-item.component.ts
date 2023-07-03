import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Recipe } from "../../../shared/recipe.model";

@Component({
  selector: "app-recipe-item",
  templateUrl: "./recipe-item.component.html",
  styleUrls: ["./recipe-item.component.css"]
})
export class RecipeItemComponent implements OnInit {
  @Input("recipeItems") recipeItems: Recipe;
  // constructor(private sendItemData: RecipeService) {}
  // @Output("storeItemData") storeItemData = new EventEmitter<Recipe>();
  ngOnInit() {
    console.log(this.recipeItems);
  }
  // sendData(getData: Recipe) {
  //   // this.storeItemData.emit();
  //   // this.sendItemData.changeShowInfo();
  //   //replacing this approach and sending data to service instead of using long chain of property input and output binding
  //   this.sendItemData.getRecipeItemInService.emit(getData);
  // }
}
