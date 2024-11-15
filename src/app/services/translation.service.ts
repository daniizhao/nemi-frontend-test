import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class TranslationService {
  defaultLang = 'en';

  constructor(
    private translateService: TranslateService,
  ) {
    this.translateService.setDefaultLang(this.defaultLang);
    this.translateService.use(this.defaultLang);
  }

}
