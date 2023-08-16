import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router){}
  token?:any | string = localStorage.getItem('jwtToken');
  openProfile(){
    this.token==null ? this.router.navigate(['auth/login']) : this.router.navigate(['admin/profile']);
  }

  openHome(){
    this.router.navigate(['']);
  }

  openAbout(){
    this.router.navigate(['about']);
  }

  openTestimonial(){
    this.router.navigate(['testimonial']);
  }

  openContact(){
    this.router.navigate(['contact']);
  }

  openEvents(){
    this.router.navigate(['events']);
  }

  openMyEvents(){
    this.router.navigate(['my-events']);
  }
  
}
