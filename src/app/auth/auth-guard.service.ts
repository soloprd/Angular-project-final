import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map,take } from "rxjs";
import { AuthService } from "./auth.service";
import { Store } from "@ngrx/store";
import * as  fromAppReducer from "../store/app.reducer";

@Injectable({providedIn:"root"})
export class AuthenticationGuard implements CanActivate {
    constructor(private authService:AuthService,private router:Router,private store:Store<fromAppReducer.AppState>){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select("auth").pipe(take(1),map(userObj=>userObj.user),map(authUser=>{
            return authUser? true:this.router.createUrlTree(['/auth']);
            // const userAuth = !!authUser;
            // console.log(userAuth);
            // if(userAuth){
            //   return true;
            // }
            //     return this.router.createUrlTree(['/auth']);
        }))
    }
}