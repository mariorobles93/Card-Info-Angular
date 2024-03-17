import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {CustomerService} from "../Services/customer-service/customer.service";
import {Customer} from "../types";

@Component({
  selector: 'app-add-new-customer',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './add-new-customer.component.html',
  styleUrl: './add-new-customer.component.css'
})
export class AddNewCustomerComponent implements OnInit{
  /**
  Reactive Forms Pattern
    Chosen for structure, scalability and immutability.
  https://angular.io/guide/forms-overview#choosing-an-approach
  **/
  formGroup : FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    phoneNumber: new FormControl()
  });

  customers: Customer[] = [];
  customersService: CustomerService;
  constructor(customerService: CustomerService) {
    this.customersService = customerService;
  }

  ngOnInit() {
    //Init Customer Data
    this.customersService.customers
      .subscribe(value => this.customers = value);
  }

  /**
   * Invokes the CustomerService to register a new customer using data collected
   */
  onSubmit(){
    this.customersService.addCustomer(this.formGroup.value)
      .then((response :any)=>{
        this.customers.unshift(response?.data[0] as Customer);
        this.customersService.customers.next(this.customers);
    });
  }
}
