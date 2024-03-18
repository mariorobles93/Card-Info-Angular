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
    associateName: new FormControl(),
    loyaltyPoints: new FormControl(0, Validators.min(0)),
    numberOfPurchases: new FormControl(0, Validators.min(0)),
  });

  constructor(customerService: CustomerService) {
    this.customerService = customerService;
  }
  ngOnInit() {
    this.customerService.associates
      .subscribe((value)=> this.associates = value);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.formGroup.setValue({
      firstName: changes['customer'].currentValue.firstName ?? '',
      lastName: changes['customer'].currentValue.lastName ?? '',
      email: changes['customer'].currentValue.email ?? '',
      phoneNumber: changes['customer'].currentValue.phoneNumber ?? '',
      loyaltyPoints: changes['customer'].currentValue.loyaltyPoints ?? 0,
      numberOfPurchases: changes['customer'].currentValue.numberOfPurchases ?? 0,
      associateName: changes['customer'].currentValue.associateName ?? ''
    } as Customer
    );
  }

  onSubmit(){
    this.onSubmitEmitter.emit(true);
  };
}
