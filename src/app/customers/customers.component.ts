import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CardModule} from "primeng/card";
import {CustomerService} from "../Services/customer-service/customer.service";
import {Customer} from "../types";
import {NgForOf, NgIf} from "@angular/common";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CardModule,
    NgForOf,
    NgIf,
    ButtonModule
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{
  private customersService: CustomerService;
  public customers: Customer[] = [];

  @Output() onEditClickEmitter = new EventEmitter<Customer>();

  constructor(customersService: CustomerService) {
    this.customersService = customersService;
  }

  ngOnInit(){
    //Init Customer Data
    this.customersService.customers
      .subscribe(value => this.customers = value);
  }

  editCustomer(customer: Customer){
    this.onEditClickEmitter.emit(customer);
  }
}
