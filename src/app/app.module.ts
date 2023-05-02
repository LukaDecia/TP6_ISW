import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PedidoFormComponent } from './pedido-form/pedido-form.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarritoComprasComponent } from './carrito-compras/carrito-compras.component';
import { DisableIfDirective } from './disable-if.directive';
import { PedidoRealizadoComponent } from './pedido-realizado/pedido-realizado.component';

@NgModule({
  declarations: [
    AppComponent,
    PedidoFormComponent,
    HeaderComponent,
    FooterComponent,
    CarritoComprasComponent,
    PedidoRealizadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DisableIfDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
