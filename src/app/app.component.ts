import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { RecipeService } from "./shared/recipe.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "version1";
  recievedFeature: string = "recipe";
  constructor(private authService:AuthService){}
  ngOnInit(): void {
      this.authService.autoLogin();
  }
  getSelectedFeature(gotFeature: string) {
    this.recievedFeature = gotFeature;
  }    
}
