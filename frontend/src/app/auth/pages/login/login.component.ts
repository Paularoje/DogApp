import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  styles: [
  ]
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    typeUser: ['', [Validators.required]],
    email: ['juliana@gmail.com', [Validators.required, Validators.email]],
    password: ['juliana123', [Validators.required, Validators.minLength(6)]]
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService ) { }

  login()
  {
    const { typeUser, email, password } = this.miFormulario.value;
      if(typeUser==="User"){
        this.authService.login_user( email, password )
        .subscribe( ok => {
          console.log(ok);
          if ( ok === true ){
            this.router.navigateByUrl('/dashboard_user');
          }else{
            Swal.fire('Error',ok,'error');
          }
        });
      }
      if(typeUser==="Walker"){
        this.authService.login_walker( email, password )
        .subscribe( ok => {
          console.log(ok);
          if ( ok === true ){
            this.router.navigateByUrl('/dashboard_walker');
          }else{
            Swal.fire('Error',ok,'error');
          }
        });
      }
  }
}
