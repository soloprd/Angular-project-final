import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../shared/recipe.model";
import { RecipeService } from "../shared/recipe.service";
@Component({
  selector: "app-recipe",
  templateUrl: "./recipe.component.html",
  styleUrls: ["./recipe.component.css"]
  // providers: [RecipeService]
  //we should provide RecipeService in app module file because when we back to recipe list page from shopping list page the new recipe we added is destroyed!
})
export class RecipeComponent implements OnInit {
  finalDataObject: Recipe;
  // showInfo: boolean = false;
  // storeDataInRecipe() {
  //   // this.finalDataObject = finalData;
  //   if (this.finalDataObject !== null) {
  //     this.showInfo = true;
  //   }
  // }
  constructor(private getRecipeItem: RecipeService) {}
  ngOnInit(): void {
    // this.getRecipeItem.getRecipeItemInService.subscribe((itemData: Recipe) => {
    //   this.finalDataObject = itemData;
    // });
  }
}
