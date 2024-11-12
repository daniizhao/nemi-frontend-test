import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() title: string = '';
  @Input({transform: booleanAttribute}) isTitleClickable: boolean = false;
  @Output() onTitleClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  handleTitleClick() {
    this.onTitleClick.emit();
  }

}
