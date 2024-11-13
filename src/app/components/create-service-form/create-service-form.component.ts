import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputComponent } from "../input/input.component";
import Service from '../../utils/interfaces/service';
import { SelectComponent } from "../select/select.component";
import { AREA_OPTIONS, CLIENTS_OPTIONS } from '../../utils/constants';
import { TranslateModule } from '@ngx-translate/core';
import { TimePickerComponent } from "../time-picker/time-picker.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";
import { ButtonComponent } from "../button/button.component";
import { BUTTON_STYLES } from '../../utils/enum/button-styles';

@Component({
  selector: 'app-create-service-form',
  standalone: true,
  imports: [InputComponent, SelectComponent, TranslateModule, TimePickerComponent, CheckboxComponent, ButtonComponent],
  templateUrl: './create-service-form.component.html',
  styleUrl: './create-service-form.component.scss'
})
export class CreateServiceFormComponent {

  @Input() initialData: Service | null = null;

  @Output() onSubmitClick: EventEmitter<any> = new EventEmitter();
  @Output() onCancelClick: EventEmitter<any> = new EventEmitter();

  areaOptions = AREA_OPTIONS;
  clientOptions = CLIENTS_OPTIONS;

  buttonStyles = BUTTON_STYLES;

  constructor() {}

  handleSubmitButton() {
    this.onSubmitClick.emit();
  }

  handleCancelButton() {
    this.onCancelClick.emit();
  }

}
