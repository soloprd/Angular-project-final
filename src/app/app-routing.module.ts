import { Component, NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
//we are adding lazyloading
const appRoutes: Routes = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  {
    path: "recipes",
    loadChildren: () =>
      import("./recipe/recipe.module").then(mObj => mObj.RecipeModule)
  },
  {
    path: "shopping",
    loadChildren: () =>
      import("./shopping-list/shopping.module").then(
        mObj => mObj.ShoppingModule
      )
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./auth/auth.module").then(mObj => mObj.AuthModule)
  }
];  
//اضافه کردیم pre-load باعث میشود بسته ها از قبل دانلود شود و هنگام نمایش تاخیر کمتری داشته باشد به عبارتی بهینه کردن لیزی لودینگ میباشد.
//دونکته مهم
//forRoot را فقط در approuting module استفادهمیکنیم در بقیه روت هایی که برای بقیه کامپوننت ها میسازیم از از متد childroot استفاده میکنیم
//از BrowserModule فقط در appModule استفاده میکنیم در ماژولی که برای کامپوننت های دیگر ساخته ایم از ازcommonMudule استفاده میکنیم.
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
