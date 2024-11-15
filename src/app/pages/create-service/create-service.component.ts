import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CreateServiceFormComponent } from "../../components/create-service-form/create-service-form.component";
import { TranslateModule } from '@ngx-translate/core';
import { ServicesService } from '../../services/services.service';
import Service from '../../utils/interfaces/service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-service',
  standalone: true,
  imports: [
    HeaderComponent,
    CreateServiceFormComponent,
    TranslateModule,
    MatIconModule
  ],
  templateUrl: './create-service.component.html',
  styleUrl: './create-service.component.scss'
})
export class CreateServiceComponent {

  serviceId: number;
  serviceData: Service | null = null;
  isEdit: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private servicesService: ServicesService
  ) {
    this.route.params.subscribe(params => {
      if (params['id']){
        this.isEdit = true;
        this.serviceId = Number(params['id']);
        this.servicesService.getServiceById(this.serviceId).subscribe({
          next: (data) => {
            this.serviceData = data as Service;
          }
        })
      }
    })
  }

  onNavigate(path: string) {
    this.router.navigate([path]);
  }

}
