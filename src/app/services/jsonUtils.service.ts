import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class JsonUtilsService {

  constructor(
    private http: HttpClient
  ) {

  }

  readJson(path: string) {
    return this.http.get(path);
  }

  writeJson(path: string, content: any) {

  }

}
