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
  openManageEvents(){
    this.router.navigate(['admin/manageevents']);
  }
  openAcceptEvents(){
    this.router.navigate(['admin/acceptevents']);
  }
  openViewRegisteredUsers(){
    this.router.navigate(['admin/home']);
  }
  openReports(){
    this.router.navigate(['admin/reports']);
  }
  openManagePages(){
    this.router.navigate(['admin/managepages']);
  }
}
