import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Subject, tap } from "rxjs";
import { Recipe } from "./recipe.model";
import { Ingredient } from "./ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { DataPostFetchService } from "./firebase-post-fetch.service";
@Injectable()
export class RecipeService {
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "Healthy foods",
  //     "Wholegrain foods usually have more fibre and nutrients.",
  //     "https://realfood.tesco.com/media/images/Anjalis-tikka-chicken-traybake-d9f43e15-2b54-41bc-b823-c206571b9861-0-1400x919.jpg",
  //     [new Ingredient("Stake", 2), new Ingredient("Joojeh", 1)]
  //   ),
  //   new Recipe(
  //     "High fat foods",
  //     "Crispy, crunchy and salty bacon, fresh, slightly acidic tomatoes.",
  //     "https://images.ctfassets.net/3vz37y2qhojh/563zYcMxwRjWxEwfTOxjca/333b9ad8e67413a7b74cce88ce2f21c1/Quick-and-Easy-Barbecue-Chicken_Naan_Pizzas-Hero-Horizontal-Olga-Ivanova.jpg?w=927&fit=fill&fm=webp",
  //     [new Ingredient("Pasta", 4), new Ingredient("Joojeh Negini", 3)]
  //   ),
  //   new Recipe(
  //     "vegetables",
  //     "The oldest recipe for these tasty treats can be found in the Boston Cooking School Cook Book, published in 1884.",
  //     "https://lh3.googleusercontent.com/p82p6mZjHu2Ch2XTBqw5s23-_60Fw84uzh0Fon-C1a5TvPxu7sPqfxsKBgHeYc9mx4kEJ7aEbbgOdQRBZKAMLz6UlRXmuzkjWg=w1667-h1250-c-rj-v1-e365",
  //     [new Ingredient("Kebab", 3), new Ingredient("Spreso", 2)]
  //   ),
  //   new Recipe(
  //     "diet food ",
  //     "Homemade American apple pie is a source of great pride, causing arguments about which apple variety is the most suitable for the best pies.",
  //     "https://img.delicious.com.au/AkbI2OQ5/w1200/del/2019/06/thai-spicy-chilli-basil-fried-rice-109651-2.jpg",
  //     [new Ingredient("kebab Vaziri", 5), new Ingredient("Ash", 3)]
  //   )
  // ];
  // constructor(private shoppingListService: ShoppingListService) {}
  // getRecipeItemInService = new EventEmitter<Recipe>(); we are not using this because we use routing params and id instead to get the data .
  private recipes: Recipe[] = [];
  showInfo = false;
  saveCopyOfRecipes = new Subject<Recipe[]>();

  fetchingData(fetchingFirebaseDataFromRecipeService: Recipe[]) {
    this.recipes = fetchingFirebaseDataFromRecipeService;
    this.saveCopyOfRecipes.next(this.recipes.slice());
  }

  showContent() {
    this.showInfo = true;
    console.log("status Changed!" + this.showInfo);
  }
  // ngOnInit(): void {
  //   this.getIngredients.subscribe((ingredientsItems: Ingredient[]) => {
  //     console.log(ingredientsItems);
  //     this.shoppingListService.getIngredientsFromRecipeService(ingredientsItems);
  //   });
  // }
  // getIngredients = new EventEmitter<Ingredient[]>();
  addRecipes(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.saveCopyOfRecipes.next(this.recipes.slice());
  }
  updateRecipes(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.saveCopyOfRecipes.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.saveCopyOfRecipes.next(this.recipes.slice());
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }
  getRecipes() {
    return this.recipes.slice();
  }
}
