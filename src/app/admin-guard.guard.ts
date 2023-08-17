import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate {
    constructor(private router: Router, private toastr: ToastrService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            if (state.url.indexOf('admin') >= 0) {
                const roleId: string | null = localStorage.getItem('RoleId');
                if (roleId === '1') {
                    return true;
                } else {
                    this.toastr.error('You do not have access to this page.', 'Access Denied');
                    this.router.navigate(['']);
                    return false;
                }
            }
        } else {
            this.toastr.error('Please log in to access this page.', 'Access Denied');
            this.router.navigate(['auth/login']);
            return false;
        }
        return true;
    }
}
