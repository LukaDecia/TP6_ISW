import { Directive, Input, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControl][akoDisableIf], [formControlName][akoDisableIf], [formBuilder][akoDisableIf]',
  standalone: true
})
export class DisableIfDirective {

  @Input('akoDisableIf') set disableIf(condition : boolean){
    const control = this.ngControl.control;

    condition ? control?.disable() : control?.enable();
  }

  constructor(private ngControl : NgControl)
  {}

}
