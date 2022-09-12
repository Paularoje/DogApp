import { Component, ViewChild, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MarcadorColor } from 'src/app/auth/interfaces/interfaces';
import { MapaMarcadorComponent } from '../mapa-marcador/mapa-marcador.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  styles: [
  ]
})
export class DashboardComponent implements AfterViewInit {
    @ViewChild(MapaMarcadorComponent) mark:any;

  marcadores: MarcadorColor[]=[]
  loading=true;

  miFormulario: FormGroup = this.fb.group({
    origen: ['',[Validators.required]],
    destino: ['',[Validators.required]]
  });

  get paseador() {
    return this.authService.paseador;
  }

  constructor(
    private router:Router,
    private fb: FormBuilder,
    private authService:AuthService,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  get marcador(){
    return this.authService.Marcador;
  }
  origen(){
    const { origen } = this.miFormulario.value;
  }

  ngAfterViewInit(): void {
    this.marcadores=this.mark.marcadores;
    this.loading=false;
    this.cd.detectChanges();

  }
}
