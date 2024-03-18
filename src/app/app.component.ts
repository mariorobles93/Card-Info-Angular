import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AddNewCustomerComponent} from "./add-new-customer/add-new-customer.component";
import {EditCustomerComponent} from "./edit-customer/edit-customer/edit-customer.component";
import {Customer} from "./types";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomersComponent, AddNewCustomerComponent, EditCustomerComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  customer : Customer = {} as Customer;
  isEdit: boolean = false;
  setEditCustomer(customer: Customer, isEdit: boolean = false){
    this.customer = customer;
    this.isEdit = isEdit;
  }
}
