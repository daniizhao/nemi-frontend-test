import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputComponent } from "../input/input.component";
import Service from '../../utils/interfaces/service';
import { SelectComponent } from "../select/select.component";
import { AREA_OPTIONS, BCN_COORDS, CLIENTS_OPTIONS } from '../../utils/constants';
import { TranslateModule } from '@ngx-translate/core';
import { TimePickerComponent } from "../time-picker/time-picker.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";
import { ButtonComponent } from "../button/button.component";
import { BUTTON_STYLES } from '../../utils/enum/button-styles';
import { MapComponent } from "../map/map.component";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-service-form',
  standalone: true,
  imports: [InputComponent, SelectComponent, TranslateModule, TimePickerComponent, CheckboxComponent, ButtonComponent, MapComponent,FormsModule, ReactiveFormsModule],
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

  form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      area: new FormControl('', Validators.required),
      client: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
      active: new FormControl(false, Validators.required),
      lat: new FormControl(BCN_COORDS.lat, Validators.required),
      lng: new FormControl(BCN_COORDS.lng, Validators.required)
    });
  }

  onFieldChange(fieldId: string, value: string | number | boolean) {
    this.form.patchValue({
      [fieldId]: Number.isNaN(Number(value)) ? value : Number(value)
    });
  }

  handleSubmitButton() {
    this.onSubmitClick.emit(this.form.value);
  }

  handleCancelButton() {
    this.onCancelClick.emit();
  }

}
