import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { InputComponent } from "../input/input.component";
import Service from '../../utils/interfaces/service';
import { SelectComponent } from "../select/select.component";
import { AREA_OPTIONS, BCN_COORDS, CLIENTS_OPTIONS } from '../../utils/constants';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TimePickerComponent } from "../time-picker/time-picker.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";
import { ButtonComponent } from "../button/button.component";
import { BUTTON_STYLES } from '../../utils/enum/button-styles';
import { MapComponent } from "../map/map.component";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { HTTP_CODES } from '../../utils/enum/http-codes';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { LoadingService } from '../../services/loading.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MapMarkerInfo } from '../../utils/interfaces/mapMarker';

@Component({
  selector: 'app-create-service-form',
  standalone: true,
  imports: [
    InputComponent,
    SelectComponent,
    TranslateModule,
    TimePickerComponent,
    CheckboxComponent,
    ButtonComponent,
    MapComponent,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './create-service-form.component.html',
  styleUrl: './create-service-form.component.scss'
})
export class CreateServiceFormComponent {

  private loadingService = inject(LoadingService);
  private _snackBar = inject(MatSnackBar);

  @Input() isEdit: boolean = false;
  _initialData: Service;
  @Input() set initialData(value: Service | null) {
    if (value) {
      this.isEdit = true;
      this._initialData = value;
      this.form.controls['id'].setValue(value.id);
      this.form.controls['name'].setValue(value.name);
      this.form.controls['area'].setValue(value.area);
      this.form.controls['client'].setValue(value.client);
      this.form.controls['duration'].setValue(value.duration);
      this.form.controls['active'].setValue(value.active);
      this.form.controls['lat'].setValue(value.lat);
      this.form.controls['lng'].setValue(value.lng);
      this.form.controls['freePoints'].setValue(value?.freePoints);
    }
  }
  hasChanges: boolean = false;

  @Output() onSubmitClick: EventEmitter<any> = new EventEmitter();
  @Output() onCancelClick: EventEmitter<any> = new EventEmitter();

  areaOptions = AREA_OPTIONS;
  clientOptions = CLIENTS_OPTIONS;

  buttonStyles = BUTTON_STYLES;

  form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private servicesService: ServicesService,
    private translateService: TranslateService
  ) {
    this.form = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      area: new FormControl(null, Validators.required),
      client: new FormControl(null, Validators.required),
      duration: new FormControl(null, Validators.required),
      active: new FormControl(false, Validators.required),
      lat: new FormControl(BCN_COORDS.lat, Validators.required),
      lng: new FormControl(BCN_COORDS.lng, Validators.required),
      freePoints: new FormControl([])
    });
  }

  detectChanges() {
    const changes = Object.fromEntries(
      Object.entries(this._initialData)
      .filter(([key, val]) => String(this.form.controls[key].value) !== String(val)));

    if (Object.entries(changes).length > 0) {
      this.hasChanges = true
    } else {
      this.hasChanges = false;
    }
  }

  onFieldChange(fieldId: string, value: string | number | boolean) {
    let finalValue: any = value;
    if (value === null || value === '') {
      finalValue = null;
    } else {
      if (fieldId === 'freePoints') {
        finalValue = [...this.form.controls[fieldId].value, value];
      }
    }
    this.form.patchValue({
      [fieldId]: finalValue
    });
    this.detectChanges();
  }

  handleSubmitButton() {
    this.loadingService.showLoading();
    if (this.isEdit) {
      this.servicesService.editService(this._initialData.id, this.form.value).subscribe({
        next: () => {
          this._snackBar.open(
            this.translateService.instant('CREATE_SERVICE.MESSAGES.SUCCESS_EDIT'),
            this.translateService.instant('LABELS.OK'),
            {
              duration: 1500
            }
          );
          setTimeout(() => {
            this.loadingService.hideLoading();
            this.router.navigate(['']);
          }, 1500);
        },
        error: (error) => {
          this.errorHandler(error);
        }
      })
    } else {
      this.servicesService.createNewService(this.form.value).subscribe({
        next: () => {
          this._snackBar.open(
            this.translateService.instant('CREATE_SERVICE.MESSAGES.SUCCESS_CREATE'),
            this.translateService.instant('LABELS.OK'),
            {
              duration: 1500
            }
          );
          setTimeout(() => {
            this.loadingService.hideLoading();
            this.router.navigate(['']);
          }, 1500);
        },
        error: (error) => {
          this.errorHandler(error);
        },
      })
    }
  }

  errorHandler(error: HttpErrorResponse) {
    if (error.status === HTTP_CODES.CONFLICT) {
      this._snackBar.open(
        error.error.message,
        this.translateService.instant('LABELS.OK'),
        {
          duration: 1500
        }
      );
    } else {
      this._snackBar.open(
        this.translateService.instant('ERROR.INTERNAL'),
        this.translateService.instant('LABELS.OK'),
        {
          duration: 1500
        }
      );
    }
    setTimeout(() => {
      this.loadingService.hideLoading();
    }, 1000);
  }

  handleCancelButton() {
    this.router.navigate(['']);
  }

}
