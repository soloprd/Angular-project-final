import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RecipeService } from "src/app/shared/recipe.service";
import { Recipe } from "../../shared/recipe.model";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editmode = false;
  recipeForm: FormGroup;
  ctrlsHandling: {
    ctrlNameValidity: boolean;
    ctrlAmountValidity: boolean;
    ctrlNameTouched: boolean;
    ctrlAmountTouched: boolean;
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  //this is for adding new input
  onAddIngredients() {
    (this.recipeForm.get("ingredient") as FormArray).controls.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9][0-9]*$/)
        ])
      })
    );
  }
  ngOnInit(): void {
    console.log(this.recipeForm);
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editmode = params["id"] != null;
      this.initForm();
    });
    // console.log(this.editmode);
    // this.controls2.forEach((value, i) => {
    //   const ctrlsErrors = {
    //     ctrlNameValidity: value.get("name").invalid,
    //     ctrlAmountValidity: value.get("amount").invalid,
    //     ctrlNameTouched: value.get("name").touched,
    //     ctrlAmountTouched: value.get("amount").touched
    //     // ctrlNameError:value.get('name').errors['required']? true:false,
    //     // ctrlAmountError:value.get('amount').errors['required']? true:false,
    //   };
    //   this.ctrlsHandling = ctrlsErrors;
    // });
    // console.log(
    //   this.ctrlsHandling.ctrlNameValidity,
    //   this.ctrlsHandling.ctrlAmountValidity,
    //   this.ctrlsHandling.ctrlAmountTouched,
    //   this.ctrlsHandling.ctrlNameTouched
    // );
  }
  // get controls2() {
  //   return (this.recipeForm.get("ingredient") as FormArray).controls;
  // }
  private initForm() {
    let recipes = {
      name: "",
      description: "",
      imagePath: "",
      ingredients: new FormArray([])
    };
    if (this.editmode) {
      const getRecipes = this.recipeService.getRecipe(this.id);
      recipes.name = getRecipes.name;
      recipes.description = getRecipes.description;
      recipes.imagePath = getRecipes.imagePath;
      if (getRecipes.ingredients) {
        for (let ingredient of getRecipes.ingredients) {
          recipes.ingredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,   
                Validators.pattern(/^[1-9][0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipes.name, Validators.required),
      imagePath: new FormControl(recipes["imagePath"], Validators.required),
      description: new FormControl(recipes.description, Validators.required),
      ingredient: recipes.ingredients
    });
  }
  get controls() {
    // a getter!
    return (this.recipeForm.get("ingredient") as FormArray).controls;
  }
  //
  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }
  onDeleteIngredientControls(index: number) {
    (this.recipeForm.get("ingredient") as FormArray).removeAt(index);
  }
  onSubmit() {
    console.log(this.recipeForm);
    if (this.editmode) {
      this.recipeService.updateRecipes(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipes(this.recipeForm.value);
    }
    this.onCancel();
  }
}
