import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.css']
})
export class PedidoFormComponent implements OnInit {

  // BANDERAS
  showProgramacion: boolean = false;
  showPagoEfectivo : boolean = false;
  showPagoTarjeta : boolean = false;
  submitted = false;

  // ARRAYS PARA COMBOS
  horarios = this.crearHorarios('09:00', '12:00');
  ciudades : string[] = ["Córdoba", "Villa Allende", "Alta Gracia"];

  //FormRegistro !: FormGroup;
  FormDireccion!: FormGroup;
  FormTarjeta !: FormGroup;
  FormEfectivo !: FormGroup;
  FormFecha !: FormGroup;

  // CALENDARIO
  currentDate = new Date();
  // Sumarle 20 días a la fecha actual
  maxDate = moment(this.currentDate).add(20, 'days').toDate();

  constructor(private formBuilder: FormBuilder , private router: Router) { }

    entregaInmediata(){
      const checked = document.getElementById("antesPosible") as HTMLInputElement
      console.log(checked.checked)
    }

  ngOnInit(): void {

    // FORM DIRECCIÓN

    this.FormDireccion = this.formBuilder.group({
      calle: ['',
                  [Validators.required,
                  Validators.minLength(4),
                  Validators.maxLength(50)]],
      nroCalle: [null,
                [Validators.required,
                Validators.pattern('[0-9]{1,5}')]]
    })

    // FORM EFECTIVO

    this.FormEfectivo = this.formBuilder.group({
      efectivo: [null,
        [Validators.required,
        Validators.pattern('[0-9]+')]]
    })

    // FORM PROGRAMAR ENVIO

    this.FormFecha = this.formBuilder.group({
      fechaDelivery: ['',Validators.required,]
    })

    //this.FormMio.statusChanges.subscribe((status) => checkEstadoDireccion(status));

    // FORM TARJETA

    this.FormTarjeta = this.formBuilder.group({
      nroTarjeta: [null,
        [Validators.required,
        Validators.pattern('[0-9]{16}')]],
      nombreTarjeta: ['',
              [Validators.required,
              Validators.pattern('[a-zA-Z]{4,50}')]],
      vencimiento: ['',
              [Validators.required,
              Validators.pattern('(0[1-9]|1[0-2])\/(?!20|21|22)[2-9][0-9](?<!01\/23|02\/23|03\/23|04\/23)')]],
      codigo: ['',
              [Validators.required,
              Validators.pattern('[0-9]{3,4}')]],
    })

  }

    //falta validar el efectivo
    confirmarBtnStatus() : boolean{
      if ((!this.showProgramacion || (this.showProgramacion && this.FormFecha.valid)) && this.FormDireccion.valid && ((this.showPagoEfectivo && this.FormEfectivo.valid) || (this.showPagoTarjeta && this.FormTarjeta.valid))){
        return true
      }
      return false
    }

  onSubmit() {
    this.submitted = true;
  }

  enviarFormulario() {
    console.log("Show programacion " + this.showProgramacion);
    console.log("Form mio " + this.FormDireccion.valid);
    console.log("Pago Efectivo " + this.showPagoEfectivo);
    console.log("Pago Tarjeta " + this.showPagoTarjeta);
    console.log("Form Tarjeat " + this.FormTarjeta.valid);

    this.router.navigate(['/pedidoRealizado']);
  }

  crearHorarios(horaInicio:string, horaFin:string) {
    const horarios = [];
    let hora = new Date(`01/01/2000 ${horaInicio}`);

    while (hora <= new Date(`01/01/2000 ${horaFin}`)) {
      let horaFormato12h = hora.toLocaleTimeString('en-US', {hour12: true});
      let horaAMPM = horaFormato12h.slice(-2); // Obtenemos los últimos 2 caracteres

      // Agregamos un cero delante de los minutos si son menores a 10
      let minutos = hora.getMinutes() < 10 ? `0${hora.getMinutes()}` : hora.getMinutes();

      // Agregamos la hora en formato AM/PM al arreglo de horarios
      horarios.push(`${hora.getHours()}:${minutos} ${horaAMPM}`);

      // Sumamos 30 minutos a la hora actual
      hora.setMinutes(hora.getMinutes() + 30);
    }

    return horarios;
  }

}

    /*
    this.FormRegistro = this.formBuilder.group({
      calle: ['',
                  [Validators.required,
                  Validators.minLength(4),
                  Validators.maxLength(50)]],
      nroCalle: [null,
                    [Validators.required,
                    Validators.pattern('[0-9]{1,5}')]],
      efectivo: [null,
                    [Validators.required,
                    Validators.pattern('[0-9]+')]],
      nroTarjeta: [null,
                    [Validators.required,
                    Validators.pattern('[0-9]{16}')]],
      nombreTarjeta: ['',
                    [Validators.required,
                    Validators.pattern('[a-zA-Z]{4,50}')]],
      vencimiento: ['',
                    [Validators.required,
                    Validators.pattern('(0[1-9]|1[0-2])\/(?!20|21|22)[2-9][0-9](?<!01\/23|02\/23|03\/23|04\/23)')]],
      codigo: ['',
                    [Validators.required,
                    Validators.pattern('[0-9]{3,4}')]],
      fechaDelivery: ['',Validators.required,],

    })
    */
