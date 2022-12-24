import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private users : AppUser[]=[];
  public authenticatedUser : AppUser | undefined;
  constructor() {
    this.users.push({userId : UUID.UUID(),username:"user1",password :"1234","roles":['USER']});
    this.users.push({userId : UUID.UUID(),username:"user2",password :"1234","roles":['USER']})
    this.users.push({userId : UUID.UUID(),username:"admin",password :"admin","roles":['USER',"ADMIN"]});
  }
  public login(username:string, password :string):Observable<AppUser> {
    let appUser = this.users.find(u=>u.username==username);
    if(!appUser)
      return throwError(()=>new Error('User Not found'));
    if(appUser.password!=password)
      return throwError(()=>new Error('Bad Credentials'));
    return of(appUser);
  }
  public authenticateUser(user : AppUser):Observable<boolean>{
    this.authenticatedUser=user;
    localStorage.setItem("authUser", JSON.stringify({username:user.username, roles:user.roles, token : "JWT_TOKEN"}));
    return of(true);
  }
  public hasRole(role : string) :boolean {
    return this.authenticatedUser!.roles.includes(role);
  }
  public logout(){
    this.authenticatedUser=undefined;
    localStorage.removeItem("authUser");
    return of(true);
  }
  public isAuthenticated():boolean{
    return this.authenticatedUser!=undefined;
  }

  getConnectedUser(): AppUser {
    if (localStorage.getItem('authUser')) {
      return JSON.parse(localStorage.getItem('authUser') as string);
    }
    return {userId:"JWT_TOKEN",username:"JWT_TOKEN",password:"JWT_TOKEN", roles:["JWT_TOKEN"]};
  }
}
