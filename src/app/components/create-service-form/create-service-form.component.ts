import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputComponent } from "../input/input.component";
import Service from '../../utils/interfaces/service';
import { SelectComponent } from "../select/select.component";
import { AREA_OPTIONS, CLIENTS_OPTIONS } from '../../utils/constants';
import { TranslateModule } from '@ngx-translate/core';
import { TimePickerComponent } from "../time-picker/time-picker.component";

@Component({
  selector: 'app-create-service-form',
  standalone: true,
  imports: [InputComponent, SelectComponent, TranslateModule, TimePickerComponent],
  templateUrl: './create-service-form.component.html',
  styleUrl: './create-service-form.component.scss'
})
export class CreateServiceFormComponent {

  @Input() initialData: Service | null = null;

  @Output() onSubmitClick: EventEmitter<any> = new EventEmitter();
  @Output() onCancelClick: EventEmitter<any> = new EventEmitter();

  area_options = AREA_OPTIONS;
  client_options = CLIENTS_OPTIONS;

  constructor() {}



}
