import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { Router } from '@angular/router';
import { CreateServiceFormComponent } from "../../components/create-service-form/create-service-form.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-create-service',
  standalone: true,
  imports: [
    HeaderComponent,
    CreateServiceFormComponent,
    TranslateModule
  ],
  templateUrl: './create-service.component.html',
  styleUrl: './create-service.component.scss'
})
export class CreateServiceComponent {

  constructor(
    private router: Router
  ) {}

  onNavigate(path: string) {
    this.router.navigate([path]);
  }

}
