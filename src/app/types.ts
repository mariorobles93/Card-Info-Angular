export interface Customer{
  id: string,
  createdAt : Date,
  firstName : string,
  lastName : string;
  email: string,
  phoneNumber?: string,
  loyaltyPoints: number,
  numberOfPurchases: number,
  associateId?: string,
  associateName?: string,

}

export interface Associate{
  id: string,
  createdAt : Date,
  name: string,

}
