import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-time-picker',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, TranslateModule, FormsModule, CommonModule],
  templateUrl: './time-picker.component.html',
  styleUrl: './time-picker.component.scss'
})
export class TimePickerComponent implements OnInit {

  @Input({transform: booleanAttribute}) required: boolean = false;
  @Input() label: string = '';
  @Input() timeValue: string = '';

  @Output() onValueChange: EventEmitter<any> = new EventEmitter();

  minute_options: string[] = [];
  seconds_options: string[] = [];

  split_time: string[] = [];

  showDropdown: boolean = false;

  constructor() {}

  private formatNumberToString(n: number) {
    return n.toLocaleString(navigator.language, {
      minimumIntegerDigits: 2
    });
  }

  ngOnInit(): void {
    for(let i = 0; i < 60; i++) {
      this.minute_options.push(this.formatNumberToString(i));
      this.seconds_options.push(this.formatNumberToString(i));
    }
    this.split_time = this.timeValue.split(':');
    console.log("split", this.split_time)
  }

  private scrollSelectedOptionsIntoView() {
    let elements = document.querySelectorAll('.selected');
    console.log("elements", elements)
    elements.forEach((element) => {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    })
  }

  toggleShowDropdown(show: boolean) {
    this.showDropdown = show;
    if (show) {
      setTimeout(() => {
        this.scrollSelectedOptionsIntoView();
      }, 100)
    }
  }

  preventBlurOnDropdown(event: Event) {
    event.preventDefault();
  }

  onSelectMinute(minValue: string) {
    this.split_time[0] = minValue;
    this.onValueChange.emit(this.split_time.join(':'));
  }

  onSelectSeconds(secValue: string) {
    this.split_time[1] = secValue;
    this.onValueChange.emit(this.split_time.join(':'));
  }
}
