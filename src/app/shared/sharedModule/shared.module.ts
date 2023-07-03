import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertModalComponent } from "src/app/alert-modal/alert-modal.component";
import { DropdownDirective } from "../dropdown.directive";
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";
import { PlaceHolderDirective } from "../placeholder.directive";

@NgModule({
  declarations: [
    DropdownDirective,
    PlaceHolderDirective,
    AlertModalComponent,
    LoadingSpinnerComponent
  ],
  imports: [CommonModule],
  exports: [
    DropdownDirective,
    PlaceHolderDirective,
    AlertModalComponent,
    CommonModule,
    LoadingSpinnerComponent
  ]
})
export class SharedModule {}
