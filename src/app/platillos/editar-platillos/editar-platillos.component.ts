import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlatillosModels } from 'src/app/models/platillos';
import { PlatillosService } from 'src/app/services/platillos.service';
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});
@Component({
  selector: 'app-editar-platillos',
  templateUrl: './editar-platillos.component.html',
  styleUrls: ['./editar-platillos.component.css']
})
export class EditarPlatillosComponent implements OnInit {
  actualizarPlatillos = true;
  registrarPlatillos = false;
  idPlatillo: any;
  @Input() set idPlatillos( value){
    
    this.idPlatillo = value;
    this.ngOnInit();
  }

  @Output() terminarActualizacion = new EventEmitter();

  platillo: PlatillosModels = new PlatillosModels();

  constructor( private platillosService: PlatillosService) { }

  ngOnInit(): void {
    console.log(this.idPlatillo);
    this.platillosService.obtenerPlatillosid(this.idPlatillo).then((resp: any) => {
  
        console.log(this.idPlatillo);
        this.platillo = resp.cont[0];
        console.log(this.platillo);
  
      }).catch((err) => {
        Toast.fire({
          icon: 'error',
          title: err.error.msg
        });
      });
  }
  actualizar() {
  
    this.platillosService.actualizarPlatillos(this.idPlatillo, this.platillo).then((resp: any) => {

      console.log(resp);
      Toast.fire({
        icon: 'success',
        title: `¡El platillo "${this.platillo.strNombre}" fue actualizado correctamente!`
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
