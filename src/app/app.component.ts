import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <nav class='navbar navbar-expand navbar-light bg-light'>
  <a class='navbar-brand'>{{title}}</a>
  <ul class='nav nav-pills'>
    <li><a class='nav-link' routerLink='/Home'>Home</a></li>
    <li><a class='nav-link' routerLink='/pokemon'>Pokemon</a></li>
    <li><a class='nav-link' routerLink='/usersignup'>Sign Up</a></li>
    <li><a class='nav-link' routerLink='/userlogin'>Log In</a></li>
    <li><a class='nav-link' routerLink='/userprofile'>Profile</a></li>
  </ul>
</nav>
<div class='container'>
  <router-outlet></router-outlet>
</div>
  `
})

export class AppComponent {
  title = 'Welcome To Pokemon Trading';
}


//<li><a class='nav-link' routerLink='/usersignup'>Log In</a></li>
