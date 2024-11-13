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

  hourOptions: string[] = [];
  minuteOptions: string[] = [];
  secondsOptions: string[] = [];

  splitTime: string[] = ['00', '00', '00'];

  showDropdown: boolean = false;

  constructor() {}

  private formatNumberToString(n: number) {
    return n.toLocaleString(navigator.language, {
      minimumIntegerDigits: 2
    });
  }

  ngOnInit(): void {
    this.hourOptions = Array.from({length: 24}, (_, i) => this.formatNumberToString(i));
    this.minuteOptions = Array.from({length: 60}, (_, i) => this.formatNumberToString(i));
    this.secondsOptions = Array.from({length: 60}, (_, i) => this.formatNumberToString(i));
    if (this.timeValue !== '') {
      this.splitTime = this.timeValue.split(':');
    }
  }

  private scrollSelectedOptionsIntoView() {
    let elements = document.querySelectorAll('.selected');
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
      }, 200);
    }
  }

  preventBlurOnDropdown(event: Event) {
    event.preventDefault();
  }

  onSelectChange(splitIndex: number, value: string) {
    this.splitTime[splitIndex] = value;
    this.onValueChange.emit(this.splitTime.join(':'));
  }
}
