import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ServerComponent } from "./server/server.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { UserSvgComponent } from "./user-svg/user-svg.component";
import { SharedModule } from "./shared/sharedModule/shared.module";
import { CoreModule } from "./core.module";
import { StoreModule } from "@ngrx/store";
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { shoppingListReducer } from "./shopping-list/store/shopping-list.reducer";
import * as fromApp from "../app/store/app.reducer";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//reciprModule به صورت لیزی لودیگ در اپ روتینگ ماژول اضافه شد و آن را را از ایمپورت اینجا حذف کردیم
//اگر بخواهیم shoppinglist ,و authModule را لیزی لود کنیم آن ها را نیز از داخل ایمپورت این بخش حذف میکنیم
@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    HeaderComponent,
    UserSvgComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    SharedModule,
    CoreModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
