import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias.service';
import { CategoriasModels } from 'src/app/models/categorias';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instertar-categoria',
  templateUrl: './insertar-categoria.component.html',
  styleUrls: ['./insertar-categoria.component.css']
})
export class InstertarCategoriaComponent implements OnInit {
  @Input() componentes;
  @Input() idCategorias;
  @Output() salida = new EventEmitter();
  @Output() terminarActualizacion = new EventEmitter();

  categorias: CategoriasModels = new CategoriasModels();
  constructor( private categoriasService: CategoriasService) { }

  ngOnInit(): void {
  }
  registrarCategorias(forma: NgForm) {
    this.categoriasService.registrarCategorias(this.categorias).then((resp: any) => {
      this.terminarActualizacion.emit();
      forma.controls['strNombre'].reset();  
      forma.controls['strDescripcion'].reset();
    }).catch((err) => {
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

