import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AddNewCustomerComponent} from "./add-new-customer/add-new-customer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomersComponent, AddNewCustomerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
