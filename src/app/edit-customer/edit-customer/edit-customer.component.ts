import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {Associate, Customer} from "../../types";
import {CustomerService} from "../../Services/customer-service/customer.service";

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    InputNumberModule,
    DropdownModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent implements OnInit,OnChanges{
  @Input() customer : Customer = {} as Customer;
  @Output() onSubmitEmitter = new EventEmitter<boolean>();
  customerService: CustomerService;
  associates: Associate[] = [];
  customers: Customer[] = [];

  /**
   Reactive Forms Pattern
   Chosen for structure, scalability and immutability.
   https://angular.io/guide/forms-overview#choosing-an-approach
   **/
  formGroup : FormGroup = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    phoneNumber: new FormControl(),
    associateId: new FormControl(),
    loyaltyPoints: new FormControl(0, Validators.min(0)),
    numberOfPurchases: new FormControl(0, Validators.min(0)),
  });

  constructor(customerService: CustomerService) {
    this.customerService = customerService;
  }

  ngOnInit() {
    this.customerService.associates
      .subscribe((value)=> this.associates = value);
    this.customerService.customers
      .subscribe((value)=> this.customers = value);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.formGroup.setValue({
      firstName: changes['customer'].currentValue.firstName ?? '',
      lastName: changes['customer'].currentValue.lastName ?? '',
      email: changes['customer'].currentValue.email ?? '',
      phoneNumber: changes['customer'].currentValue.phoneNumber ?? '',
      loyaltyPoints: changes['customer'].currentValue.loyaltyPoints ?? 0,
      numberOfPurchases: changes['customer'].currentValue.numberOfPurchases ?? 0,
      associateId: changes['customer'].currentValue.associateId ?? '',
    } as Customer
    );
  }

  /**
   * Resets Form Values to Customer object
   */
  onReset() {
    this.formGroup.setValue({
        firstName: this.customer.firstName,
        lastName:  this.customer.lastName,
        email:  this.customer.email,
        phoneNumber:  this.customer.phoneNumber,
        loyaltyPoints:  this.customer.loyaltyPoints,
        numberOfPurchases:  this.customer.numberOfPurchases,
        associateId:  this.customer.associateId,
      } as Customer
    );
  }

  /**
   * Invokes Supabase function to Update record on database
   * Emits boolean
   */
  onSubmit(){
    this.customer = {
      id: this.customer.id,
      ...this.formGroup.value
    };
    this.customerService.editCustomer(this.customer).subscribe(()=>{
      let index = this.customers
        .findIndex((customer)=> customer.id == this.customer.id);
      let associateIndex = this.associates
        .findIndex((associate)=> associate.id == this.customer.associateId);
      this.customer.associateName = this.associates[associateIndex].name;
      this.customers[index] = this.customer;
      this.customerService.customers.next(this.customers);

      this.onSubmitEmitter.emit(true);
    });
  };
}
