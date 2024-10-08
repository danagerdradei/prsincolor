import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserVote } from 'src/app/model/Vote';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input() electionInfo: any;
  currentUser: User;
  redirect: string = "/";
  isDropdownOpen = false;
  constructor(private router: Router,private authenticationService: AuthenticationService) { 
   
  }

  ngOnInit(): void {
    this.currentUser =  this.authenticationService.getCurentUser();
    //console.log(this.currentUser);
    if(this.currentUser)
      this.redirect = "/projects";
    else
      this.redirect = "/";
    //console.log(this.redirect);
  }

  logOut(){
    this.isDropdownOpen = false;
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
navOnclick(){
  this.isDropdownOpen = !this.isDropdownOpen
  return this.isDropdownOpen;
}
}
