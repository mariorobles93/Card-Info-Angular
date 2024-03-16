import { Component } from '@angular/core';
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
export class CustomersComponent {
  private customerService: CustomerService;
  public customers: Customer[] = [];
  public associates: Associate[] = [];
  constructor(customersService: CustomerService) {
    this.customerService = customersService;

    this.getCustomers();
  }

  getCustomers(){
    let customers: Customer[];

    this.customerService.getCustomers().subscribe((res)=>{
      this.customerService.getAssociates().subscribe((response)=>{
        this.associates = response.data;
        this.customers = res.data;
        customers.forEach((customer: Customer)=>{
          let index = this.associates.findIndex((value : Associate)=>  value.id == customer.associateId);
          customer.associateName = this.associates[index].name;
        })
        this.customers = customers;
      });
    });
  };

  getAssociates(): Associate[]{
    let associates : Associate[] = [];
    this.customerService.getAssociates()
      .subscribe({
        next(data){
          associates = data;
        },
        error(error){
          console.error(error);
        }
      });
    return associates;
  };

}
