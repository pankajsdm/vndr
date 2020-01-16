import { BaseModel } from './_base.model';

export class UserModel  extends BaseModel {
    email: string;
    password: string;
    role: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    address: string;
    // city
    state: string;
    country: string;
    postalCode: number;
    dob: Date;
    gender: string = 'Male';
    // status: string = 'Active';
    image: string;
    isVNDR: boolean = false;
    phone: number;
    servicePrice: number;
    speciality: string;
    expireTime: Date;
    expireToken : string;
    token: string;
    loginToken:Array<object>;
}
