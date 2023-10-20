import { Injectable } from '@angular/core'; // В этой папке, можно делать запросы на Back.
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {}


  sendOrder(data: any) {
    return this.http.post('https://testologia.site/burgers-order', data); // The data that will go to this site.
  }

  getData() {
    return this.http.get('https://testologia.site/burgers-data?extra=black'); // The data that will go to this site.
  }
}
