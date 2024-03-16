import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {CustomerService} from "../Services/customer-service/customer.service";

@Component({
  selector: 'app-add-new-customer',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './add-new-customer.component.html',
  styleUrl: './add-new-customer.component.css'
})
export class AddNewCustomerComponent {
  formGroup : FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    phoneNumber: new FormControl()
  });

  customerService: CustomerService;
  constructor(customerService: CustomerService) {
    this.customerService = customerService;
  }

  addNewCustomer(){
    this.customerService.addCustomer(this.formGroup.value)
      .then((response)=>{
        console.log(response);
        this.customerService.getCustomers();
    });
  }
}
