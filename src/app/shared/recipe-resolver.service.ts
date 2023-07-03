import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from './recipe.model';
import { DataPostFetchService } from './firebase-post-fetch.service';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class recipeResolver implements Resolve<Recipe[]> {
    constructor(private firebaseService:DataPostFetchService,private recipeService:RecipeService){}
    resolve(route: ActivatedRouteSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
        const recipes = this.recipeService.getRecipes();
        // وقتی بار اول که صفحه لود میشود فچ میکند و ریسیپ با آرایه پر میشود و در همانجا داده ها میمانند  و اگر آرایه در خود برنامه موجود بود دیگر لازم نیس هر بار که به ادیت کامپوننت یا دیتیل کامپوننت تغییر مسیر میدهیم داده ها فچ شوند یا مجدد از فایر بیس دریافت شوند.
        if(recipes.length === 0){
            return this.firebaseService.fetchRecipes();
        }else{
            return recipes;
        }
    }
} 