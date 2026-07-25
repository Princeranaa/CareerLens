export interface Iuser {
  _id: string;
  name: string;
  email: string;
  number: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Register {
  name: string;
  email: string;
  number: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface JWTpayload {
  userId: string;
  email?: string;
}
