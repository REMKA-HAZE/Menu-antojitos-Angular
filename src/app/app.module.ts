import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { PlatillosComponent } from './platillos/platillos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InstertarCategoriaComponent } from './categoria/insertar-categoria/insertar-categoria.component';
import { EditarCategoriaComponent } from './categoria/editar-categoria/editar-categoria.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { EditarPlatillosComponent } from './platillos/editar-platillos/editar-platillos.component';
import { InsertarPlatillosComponent } from './platillos/insertar-platillos/insertar-platillos.component';
@NgModule({
  declarations: [
    AppComponent,
    CategoriaComponent,
    PlatillosComponent,
    InstertarCategoriaComponent,
    EditarCategoriaComponent,
    EditarPlatillosComponent,
    InsertarPlatillosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FilterPipeModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
