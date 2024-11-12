import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from "../../components/header/header.component";
import { Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import Service from '../../utils/interfaces/service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TranslateModule, HeaderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  services: Service[] = [];

  constructor(
    private router: Router,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.servicesService.getServices().subscribe((data: any) => {
      this.services = data;
    })
  }

  onNavigate(path: string) {
    this.router.navigate([path]);
  }

}
