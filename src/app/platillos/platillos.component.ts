import { Component, OnInit } from '@angular/core';
import { PlatillosService } from '../services/platillos.service';
import { PdfServiceService } from '../services/PDF/pdf-service.service';
import { ExportDataService } from '../services/export-data/export-data.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});
@Component({
  selector: 'app-platillos',
  templateUrl: './platillos.component.html',
  styleUrls: ['./platillos.component.css']
})
export class PlatillosComponent implements OnInit {
  actualizarPlatillos: boolean = false;
  registrarPlatillos: boolean = true;
  platillos: any;
  idPlatillos: string;
  arraPlatillos = [];
  arraNewPlatillos = [];
  title: string;
  searchText = {strNombre:''};
  cargando: boolean;
  categoria: any;
  constructor( private platillosService: PlatillosService,private _PdfService: PdfServiceService, private excelService: ExportDataService,public activateRoute: ActivatedRoute) {
    this.title = "Reporte de Platillos";
    this.categoria = activateRoute.snapshot.params.idCategoria;
  }

  ngOnInit(): void {
    this.obtenerPlatillo();
    this.arraPlatillos = [];
  }

  obtenerPlatillo(){
    this.platillosService.obtenerPlatillos(this.categoria).then((resp: any) => {
      console.log(resp);
      this.platillos = resp.cont;
  
      for (const platillo of this.platillos) {
        let element = [
  
          platillo.strNombre.replace(/\:null/gi, ':""'),
          platillo.strDescripcion.replace(/\:null/gi, ':""'),
          platillo.strIngredientes,
          platillo.nmbPiezas,
          platillo.nmbPrecio,
          platillo.blnActivo ? 'Si' : 'No',
  
        ];
  
        this.arraPlatillos.push(element);
        this.arraNewPlatillos = this.arraPlatillos;
      }
    }).catch((err: any) => {
     
      Toast.fire({
        icon: 'error',
        title: err
      });
      console.log(err);
    });
    this.platillos = [];
  } 

  eliminarPlatillos(id: string) {
    this.platillosService.eliminarPlatillo(id).then((data: any) => {
      const nombre = data.cont.strNombre;
      Toast.fire({
        icon: 'success',
        title: `¡El platillo:" ${nombre} " se desactivo correctamente!`
      });
      this.obtenerPlatillo();
    }).catch((err: any) => {
      Toast.fire({
        icon: 'error',
        
      });
      console.log(err);
    });
  }

  ActivarPlatillo(id: string) {
    this.platillosService.ActivarPlatillos(id).then((data: any) => {
      const nombre = data.cont.strNombre;
      Toast.fire({
        icon: 'success',
        title: `¡El platillo: " ${nombre} " se activo correctamente!`
      });
      this.obtenerPlatillo();
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
    });
  }
  mostrarActualizar(idPlatillos: string) {
    this.idPlatillos = idPlatillos;
    this.actualizarPlatillos = true;
    this.registrarPlatillos = false;
  }
  terminarActualizacion(event:any) {
    this.ngOnInit();
    console.log(event);
    this.actualizarPlatillos = false;
    this.registrarPlatillos = true;
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
        text: "Ingredientes",
        alignment: "center",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,

      },
      {
        text: "Numero de Piezas",
        alignment: "center",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,

      },
      {
        text: "Precio",
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
      this.arraNewPlatillos,
      "center"
    );
  }
  exportAsXLSX() {
    let jsnInfo = {};
    const jsnObject = [];

    if (this.platillos.length !== 0) {

      for (let datos of this.platillos) {
        jsnInfo = {};
        jsnInfo = {
          'Categorias': datos.strNombre,
          'Descripcion': datos.strDescripcion,
          'Ingredientes': datos.strIngredientes,
          'Piezas': datos.nmbPiezas,
          'Precio': datos.nmbPrecio,
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