import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlatillosService } from 'src/app/services/platillos.service';
import { PlatillosModels } from 'src/app/models/platillos';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-insertar-platillos',
  templateUrl: './insertar-platillos.component.html',
  styleUrls: ['./insertar-platillos.component.css']
})
export class InsertarPlatillosComponent implements OnInit {
  @Input() componentes;
  @Input() idPlatillos;
  @Output() salida = new EventEmitter();
  @Output() terminarActualizacion = new EventEmitter();

  platillos: PlatillosModels = new PlatillosModels();
  constructor( private platillosService: PlatillosService, public activateRoute: ActivatedRoute) {
    this.platillos.idCategoria = activateRoute.snapshot.params.idCategoria;
   }

  ngOnInit(): void {
  }

  registrarPlatillos(forma: NgForm) {
    console.log(this.platillos);
    this.platillosService.registrarPlatillos(this.platillos).then((resp: any) => {
      this.terminarActualizacion.emit();
      forma.reset();
    
    
    }).catch((err: any) => {
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
    });
  }
  }

