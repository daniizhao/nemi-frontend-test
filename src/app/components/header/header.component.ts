import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
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

  @Input() title: string = 'SERVICES.TITLE';

  @Output() onTitleClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  handleTitleClick() {
    this.onTitleClick.emit();
  }

}
