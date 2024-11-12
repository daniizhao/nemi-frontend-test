import { Injectable } from "@angular/core";
import { JsonUtilsService } from "./jsonUtils.service";

@Injectable({
  providedIn: 'root'
})

export class ServicesService {

  constructor(
    private jsonUtilsService: JsonUtilsService
  ) {

  }

  getServices() {
    return this.jsonUtilsService.readJson('/data/services.json');
  }

}
