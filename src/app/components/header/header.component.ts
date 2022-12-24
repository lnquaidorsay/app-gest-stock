import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  connectedUser?: AppUser ;

  constructor(private authServ : AuthenticationService) { }

  ngOnInit(): void {
    this.connectedUser = this.authServ.getConnectedUser()
  }

}
