import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showProductos: boolean = true;


  arrayProductos = [
    {
      nombre: "Big Mac",
      cantidad: 1,
      precio: 1720
    },
    {
      nombre: "Cuarto de Libra con Queso",
      cantidad: 1,
      precio: 1820
    },
    {
      nombre: "Papas Fritas Grandes",
      cantidad: 2,
      precio: 1200
    },
    {
      nombre: "Papas Fritas Grandes",
      cantidad: 2,
      precio: 1200
    },
    {
      nombre: "Coca Cola Mediana",
      cantidad: 1,
      precio: 560
    },
    {
      nombre: "Sprite sin azucar Grande",
      cantidad: 1,
      precio: 600
    },
    {
      nombre: "McFlurry Oreo",
      cantidad: 2,
      precio: 1800
    }
  ]

  arrayCarrito = this.arrayProductos;
  totalCarrito = this.calcularTotalCarrito();

  calcularTotalCarrito(){
    let suma : number = 0;
    for(let i=0; i < this.arrayProductos.length; i++){
      suma += this.arrayProductos[i].precio;
    }
    return suma
  }

}
