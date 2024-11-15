import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoadingService } from '../../services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    CommonModule
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {

  showLoading: boolean = false;
  private loadingService = inject(LoadingService);

  constructor() {
    effect(() => {
      this.showLoading = this.loadingService.getIsLoading();
    })
  }

}
