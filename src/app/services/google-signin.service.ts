import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoogleSigninService {
  // constructor(private authService: SocialAuthService) { }

  signInWithGoogle() {
    //   return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut() {
    //   return this.authService.signOut();
  }
}
