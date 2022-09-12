import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  {

  get paseador() {
    return this.authService.paseador;
  }

  constructor(private router: Router,
    private authService: AuthService) { }

  logout(){
    this.router.navigateByUrl('/auth');
    this.authService.logOut();
  }

}
