import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoriasModels } from 'src/app/models/categorias';
import { CategoriasService } from 'src/app/services/categorias.service';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {
  actualizarCategorias = true;
  registrarCategorias = false;
  idCategoria: any;
  @Input() set idCategorias( value){
    
    this.idCategoria = value;
    this.ngOnInit();
  }

  @Output() terminarActualizacion = new EventEmitter();

  categoria: CategoriasModels = new CategoriasModels();


  constructor( private categoriasService: CategoriasService) { }

  ngOnInit(): void {
    console.log(this.idCategoria);
    this.categoriasService.obtenerCategoriasid(this.idCategoria).then((resp: any) => {
  
        console.log(this.idCategoria);
        this.categoria = resp.cont[0];
        console.log(this.categoria);
  
      }).catch((err) => {
        Toast.fire({
          icon: 'error',
          title: err.error.msg
        });
      });
  }
  actualizar() {
  
    this.categoriasService.actualizarCategorias(this.idCategoria, this.categoria).then((resp: any) => {

      console.log(resp);
      Toast.fire({
        icon: 'success',
        title: `¡La categoria "${this.categoria.strNombre}" fue actualizado correctamente!`
      });
      this.terminarActualizacion.emit();

    }).catch((err: any) => {
      console.log(err);
      let error;
      if(err.error.err.errors.strNombre.properties.message) {
        error = err.error.err.errors.strNombre.properties.message;
        console.log(err.error.err.errors.strNombre.properties.message);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Algo salio mal',
          text: error,
          showConfirmButton: true,
        });
      } else {
        error = err;
        console.log(err);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Algo salio mal',
          text: error,
          showConfirmButton: true,
        });
      }
      console.log(err);
      this.terminarActualizacion.emit();
    });

  }
  cancelar() {
    this.terminarActualizacion.emit();

  }

}
