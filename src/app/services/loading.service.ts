import { Injectable, signal, WritableSignal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class LoadingService {

  isLoading: WritableSignal<boolean> = signal(false);

  constructor() {}

  getIsLoading() {
    return this.isLoading();
  }

  showLoading() {
    this.isLoading.set(true);
  }

  hideLoading() {
    this.isLoading.set(false);
  }
}
