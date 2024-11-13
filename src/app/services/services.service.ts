import { Injectable } from "@angular/core";
import { JsonUtilsService } from "./jsonUtils.service";
import { map } from "rxjs";
import Service from "../utils/interfaces/service";

@Injectable({
  providedIn: 'root'
})

export class ServicesService {

  servicesJsonFilePath = '/data/services.json';

  constructor(
    private jsonUtilsService: JsonUtilsService
  ) {

  }

  getServices() {
    return this.jsonUtilsService.readJson(this.servicesJsonFilePath);
  }

  getSortedByIdServices() {
    return this.jsonUtilsService.readJson(this.servicesJsonFilePath).pipe(
      map((result: any) => result.sort((a: Service, b: Service) => a.id - b.id))
    )
  }

  createNewService(body: Service) {
    this.getServices().subscribe(
      (services) => {
        console.log("test", services);
        // let newServicesList: Service[] = services;
      }
    );
    // return this.jsonUtilsService.writeJson(this.servicesJsonFilePath)
  }

}
