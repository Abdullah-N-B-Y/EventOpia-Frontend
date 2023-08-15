import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
  constructor(private router: Router){}
  openDashboard(){
    this.router.navigate(['admin/home']);
  }
  openManageCategories(){
    this.router.navigate(['admin/manageCategories']);
  }
  openAcceptEvents(){
    this.router.navigate(['admin/EventAcceptance']);
  }
  manageUsers(){
    this.router.navigate(['admin/manageUsers']);
  }
  openReports(){
    this.router.navigate(['admin/report']);
  }
  openManagePages(){
    this.router.navigate(['admin/managepages']);
  }
}
