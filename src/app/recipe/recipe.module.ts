import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/sharedModule/shared.module";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeRoutingModule } from "./recipe-routing.module";
import { RecipeComponent } from "./recipe.component";
import { StartRecipesComponent } from "./start-recipes/start-recipes.component";
//در اینجا export کردن لازم نیست چون در approutingModule 
@NgModule({
  declarations: [
    RecipeComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    StartRecipesComponent,
    RecipeEditComponent
  ],
  imports: [RouterModule, ReactiveFormsModule, SharedModule,RecipeRoutingModule],
  // exports:[
  //   RecipeComponent,
  //   RecipeDetailComponent,
  //   RecipeListComponent,
  //   RecipeItemComponent,
  //   StartRecipesComponent,
  //   RecipeEditComponent    
  // ],
  providers: []
})
export class RecipeModule {}
