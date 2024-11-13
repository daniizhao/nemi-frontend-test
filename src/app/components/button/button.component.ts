import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

enum BUTTON_STYLES {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}
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
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  handleButtonClick() {
    this.onClick.emit();
  }

}
