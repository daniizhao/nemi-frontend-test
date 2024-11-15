import { Injectable } from "@angular/core";
import { map } from "rxjs";
import Service from "../utils/interfaces/service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ServicesService {

  BASE_API_URL: string = 'http://localhost:3000/api/services';

  constructor(
    private http: HttpClient
  ) {

  }

  getServices() {
    return this.http.get(`${this.BASE_API_URL}`).pipe(
      map((result: any) => result.data)
    );
  }

  getServiceById(serviceId: number) {
    return this.http.get(`${this.BASE_API_URL}/${serviceId}`).pipe(
      map((result: any) => result.data)
    );
  }

  getSortedByIdServices() {
    return this.http.get(`${this.BASE_API_URL}`).pipe(
      map((result: any) => result.data.sort((a: Service, b: Service) => a.id - b.id))
    )
  }

  createNewService(body: Service) {
    return this.http.post(`${this.BASE_API_URL}/create`, body);
  }

  editService(serviceId: number, newData: Service) {
    return this.http.put(`${this.BASE_API_URL}/${serviceId}/edit`, newData);
  }

  deleteService(serviceId: number) {
    return this.http.delete(`${this.BASE_API_URL}/${serviceId}/delete`);
  }

}
