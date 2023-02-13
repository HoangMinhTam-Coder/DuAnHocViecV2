import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-message-error',
  templateUrl: './message-error.component.html',
  styleUrls: ['./message-error.component.css']
})
export class MessageErrorComponent {
  @Input() errors!: ValidationErrors | null
  @Input() label!:string;
  @Input() minLength!:number;
  @Input() maxLength!:number;
}
