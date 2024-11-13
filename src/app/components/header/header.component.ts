import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() title: string = '';
  @Input({transform: booleanAttribute}) hasBackButton: boolean = false;
  @Output() onBackClick: EventEmitter<any> = new EventEmitter();

  @Input({transform: booleanAttribute}) isTitleClickable: boolean = false;
  @Output() onTitleClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  handleBackClick() {
    this.onBackClick.emit();
  }

  handleTitleClick() {
    this.onTitleClick.emit();
  }

}
