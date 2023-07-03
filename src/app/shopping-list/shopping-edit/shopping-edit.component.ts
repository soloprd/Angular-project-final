import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import { FormControl, NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { Ingredient } from "src/app/shared/ingredient.model";
// import { ShoppingListService } from "src/app/shared/shopping-list.service";
import * as shoppingListActions from "../store/shopping-list.actions";
// import * as fromShoppingListReducer from "../store/shopping-list.reducer";
import * as appReducer from "../../store/app.reducer";
@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("formRef") formRefAccess: NgForm;
  @ViewChild("AddNameRef") AddNameInputRef: ElementRef;
  @ViewChild("AddAmountRef") AddAmountInputRef: ElementRef;
  // @Output("sendOut") sendOut = new EventEmitter<Ingredient>();
  editMode: boolean = false;
  // کلیک آیتم ایندکس رو کامنت میکنیم چون لازم نداریم زیرا زمانی که استارت ادیت رو دیسپچ میکنیم
  // clickedItemIndex: number;
  recievedEditingItem: Ingredient;
  subscription: Subscription;
  constructor(
    // private slSerivce: ShoppingListService,
    private store: Store<appReducer.AppState>
  ) {}

  ngOnInit() {
    //اینارو از استور میگیریم
    this.subscription = this.store
      .select("shoppingList")
      .subscribe(appState => {
        if (appState.editedIngredientIndex > -1) {
          this.editMode = true;
          // this.clickedItemIndex = appState.editedIngredientIndex;
          this.recievedEditingItem = appState.editedIngredient;
          this.formRefAccess.setValue({
            name: this.recievedEditingItem.name,
            amount: this.recievedEditingItem.amount
          });
        } else {
          this.editMode = false;
        }
      });
    //ولی اینا روش قبلیه از استور نمیگیریم چون استیت داخل استوره و با شاپینگ لیست سرویس دیگه کاری نداریم
    // this.subscription = this.slSerivce.getIndex.subscribe((Index: number) => {
    //   this.editMode = true;
    //   this.clickedItemIndex = Index;
    //   this.recievedEditingItem = this.slSerivce.getItemIndex(Index);
    //   this.formRefAccess.setValue({
    //     name: this.recievedEditingItem.name,
    //     amount: this.recievedEditingItem.amount
    //   });
    // });
  }
  onClear() {
    this.formRefAccess.reset();
    this.editMode = false;
    this.store.dispatch(new shoppingListActions.StopEdit());
  }
  onDelete() {
    this.onClear();
    // this.slSerivce.deleteIngredient(this.clickedItemIndex);
    this.store.dispatch(new shoppingListActions.DeleteIngredient());
    console.log("Delete Dispatched");
  }
  onSubmit(form: NgForm) {
    console.log(form);
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      // this.slSerivce.updatingItem(this.clickedItemIndex, newIngredient);
      this.store.dispatch(
        new shoppingListActions.UpdateIngredients(newIngredient)
      );
    } else {
      // this.slSerivce.sendIngredients(newIngredient);
      this.store.dispatch(new shoppingListActions.AddIngredient(newIngredient));
    } 
    this.editMode = false;
    form.reset();
  }

  onAdd(event: Event) {
    event.preventDefault();
    // this.slSerivce.sendIngredients({
    //   name: this.AddNameInputRef.nativeElement.value,
    //   amount: +this.AddAmountInputRef.nativeElement.value
    // });
    // this.sendOut.emit({
    //   name: this.AddNameInputRef.nativeElement.value,
    //   amount: +this.AddAmountInputRef.nativeElement.value
    // });
    // console.log(this.AddNameInputRef.nativeElement.value);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new shoppingListActions.StopEdit());
  }
}
