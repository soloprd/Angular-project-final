import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticationGuard } from "../auth/auth-guard.service";
import { recipeResolver } from "../shared/recipe-resolver.service";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeComponent } from "./recipe.component";
import { StartRecipesComponent } from "./start-recipes/start-recipes.component";
//path رو خالی میکنیم تا بتوانیم lazy loading را انجام دهیم 
const RecipRoutes: Routes = [
  {
    path: "",
    component: RecipeComponent,
    canActivate: [AuthenticationGuard],
    resolve: [recipeResolver],
    children: [
      { path: "", component: StartRecipesComponent },
      { path: "new", component: RecipeEditComponent },
      {
        path: ":id/:recipename/edit",
        component: RecipeEditComponent,
        resolve: [recipeResolver]
        // resolve:{message:recipeResolver}
      },
      {
        path: ":id/:name",
        component: RecipeDetailComponent,
        resolve: [recipeResolver]
        // resolve:{message:recipeResolver}
      }
    ]
  }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(RecipRoutes)],
  exports:[RouterModule]
})
export class RecipeRoutingModule {}
