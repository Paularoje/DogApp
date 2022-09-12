import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Usuario, Perro, Paseador, AuthResponse_walker, AuthResponse_user, MarcadorColor, AuthPerro } from '../interfaces/interfaces';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!:Usuario;
  private _paseador!:Paseador;
  private _perro!:Perro;

  marcadorColor: any;

  get usuario (){
    return {...this._usuario}
  }
  get paseador (){
    return {...this._paseador}
  }

  agregarPerro(perro:Perro):Observable<Perro>{
    return this.http.post<Perro>('${this.baseUrl}/user/dogsUser ',perro)
  }

  constructor(private http: HttpClient) { }

  register_user(name: string, email: string, password: string){
    const url_u = `${ this.baseUrl }/user/register`;
    const body = { name, email, password };

    return this.http.post<AuthResponse_user>( url_u, body )
      .pipe(
        tap( resp => {
          if ( resp.ok ){
            localStorage.setItem('token', resp.token!);
            this._usuario={
              name: resp.name!,
              uid: resp.uid!,
            }
          }
        }),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg))
      )
  }

  register_walker(name: string, email: string, password: string, photo:File, identification:string, birth_date:Date, phone:Number, address:string, experience:string ){
    const url_w = `${ this.baseUrl }/walker/register`;
    const body = { name, email, password, photo, identification, birth_date, phone, address, experience };

    return this.http.post<AuthResponse_walker>( url_w, body )
      .pipe(
        tap( resp => {
          if ( resp.ok ){
            localStorage.setItem('token', resp.token!);
            this._paseador={
              name: resp.name!,
              wid: resp.wid!,
            }
          }
        }),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg))
      )
  }

  login_walker( email: string, password: string ){

    const url_w = `${ this.baseUrl }/walker`;
    const body = { email, password };

    return this.http.post<AuthResponse_walker>( url_w, body )
      .pipe(
        tap( resp => {
          if ( resp.ok ){
            localStorage.setItem('token', resp.token!);
            this._paseador={
              name: resp.name!,
              wid: resp.wid!,
            }
          }
        }),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg))
      )
  }

  login_user( email: string, password: string ){

    const url_u = `${ this.baseUrl }/user`;
    const body = { email, password };

    return this.http.post<AuthResponse_user>( url_u, body )
      .pipe(
        tap( resp => {
          if ( resp.ok ){
            localStorage.setItem('token', resp.token!);
            this._usuario={
              name: resp.name!,
              uid: resp.uid!,
            }
          }
        }),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg))
      )
  }

  validarToken(): Observable<boolean>{
    const url = `${ this.baseUrl }/walker/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem( 'token' ) || '' );

    return this.http.get<AuthResponse_walker>( url,{ headers } )
        .pipe(
          map( resp => {
            console.log(resp.token);
            localStorage.setItem('token', resp.token!);
            this._paseador={
              name: resp.name!,
              wid: resp.wid!,
            }
            return resp.ok;
          }),
          catchError( err => of(false))
        );
  }

  validarTokenUser(): Observable<boolean>{
    const url = `${ this.baseUrl }/user/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem( 'token' ) || '' );

    return this.http.get<AuthResponse_user>( url,{ headers } )
        .pipe(
          map( resp => {
            console.log(resp.token);
            localStorage.setItem('token', resp.token!);
            this._usuario={
              name: resp.name!,
              uid: resp.uid!,
            }
            return resp.ok;
          }),
          catchError( err => of(false))
        );
  }

  registroPerro(name:string,age:number,breed:string,vaccines?:string,preferences?:string){
    const url= `${ this.baseUrl }/dog/register`;
    const body={ name,age,breed,vaccines,preferences};

    const headers =new HttpHeaders()
      .set('x-token',localStorage.getItem('token') || '');

    return this.http.post<AuthPerro>(url,body, {headers})
      .pipe(
        tap( resp => {
          if (resp.ok){
              this._perro={
                name:resp.name!,
                age:resp.age!,
                breed:resp.breed!,
                vaccines:resp.vaccines!,
                preferences:resp.preferences!
              }
            }
        }),
        map(resp=> resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  listarPerro():Observable<Perro[]>{
    const url= `${ this.baseUrl }/dog/list`;
    const headers =new HttpHeaders()
      .set('x-token',localStorage.getItem('token') || '');
    return this.http.get<Perro[]> (url,{headers})
  }

  logOut(){
    localStorage.clear();
  }

  get Marcador():MarcadorColor[]{
    return[...this.Marcador];
  }
  get Perro():Perro[]{
    return [...this.Perro]
  }

}
