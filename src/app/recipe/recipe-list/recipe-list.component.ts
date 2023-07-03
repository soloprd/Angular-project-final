import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Recipe } from "../../shared/recipe.model";
import { RecipeService } from "src/app/shared/recipe.service";
@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit {
  @Output("levelUpToRecipe") levelUpToRecipe = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    // new Recipe(
    //   'healthy foods',
    //   'Wholegrain foods usually have more fibre and nutrients.',
    //   'https://realfood.tesco.com/media/images/Anjalis-tikka-chicken-traybake-d9f43e15-2b54-41bc-b823-c206571b9861-0-1400x919.jpg'
    // ),
    // new Recipe(
    //   'hight fat foods',
    //   'Crispy, crunchy and salty bacon, fresh, slightly acidic tomatoes.',
    //   'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/chicken_lasagne_79722_16x9.jpg'
    // ),
    // new Recipe(
    //   'vegetables',
    //   'The oldest recipe for these tasty treats can be found in the Boston Cooking School Cook Book, published in 1884.',
    //   'https://lh3.googleusercontent.com/p82p6mZjHu2Ch2XTBqw5s23-_60Fw84uzh0Fon-C1a5TvPxu7sPqfxsKBgHeYc9mx4kEJ7aEbbgOdQRBZKAMLz6UlRXmuzkjWg=w1667-h1250-c-rj-v1-e365'
    // ),
    // new Recipe(
    //   'diet food ',
    //   'Homemade American apple pie is a source of great pride, causing arguments about which apple variety is the most suitable for the best pies.',
    //   'https://www.foodandwine.com/thmb/M9DskxnSBALpjQXY8xLGqrfsEFA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/california-wappa-rice-bowls-FT-RECIPE0420-2f5e0ff842024375b335ccb0e06741a8.jpg'
    // ),
  ];
  constructor(private recipeService: RecipeService) {}
  ngOnInit(): void {
    this.recipeService.saveCopyOfRecipes.subscribe(
      (recipeSliceCopyFromSubjectEmmitter: Recipe[]) => {
        this.recipes = recipeSliceCopyFromSubjectEmmitter;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }
  sendDataUp() {
    this.levelUpToRecipe.emit();
  }
}
