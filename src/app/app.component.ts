import { Component, HostListener, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  jsonData: any;
  localImageUrls: string[] = [
    './assets/img/meat.png',
    './assets/img/food truck.png',
    './assets/img/order_bg.png',
  ]


  currency = '$';
  loaderShowed = true;
  loader = true;


  orderImageStyle: any;
  mainImageStyle: any;


  form = this.fb.group({
    order: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
  });


  productsData: any;

  constructor (private fb: FormBuilder, private appService: AppService) {
  }


  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.orderImageStyle = {tranform: 'translate(-' + ((e.clientX * 0.3) / 8) + 'px, -' + ((e.clientY * 0.3) / 8) + 'px)'};
    this.mainImageStyle = {tranform: 'translate(-' + ((e.clientX * 0.3) / 8) + 'px, -' + ((e.clientY * 0.3) / 8) + 'px)'};
  }

  ngOnInit() {
    this.getDataFromExternalSite();

    setTimeout(() => {
      this.loaderShowed = false;
    }, 3000);
    setTimeout(() => {
      this.loader = false;
    }, 4000);
    this.appService.getData().subscribe(data => this.productsData = data);
  }
  getDataFromExternalSite() {
    this.appService.getData().subscribe(
      (data: any) => {
        this.jsonData = data;
        console.log(this.jsonData);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  updateDataUrl(extra: string) {
    this.appService.updateDataUrl(extra);
    this.getDataFromExternalSite();
  }

  updateImage(index: number) {
    if (index < this.localImageUrls.length) {
      this.jsonData.image = this.localImageUrls[index];
    }
  }

  scrollTo(target: HTMLElement, burger?: any) {
    target.scrollIntoView(
      {behavior: "smooth"}
      );
      if (burger) {
        this.form.patchValue({order: burger.title + ' (' + burger.price + ' ' + this.currency + ')'});
      };
  }

  confirmOrder() {
    if (this.form.valid) {

      this.appService.sendOrder(this.form.value)
      .subscribe(
        {
          next: (response: any) => {
            alert(response.message);
            this.form.reset(); // После заполнения форма очищается
          },
          error: (response) => {
            alert(response.error.message);
          },
        }
      );
    }
  }
  


  changeCurrency() {
    let newCurrency = '$';
    let coefficient = 1;


    if (this.currency === '$') {
        newCurrency = '₽';
        coefficient = 93;
    }
    else if (this.currency === '₽') {
        newCurrency = 'BYN';
        coefficient = 3;
    }
    else if (this.currency === 'BYN') {
        newCurrency = '€';
        coefficient = 0.9;
    } else if (this.currency === '€') {
        newCurrency = '¥';
        coefficient = 6.9;
    }
    this.currency = newCurrency; // Change text in Button
    // In each product block change the price of the product
    this.productsData.forEach((item: any) => {
      item.price = +(item.basePrice * coefficient).toFixed(1);
    });
  }

}
