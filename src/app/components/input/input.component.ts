import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, TranslateModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {

  @Input() type: string = 'text';
  @Input() label: string = '';
  @Input() icon: string = '';
  @Output() onKeyUp: EventEmitter<any> = new EventEmitter();

  constructor() {}

  handleKeyUp(event: Event) {
    this.onKeyUp.emit(event);
  }

}
