import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { Router } from '@angular/router';
import { CreateServiceFormComponent } from "../../components/create-service-form/create-service-form.component";
import Service from '../../utils/interfaces/service';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-create-service',
  standalone: true,
  imports: [HeaderComponent, CreateServiceFormComponent],
  templateUrl: './create-service.component.html',
  styleUrl: './create-service.component.scss'
})
export class CreateServiceComponent {

  constructor(
    private router: Router,
    private servicesService: ServicesService
  ) {

  }

  onNavigate(path: string) {
    this.router.navigate([path]);
  }

  onSubmit(formData: Service) {
    console.log("formdata", formData);
  }

  onCancel() {
    this.servicesService.createNewService({
      id: 1,
      name: "string",
      area: "string",
      client: "string",
      duration: "00:34:12",
      active: false,
      lat: 41.390205,
      lng: 2.154007
    })
    // this.onNavigate('');
  }

}
