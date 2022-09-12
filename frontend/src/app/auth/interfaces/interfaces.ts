export interface AuthResponse_walker{
  ok: boolean,
  wid?: string,
  name?: string,
  token?: string,
  msg?: string
};

export interface AuthResponse_user{
  ok: boolean,
  uid?: string,
  name?: string,
  token?: string,
  msg?: string
};

export interface AuthPerro{
  ok:boolean;
  token?:string;
  name?:string;
  age?:number;
  breed?:string;
  vaccines?:string;
  preferences?:string
};

export interface Usuario{
  uid:String;
  name:string
};

export interface Paseador{
  wid:String;
  name:string
};

export interface Perro {
  name:string,
  age:number,
  breed:string,
  vaccines?:string,
  preferences?:string,
};

export interface listarPerro{
  newDogs:[]
};

export interface MarcadorColor{
  color:string;
  marker?:mapboxgl.Marker;
  centro?: [number,number]
};
