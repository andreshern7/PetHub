import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pet-hub';

  // http = inject(HttpClient);

  //This methos it's executed when the component has render initially
  // ngOnInit(){
    // this.http.get('https://api.escuelajs.co/api/v1/products')
    // .subscribe((data:any) => {

    // })
  // }
}
