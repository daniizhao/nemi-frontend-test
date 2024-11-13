import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {

  @Input({transform: booleanAttribute}) required: boolean = false;
  @Input() label: string = '';
  @Input() options: any[] = [];

  @Output() onSelectChange: EventEmitter<any> = new EventEmitter();

  constructor() {}

  handleSelectionChange(event: MatSelectChange) {
    this.onSelectChange.emit(event.value);
  }

}
