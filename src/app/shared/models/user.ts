export interface User {
    id: number;
    fullName  :string,
    email: string;
    password: string;
    phoneNumber: string,
    type: number
    token: string;
}

export interface Address {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    zipcode: string;
}