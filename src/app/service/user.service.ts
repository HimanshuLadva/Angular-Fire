import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn:'root' 
})

export class UserService {
    isLoggedIn$ :Observable<boolean>;
    isLoggedOut$:Observable<boolean>;
    pictureUrl$ :Observable<string>;
    
    constructor(private afAuth:AngularFireAuth, private router:Router) {
        // afAuth.idToken.subscribe(jwt => console.log("jwt", jwt));
        // afAuth.authState.subscribe(authState => console.log("authState", authState));
        
        this.isLoggedIn$ = afAuth.authState.pipe(map(user => !!user));
        
        this.isLoggedOut$ = afAuth.authState.pipe(map(loggedIn => !loggedIn));
        
        this.pictureUrl$ = afAuth.authState.pipe(map(user => user ? user.photoURL:null));
    }
    logout() {
        this.afAuth.signOut();
        this.router.navigateByUrl("/login");
    }
}