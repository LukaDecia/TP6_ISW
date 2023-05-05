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
  showErrorVencimiento: boolean = false;
  submitted = false;

  // ARRAYS PARA COMBOS
  horarios = this.crearHorarios('08:00', '23:00');
  ciudades : string[] = ["Córdoba", "Villa Carlos Paz", "San Francisco"];

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
                  Validators.minLength(1),
                  Validators.maxLength(100)]],
      nroCalle: [null,
                [Validators.required,
                Validators.pattern('[0-9]{1,5}')]],
      referencia: ['',
                [Validators.minLength(1),
                Validators.maxLength(100)]],
    })

    // FORM EFECTIVO

    this.FormEfectivo = this.formBuilder.group({
      efectivo: [null,
        [Validators.required]]
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
        Validators.pattern('^4[0-9]{15}$')]],
      nombreTarjeta: ['',
              [Validators.required,
              Validators.pattern('[a-zA-Z]{1,100}')]],
      codigo: ['',
              [Validators.required,
              Validators.pattern('[0-9]{3}')]],
    })

  }

    confirmarBtnStatus() : boolean{
      if ((!this.showProgramacion || (this.showProgramacion && this.FormFecha.valid)) && this.FormDireccion.valid && ((this.showPagoEfectivo && this.validarEfectivo()) || (this.showPagoTarjeta && this.FormTarjeta.valid && this.obtenertodo()))){
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

  obtenertodo(){
    const input = document.getElementById(
      'mesFecha',
    ) as HTMLInputElement;
    const validoformato: number = input.value.length
    const character: string = '/';
    const index: number = (input.value).indexOf(character);
    if (validoformato != 7) {
      this.showErrorVencimiento = true
      ;
    } else {
      if (index == -1) {
        this.showErrorVencimiento = true
        ;
      }
      else{
        var mes: string = (input.value).substring(0, index);
        var mesN : number = +mes
        if (mes.length != 2){
          this.showErrorVencimiento = true
          ;
        }
        else{
          if (mesN < 1 || mesN > 12){
            this.showErrorVencimiento = true
            ;
          }
          else{
            var year: string = (input.value).slice((input.value).indexOf('/') + 1);
            var yearN : number = +year
            if (yearN < 2023 || yearN > 9999){
              this.showErrorVencimiento = true
            }
            else{
              if (yearN == 2023 && mesN < 5) {
                this.showErrorVencimiento = true
              } else {
                this.showErrorVencimiento = false
              }
            }
          }
        }
      }
    }
    return this.showErrorVencimiento
    console.log(this.showErrorVencimiento)

  }

  validarEfectivo(){
    const input = document.getElementById(
      'montoEfectivo',
    ) as HTMLInputElement;

    const monto: string = input.value;
    var montoValidar : number = +monto
    if (montoValidar < 8900) return false
    return true
  }

  displayM(){
    const input = document.getElementById(
      'mesFecha',
    ) as HTMLInputElement;
    const aux = input.value
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
