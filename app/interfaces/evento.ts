//petición get, put, delete
export interface IEventos{
    "id": number;
    "imagen": string;
    "nombre": string;
    "fecha": string;
    "hora":string;
    "lugar":string;
    "descripcion": string;

}

//petición post
export interface IEvento{
    "nombre": string;
    "imagen": string;
    "fecha": string;
    "hora":string;
    "lugar":string;
    "descripcion": string;


}


// En interfaces/inscripcion.ts
// inscripcion.interface.ts
export interface Iinscripcion {
    username: string;
    email: string;
    eventId: number;
    eventName: string;
    eventDate: string;  // O el tipo adecuado según cómo se almacene la fecha
  }
  