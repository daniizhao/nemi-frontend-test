import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { BUTTON_STYLES } from '../../utils/enum/button-styles';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [TranslateModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})

export class ButtonComponent {

  @Input() label: string = '';
  @Input() style: BUTTON_STYLES = BUTTON_STYLES.PRIMARY;
  @Input() icon: string = '';
  @Input({transform: booleanAttribute}) disabled: boolean = false;
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  handleButtonClick() {
    this.onClick.emit();
  }

}
