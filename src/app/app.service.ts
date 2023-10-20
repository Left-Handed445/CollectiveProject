import { Injectable } from '@angular/core'; // В этой папке, можно делать запросы на Back.
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private orderUrl = 'https://testologia.site/burgers-order';
  private dataUrl = 'https://testologia.site/burgers-data?extra=black';

  constructor(private http: HttpClient) {}


  sendOrder(data: any) {
    return this.http.post(this.orderUrl, data); // The data that will go to this site.
  }

  getData() {
    return this.http.get(this.dataUrl); // The data that will go to this site. https://testologia.site/burgers-data?extra=black
  }

  updateDataUrl(extra: string) {
    this.dataUrl = `https://testologia.site/burgers-data?extra=${extra}`;
  }
}
