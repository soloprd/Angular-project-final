import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { recipeResolver } from "./shared/recipe-resolver.service";
import { RecipeService } from "./shared/recipe.service";
// import { ShoppingListService } from "./shared/shopping-list.service";
//برای ماژول های سرویس نیاز به export کردن نداریم
@NgModule({
  providers: [
    // ShoppingListService,
    RecipeService,
    recipeResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]   
})
export class CoreModule {}
