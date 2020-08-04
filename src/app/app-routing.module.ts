import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { PlatillosComponent } from './platillos/platillos.component';


const routes: Routes = [
  { path: 'categoria', component: CategoriaComponent, data: { titulo: 'categoria'}},
  { path: 'platillos/:idCategoria', component: PlatillosComponent, data: { titilo: 'Platillos'}}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
