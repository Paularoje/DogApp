import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
  styles: [
  ]
})
export class RegisterUserComponent {

  miFormulario: FormGroup=this.fb.group({
    name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]]
  })

  constructor( private fb: FormBuilder,
                private router: Router,
                private authService: AuthService ) { }

  register(){
    const { name, email, password } = this.miFormulario.value;

    this.authService.register_user( name, email, password )
    .subscribe( ok => {
      console.log(ok);
      if ( ok === true ){
        this.router.navigateByUrl('/dashboard_user');
      }else{
        Swal.fire('Error',ok,'error');
      }
    });

  }
}
