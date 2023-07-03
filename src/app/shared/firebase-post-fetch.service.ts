import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";
@Injectable({ providedIn: "root" })
export class DataPostFetchService {
  constructor(
    private getRecipeService: RecipeService,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.fetchRecipes();
  }
  storeRecievedDataFromRecipeService() {
    const recipes = this.getRecipeService.getRecipes();
    this.http
      .put(
        "https://recipes-80452-default-rtdb.firebaseio.com/recipes.json",
        recipes
      ) 
      .subscribe(Response => console.log(Response));
  }
  fetchRecipes() {
    //we combine two observable(user,htt)into one big observable and also with take operator we say that we only get one user value object and then it will automatically unsubscribe that.
    //first user observable will complete then http observable will replace.
    //here we use token inside query parameter and send that with request body.

    //we do these things in httinterceptor and that interceptor will apply to all httprequests.
    // return this.authService.storeUser.pipe(
    //   take(1),
    //   exhaustMap(user => {
    //     console.log(user)
    //     return this.http.get<Recipe[]>(
    //       "https://recipes-80452-default-rtdb.firebaseio.com/recipes.json",
    //       {
    //         params:new HttpParams().set("auth",user._token),
    //       }
    //     );
    //   }),
    //   map(response => {
    //     return response.map(recipeItems => {
    //       return {
    //         ...recipeItems,
    //         ingredients: recipeItems.ingredients ? recipeItems.ingredients : []
    //       };
    //     });
    //   }),
    //   tap(fibResponse => {
    //     this.getRecipeService.fetchingData(fibResponse);
    //     console.log(fibResponse);      
    //   })
    // );
    return this.http
      .get<Recipe[]>(
        "https://recipes-80452-default-rtdb.firebaseio.com/recipes.json"
      ) 
      .pipe(
        map(response => {
          return response.map(recipeItems => {
            return {
              ...recipeItems,
              ingredients: recipeItems.ingredients
                ? recipeItems.ingredients
                : []
            };
          });
        }),
        tap(fibResponse => {
          this.getRecipeService.fetchingData(fibResponse);
          console.log(fibResponse);
        })
      );
    // .subscribe(fibResponse => {
    //   this.getRecipeService.fetchingData(fibResponse);
    //   console.log(fibResponse);
    // });
  }
}
