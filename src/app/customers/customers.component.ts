import {Component, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {CustomerService} from "../Services/customer-service/customer.service";
import {Associate, Customer} from "../types";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CardModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{
  private customersService: CustomerService;
  public customers: Customer[] = [];
  public associates: Associate[] = [];
  constructor(customersService: CustomerService) {
    this.customersService = customersService;
  }

  ngOnInit(){
    //Init Customer Data
    this.customersService.customers
      .subscribe(value => this.customers = value);
  }
}
