import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriasModels } from '../models/categorias';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
url = `${environment.urlLocal}categoria`;
  constructor( private http: HttpClient ) { }

  obtenerCategorias(){
    return this.http.get(`${this.url}/obtener`).toPromise();
  }
  obtenerCategoriasid(idCategorias: string) {
    return this.http.get(`${this.url}/obtener/${idCategorias}`).toPromise();
  }
  registrarCategorias(categoria: CategoriasModels) {
    return this.http.post(`${this.url}/registrar`, categoria).toPromise();
  }
  actualizarCategorias(idCategorias: any, categoria: CategoriasModels) {
    return this.http.put(`${this.url}/actualizar/${idCategorias}`, categoria ).toPromise();
  }
  eliminarCategoria(idCategoria: string) {
    return this.http.delete(`${this.url}/eliminar/${idCategoria}`).toPromise();
  }
  ActivarCategorias(idCategorias: string) {
    return this.http.delete(`${this.url}/activar/${idCategorias}`).toPromise();

}
}
