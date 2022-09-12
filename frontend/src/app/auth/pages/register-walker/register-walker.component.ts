import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-walker',
  templateUrl: './register-walker.component.html',
  styleUrls: ['./register-walker.component.css'],
  styles: [
  ]
})
export class RegisterWalkerComponent {
  private fecha: String | undefined;
  private date: String | undefined;

  miFormulario: FormGroup = this.fb.group({
    name: ['Paula Rodriguez', [Validators.required]],
    email: ['paula@gmail.com', [Validators.required, Validators.email]],
    password: ['paula123', [Validators.required, Validators.minLength(6)]],
    photo: [],
    identification: ['1111111111', [Validators.required]],
    birth_date: ['2021-09-15', [Validators.required]],
    phone: ['3112345678', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
    address: ['Cra. 32 A #32-12', [Validators.required]],
    experience: ['']
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService ) { }

  register(){
    const { name, email, password, photo, identification, birth_date, phone, address, experience } = this.miFormulario.value;

    this.authService.register_walker( name, email, password, photo, identification, birth_date, phone, address, experience )
    .subscribe( ok => {
      console.log(ok);
      if ( ok === true ){
        this.router.navigateByUrl("/dashboard_walker");
      }else{
        Swal.fire('Error',ok,'error');
      }
    });
  }

  fecha_min(){
    this.date = new Date().toLocaleDateString();
    return this.date;
  };

  fecha_max(){
    let date = new Date();
    let year = date.getFullYear()-18;
    let month = date.getMonth() + 1;
    let day = date.getDate();
    this.fecha = month + "/" + day + "/" + year;
    return this.fecha;
  };
}
