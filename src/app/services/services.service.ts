import { Injectable } from "@angular/core";
import { JsonUtilsService } from "./jsonUtils.service";
import { map } from "rxjs";
import Service from "../utils/interfaces/service";

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

  getSortedByIdServices() {
    return this.jsonUtilsService.readJson('/data/services.json').pipe(
      map((result: any) => result.sort((a: Service, b: Service) => a.id - b.id))
    )
  }

}
