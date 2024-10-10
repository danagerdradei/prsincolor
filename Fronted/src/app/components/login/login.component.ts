import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { environment } from 'src/environments/environment';

declare const google: any; // Declarar la API de Google

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  loginType: number = 1;
  localUri: string = '';
  clientId: string = '';

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService
  ) { 
      // Asignar el Client ID de Google desde el archivo de environment
      
      // Asignar la URL base (http://localhost:4200)
      this.localUri = `${window.location.protocol}//${window.location.host}`;
      
      // Si el usuario ya está logueado, redirigir a la página principal
      let currentUser = this.authenticationService.getCurentUser();
      if (currentUser) { 
          this.router.navigate(['/LandingPage']);
      }
  }

  ngOnInit() {
      // Configuración del formulario de inicio de sesión
      this.clientId=environment.clientId;
      this.loginForm = this.formBuilder.group({
          email: ['', Validators.required]
      });

      // Obtener la URL de retorno, por defecto '/LandingPage'
      this.returnUrl = '/LandingPage';

      window['handleCredentialResponse'] = (response: any) => {
        console.log('Encoded JWT ID token: ' + response.credential);
        // Aquí puedes procesar el token y autenticar al usuario
        this.handleCredentialResponse(response);
      };
  

      // Inicializar Google Sign-In con el client_id y el callback
      google.accounts.id.initialize({
        client_id: this.clientId,
        callback: window['handleCredentialResponse']
      });

      google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'), // Coloca el ID del botón en el HTML
        { theme: 'outline', size: 'large' } // Personalización del botón
      );
  }


  // Callback para manejar la respuesta del token JWT de Google
  handleCredentialResponse(response: any): void {
    console.log('handleCredentialResponse');
    if (response && response.credential) {
      // Decodificar el token JWT
      const userObject = this.parseJwt(response.credential);
      
      if (userObject && userObject.email) {
        // Iniciar sesión usando el email obtenido del token de Google
        this.login(userObject.email);
        console.log('Login exitoso. Email del usuario:', userObject.email);
      } else {
        // Si no se puede obtener el email
        console.error('Error: El token JWT no contiene un email válido.');
      }
    } else {
      // Si no se recibe un token en la respuesta
      console.error('Error: No se recibió un token de autenticación.');
    }
  }

  // Método para decodificar el token JWT y obtener el payload (información del usuario)
  parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  // Método para manejar el inicio de sesión manual por email
  onSubmit() {
     if(this.loginType === 2) {
      // Iniciar sesión con email y contraseña
      if (this.loginForm.invalid) {
        return;
      }
      this.login(this.f.email.value); // Llama al login con el email del formulario
    }
  }

  // Iniciar sesión con el email obtenido
  login(email: string) {
    this.submitted = true;
    this.loading = true;

    this.authenticationService.login(email)
    .subscribe({
      next: (result) => {
        if (result) {
          this.router.navigate([this.returnUrl]); // Redirigir a la página de retorno
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      }
    });
  }

  // Getter para acceder fácilmente a los controles del formulario
  get f() { return this.loginForm.controls; }

  // Cambiar el tipo de login (Google o email)
  setLoginType(type: number) {
    this.loginType = type;
  }

  ngOnDestroy() { }
}
