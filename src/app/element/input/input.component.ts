import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() disable!:boolean;
  @Input() minlength!:number;
  @Input() errors!: ValidationErrors | null
  @Input() type!:string;
  value!:string;
  isDirty:boolean = false;
  isTouck:boolean = false;

  onChange!: (value: any) => void;
  onTouched!: (value: any) => void;

  constructor() {}
  ngOnInit() {}

  writeValue(obj: any): void {
    this.value = obj
  }

  registerOnChange(fn: any): void {
    this.onChange = (event:any) => {
      fn(event.target.value);
      this.isDirty = true;
    };

  }

  registerOnTouched(fn: any): void {
    this.onTouched = (event:any) => {
      fn(event.target.value);
      this.isTouck = true;
    }
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled = this.disable;
  }
}
