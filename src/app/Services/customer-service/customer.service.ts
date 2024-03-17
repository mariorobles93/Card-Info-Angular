import {Injectable} from '@angular/core';
import { createClient } from '@supabase/supabase-js'
import {from, Observable, Subject} from "rxjs";
import {Associate, Customer} from "../../types";
import {environment} from "../../../environments/environment";

/**
 * CustomerService
 */
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  // Create a single supabase client for interacting with your database
  private supabase = createClient(environment.SUPABASE_PROJECT_URL, environment.SUPABASE_PUBLIC_API_KEY);

  public associates : Subject<Associate[]> = new Subject<Associate[]>()
  public customers: Subject<Customer[]> = new Subject<Customer[]>();
  constructor() {
    //Init
   this.populateCustomers();
  }

  /**
   * Populates Customers Information with and Associate's Name if one is included in the record
   */
  private populateCustomers() {
    let customers : Customer[]=[];

    this.getCustomers().subscribe((res)=>{
      this.getAssociates().subscribe((response)=>{
        let associates =  response.data;
        this.associates.next(associates);

        customers = res.data.reverse();
        customers.forEach((customer: Customer)=>{
          let index = associates.findIndex((value : Associate)=>  value.id == customer.associateId);
          if (index != -1){
            customer.associateName = associates[index].name ?? undefined;
          }
        });

        this.customers.next(customers);
      });
    });
  }

  /**
   * Retrieves Customers Information from Supabase Table 'Customers' as an observable
   */
  public getCustomers() : Observable<any>  {
    return from(this.supabase
      .from('customers')
      .select('*'));
  }

  /**
   * Retrieves Associates Information from Supabase Table 'Associates' as an observable
   */
  public getAssociates() : Observable<any>  {
    return from(this.supabase
      .from('associates')
      .select('*'));
  }

  /**
   * Inserts a new Customer instance into Supabase Table 'Customers'
   */
  public async addCustomer(customer: Customer){
    return this.supabase
      .from('customers')
      .insert(customer)
      .select();
  }

  /**
   * Updates an existing Customer instance from Supabase Table 'Customers'
   * Returns updated customer record as an observable
   */
  public editCustomer(customerInfo: Customer){
    return from(this.supabase
      .from('customers')
      .update(customerInfo)
      .eq('id', customerInfo.id)
      .select());
  }
}
