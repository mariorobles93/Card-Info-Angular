import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'
import {from, Observable} from "rxjs";
import {Associate, Customer} from "../../types";
import {SUPABASE_PROJECT_URL, SUPABASE_PUBLIC_API_KEY} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
// Create a single supabase client for interacting with your database
  private supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_PUBLIC_API_KEY);


  public getCustomers() : Observable<any>  {
    return from(this.supabase
      .from('customers')
      .select('*'));
  }

  public getAssociates() : Observable<any>  {
    return from(this.supabase
      .from('associates')
      .select('*'));
  }

  public async addCustomer(customer: Customer){
    return this.supabase
      .from('customers')
      .insert(customer)
      .select();
  }

  public editCustomer(){

  }
}
