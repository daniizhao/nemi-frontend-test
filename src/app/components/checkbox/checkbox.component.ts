import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [
    MatCheckboxModule,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {

  @Input({transform: booleanAttribute}) required: boolean = false;
  @Input() label: string = '';
  @Input({transform: booleanAttribute}) checked: boolean = false;

  @Output() onCheckboxChange: EventEmitter<any> = new EventEmitter();

  constructor() {}

  handleCheckboxChange(event: MatCheckboxChange) {
    this.onCheckboxChange.emit(event.checked);
  }

}
