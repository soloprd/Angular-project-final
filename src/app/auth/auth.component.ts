import { Component, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Observable } from "rxjs";
import { AlertModalComponent } from "../alert-modal/alert-modal.component";
import { PlaceHolderDirective } from "../shared/placeholder.directive";
import { AuthService, responseDataa } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnDestroy {
  isLogedin = false;
  isLoading = false;
  error: any = null;
  success: any = null;
  public closeSub: Subscription;
  @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;
  @ViewChild("formRef") authForm: NgForm;
  constructor(private authService: AuthService, private router: Router) {}
  onSwitch() {
    this.isLogedin = !this.isLogedin;
  }
  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }
    console.log(this.authForm);
    const values = {
      email: this.authForm.value.email,
      password: this.authForm.value.password,
      returnSecureToken: true
    };
    this.isLoading = true;
    let authObs: Observable<responseDataa>;

    if (this.isLogedin) {
      // this.authService.signUp(values).subscribe({
      //   next: responseData => console.log(responseData),
      //   error: errorMessage => console.log(errorMessage)
      // });
      authObs = this.authService.login(values);
    } else {
      authObs = this.authService.signUp(values);
    }

    authObs.subscribe({
      next: sendRes => {
        console.log(sendRes);
        if (!sendRes.registered) {
          this.success = ".اطلاعات با موفقیت ثبت شد";
        } else {
          this.success = "با موفقیت وارد شدید.";
        }
        this.isLoading = false;
        this.router.navigate(["/recipes"]);
      },
      error: errorRes => {
        console.log(errorRes);
        // this.error = new Error("The Email and Password is already  used !");
        this.error = errorRes;
        this.onShowErrorAlert(errorRes);
        this.isLoading = false;
      }
    });
  }
  onShowErrorAlert(errorMsg: string) {
    //we do not need to create factory is depricated;
    this.alertHost.viewContainerRef.clear();
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    const alertCmp = hostViewContainerRef.createComponent(AlertModalComponent);
    alertCmp.instance.message = errorMsg;
    this.closeSub = alertCmp.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
    console.log(alertCmp);
  }
  onCloseModal() {
    this.error = null;
  }
  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
