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
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService
  ) { 
      // Asignar el Client ID de Google desde el archivo de environment
      this.clientId = environment.clientId;
      
      // Asignar la URL base (http://localhost:4200 o dominio personalizado)
      this.localUri = `${window.location.protocol}//${window.location.host}`;
      
      // Si el usuario ya está logueado, redirigir a la página principal
      let currentUser = this.authenticationService.getCurentUser();
      if (currentUser) { 
          this.router.navigate(['/LandingPage']);
      }
  }

  ngOnInit() {
      // Configuración del formulario de inicio de sesión
      this.loginForm = this.formBuilder.group({
          email: ['', Validators.required]
      });

      // Obtener la URL de retorno, por defecto '/LandingPage'
      this.returnUrl = '/LandingPage';

      // Cargar el script de Google manualmente si no está disponible
      if (!window['google'] || !google.accounts) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => this.renderGoogleButton(); // Renderizar botón después de cargar
        document.head.appendChild(script);
      } else {
        this.renderGoogleButton();
      }
  }

  // Función para renderizar el botón de Google después de asegurarse de que el script está cargado
  renderGoogleButton() {
    window['handleCredentialResponse'] = (response: any) => {
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
      } else {
        console.error('Error: El token JWT no contiene un email válido.');
      }

      // Forzar recarga de la página después del inicio de sesión
      setTimeout(() => {
        window.location.reload();
      }, 500); // Ajusta el tiempo de espera si es necesario
    } else {
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
     if (this.loginType === 2) {
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
          // Redirigir a la página de retorno
          this.router.navigate([this.returnUrl]).then(() => {
            // Recargar la página después de la redirección
            window.location.reload();
          });
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
