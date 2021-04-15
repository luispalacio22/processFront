import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {
  private API_SERVER = "http://localhost:8080/usuario/perfil/";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllPerfiles(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }
}
