import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlatillosModels } from '../models/platillos';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlatillosService {
  url = `${environment.urlLocal}platillos`;
  constructor( private http: HttpClient ) { }
  obtenerPlatillos(idCategoria: string){
    return this.http.get(`${this.url}/obtener/${idCategoria}`).toPromise();
  }
  obtenerPlatillosid(idPlatillos: string) {
    return this.http.get(`${this.url}/obtenerId/${idPlatillos}`).toPromise();
  }
  registrarPlatillos(platillo: PlatillosModels) {
    return this.http.post(`${this.url}/registrar`, platillo).toPromise();
  }
  actualizarPlatillos(idPlatillos: string, platillo: PlatillosModels) {
    return this.http.put(`${this.url}/actualizar/${idPlatillos}`, platillo ).toPromise();
  }
  eliminarPlatillo(idPlatillo: string) {
    return this.http.delete(`${this.url}/eliminar/${idPlatillo}`).toPromise();
  }
  ActivarPlatillos(idPlatillos: string) {
    return this.http.delete(`${this.url}/activar/${idPlatillos}`).toPromise();
}
}

