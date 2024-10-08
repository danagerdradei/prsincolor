import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  loginType: number = 1;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private authService: SocialAuthService,
  ) { 
      // redirect to home if already logged in
      let currentUser = this.authenticationService.getCurentUser();
      if (currentUser) { 
          this.router.navigate(['/LandingPage']);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl =  '/LandingPage';
      this.authService.authState.subscribe((user) => {
        //console.log("Auth",user);
        if(user)
          this.login(user.email);
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  setLoginType(type: number) {
    this.loginType = type;
  }
  onSubmit() {
    if (this.loginType === 1) {
      //console.log("google");
      this.signInWithGoogle();
    } else if (this.loginType === 2) {
      // Acción para iniciar sesión normal
      //console.log('Iniciar sesión normal');
      if (this.loginForm.invalid) {
        return;
      }
      this.login(this.f.email.value);
  }
}

  login(email: string){
    this.submitted = true;

    this.loading = true;
    //console.log("Entro al login");
    this.authenticationService.login(email)
    .subscribe({
      next: (result) => {
        if (result) {
          this.router.navigate([this.returnUrl]);
        }
        this.loading = false;
      }
    });
  }
  signInWithGoogle(): void {
    //console.log("Provider",GoogleLoginProvider.PROVIDER_ID);
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  ngOnDestroy() { }
}
