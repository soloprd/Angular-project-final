import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";
const shoppingRoute:Routes=[
    { path: "", component: ShoppingListComponent },
]
@NgModule({
    imports:[RouterModule.forChild(shoppingRoute)],
    exports:[RouterModule],
})
export class ShoppingRouteModule {

}