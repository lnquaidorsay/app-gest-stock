import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {

  userFormGroup! : FormGroup;
  errorMessage! :string;

  constructor(private fb : FormBuilder,
             private authService : AuthenticationService,
             private router : Router) { }

  ngOnInit(): void {
    this.userFormGroup=this.fb.group({
      username : this.fb.control(null),
      password : this.fb.control(null)
    });
  }

  handleLogin() {
    let username=this.userFormGroup.value.username;
    let password=this.userFormGroup.value.password;
    console.log("username : ",username)
    console.log("password : ",password)
    this.authService.login(username,password).subscribe({
      next : (data)=>{
        this.authService.authenticateUser(data).subscribe({
          next : (data)=>{
            //this.router.navigateByUrl("/admin");
            //this.router.navigateByUrl("/inscrire");
            this.router.navigateByUrl("/dashboard");
          }
        })
      },
      error : err => {
        this.errorMessage=err.error;
      }
    })
  }

  login() {
    // this.userService.login(this.authenticationRequest).subscribe((data) => {
    //   this.userService.setAccessToken(data);
    //   this.getUserByEmail();
    //   this.router.navigate(['']);
    // }, error => {
    //   this.errorMessage = 'Login et / ou mot de passe incorrecte';
    // });
  }

}
