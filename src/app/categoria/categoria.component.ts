import { Component, OnInit, } from '@angular/core';
import { CategoriasService } from '../services/categorias.service';
import Swal from 'sweetalert2';
import { PdfServiceService } from '../services/PDF/pdf-service.service';
import { ExportDataService } from 'src/app/services/export-data/export-data.service';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  actualizarCategorias: boolean = false;
  registrarCategorias: boolean = true;
  categorias: any;
  idCategorias: string;
  arraCategorias = [];
  arraNewCatagorias = [];
  title: string;
  cargando: boolean;
  searchText = {strNombre:''};
 
  constructor( private categoriasService: CategoriasService, private _PdfService: PdfServiceService, private excelService: ExportDataService) {
    this.title = "Reporte de Categorias";
    
  }

  ngOnInit(): void {
    this.obtenerCate();
    this.arraCategorias = [];
    
   
  }
  
 obtenerCate(){
  this.categoriasService.obtenerCategorias().then((resp: any) => {
    this.categorias = resp.categorias;

    for (const categoria of this.categorias) {
      let element = [

        categoria.strNombre.replace(/\:null/gi, ':""'),
        categoria.strDescripcion.replace(/\:null/gi, ':""'),
        categoria.blnActivo ? 'Si' : 'No',

      ];

      this.arraCategorias.push(element);
      this.arraNewCatagorias = this.arraCategorias;
    }
  }).catch((err) => {
   
    Toast.fire({
      icon: 'error',
      title: err.error.msg
    });
    console.log(err);
  });
  this.categorias = [];
} 



  eliminarCategoria(id: string) {
    this.categoriasService.eliminarCategoria(id).then((data: any) => {
      const nombre = data.cont.strNombre;
      Toast.fire({
        icon: 'success',
        title: `¡La categoria:" ${nombre} " se desactivo correctamente!`
      });
      this.obtenerCate();
    }).catch((err: any) => {
      Toast.fire({
        icon: 'error',
        
      });
      console.log(err);
    });
  }
  ActivarCategoria(id: string) {
    this.categoriasService.ActivarCategorias(id).then((data: any) => {
      const nombre = data.cont.strNombre;
      Toast.fire({
        icon: 'success',
        title: `¡La categoria: " ${nombre} " se activo correctamente!`
      });
      this.obtenerCate();
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
    });
  }
  mostrarActualizar(idCategorias: string) {
    this.idCategorias = idCategorias;
    this.actualizarCategorias = true;
    this.registrarCategorias = false;
  }
  terminarActualizacion(event) {
    this.ngOnInit();
    console.log(event);
    this.actualizarCategorias = false;
    this.registrarCategorias = true;
  }
  exportPDF() {
    let header = [
      {
        text: "Nombre",
        alignment: "center",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,

      },
      {
        text: "Descripcion",
        alignment: "center",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,

      },
      {
        text: "  Activo  ",
        alignment: "center",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      }

    ];
    this._PdfService.generatePdf(
      "Reporte de Categorias",
      header,
      this.arraNewCatagorias,
      "center"
    );
  }

  exportAsXLSX() {
    let jsnInfo = {};
    const jsnObject = [];

    if (this.categorias.length !== 0) {

      for (let datos of this.categorias) {
        jsnInfo = {};
        jsnInfo = {
          'Categorias': datos.strNombre,
          'Descripcion': datos.strDescripcion,
          'Activo': datos.blnActivo ? 'Si' : 'No'
        };
        if (jsnInfo !== '') {
          jsnObject.push(jsnInfo);
        }
      }
      this.excelService.exportAsExcelFile(jsnObject, `${this.title}`);
    }
  }
}
