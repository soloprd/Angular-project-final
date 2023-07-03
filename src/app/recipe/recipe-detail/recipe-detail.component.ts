import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RecipeService } from "src/app/shared/recipe.service";
import { ShoppingListService } from "src/app/shared/shopping-list.service";
import { Recipe } from "../../shared/recipe.model";
@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"]
})
export class RecipeDetailComponent implements OnInit {
  // @Input("recievedData") recievedData: Recipe;
  recievedData: Recipe;
  id: number;
  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    console.log(this.recievedData);
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.recievedData = this.recipeService.getRecipe(this.id);
    });
    const data = this.route.snapshot.data;
    console.log(data);
  }
  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(["/recipes"]);
  }
  showCon = false;
  sendIngredients() {
    this.shoppingListService.getIngredientsFromDetail(
      this.recievedData.ingredients
    );
  }
  // onEdit() {
  //   // this.router.navigate(["edit"], { relativeTo: this.route });
  //   this.router.navigate(["../", this.id, "edit"], { relativeTo: this.route });
  // }
}
