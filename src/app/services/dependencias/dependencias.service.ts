import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DependenciasService {
  private API_SERVER = "http://localhost:8080/usuario/dependencia";
  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllDependencias(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }
}
