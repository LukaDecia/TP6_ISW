import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoFormComponent } from './pedido-form/pedido-form.component';
import { CarritoComprasComponent } from './carrito-compras/carrito-compras.component';

const routes: Routes = [
  {path: '', redirectTo: 'carrito', pathMatch: 'full'},
  {path: 'carrito', component: CarritoComprasComponent},
  {path: 'pedido', component: PedidoFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
