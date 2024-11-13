import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [MatCheckboxModule, FormsModule, TranslateModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {

  @Input({transform: booleanAttribute}) required: boolean = false;
  @Input() label: string = '';

  @Output() onCheckboxClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

}
