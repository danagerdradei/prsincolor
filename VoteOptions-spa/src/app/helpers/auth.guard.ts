import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const currentUser = this.authenticationService.getCurentUser();
        
        // Si el usuario está autenticado, permitir el acceso
        if (currentUser) {
            return true;
        }

        // Si la URL actual ya es '/login', no redirigir de nuevo
        const currentUrl = state.url;
        if (currentUrl.includes('/login')) {
            return false;
        }

        // Si el usuario no está autenticado, redirigir a la página de login
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
