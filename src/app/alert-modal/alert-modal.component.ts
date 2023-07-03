import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-alert-modal",
  templateUrl: "./alert-modal.component.html",
  styleUrls: ["./alert-modal.component.css"]
})
export class AlertModalComponent {
  @Input("getMsg") message: string; 
  @Output("closeHandler") close = new EventEmitter<void>();
  onClose(){
   this.close.emit();
  }
}
