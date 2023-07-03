import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from "@angular/core";
import { Subscription, map } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataPostFetchService } from "../shared/firebase-post-fetch.service";
import { RecipeService } from "../shared/recipe.service";
import * as fromAppReducer from "../store/app.reducer";
import { Store } from "@ngrx/store";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output("selectedFeature") selectedFeature = new EventEmitter<string>();
  constructor(
    private postfetchService: DataPostFetchService,
    private authUserStorageService: AuthService,
    private authService: AuthService,
    private store: Store<fromAppReducer.AppState>
  ) {}
  navCondition = false;
  isAuthenticated = false;
  private userSub: Subscription;
  ngOnInit() {
    this.userSub = this.store
      .select("auth")
      .pipe(map(userObj => userObj.user))
      .subscribe(user => {
        this.isAuthenticated = !!user;
      });
  }
  onSaveData() {
    this.postfetchService.storeRecievedDataFromRecipeService();
    this.authService.autoLogin();
  }
  onLogOut() {
    this.authUserStorageService.logOut();
  }
  fetchData() {
    this.postfetchService.fetchRecipes().subscribe();
    this.authService.autoLogin();
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  openNav() {
    this.navCondition = true;
  }
  // onSelect(selectedItem: string) {
  //   this.selectedFeature.emit(selectedItem);
  // }
}
