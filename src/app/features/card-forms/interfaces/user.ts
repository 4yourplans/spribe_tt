import { Country } from "../../../shared/enum/country";

export interface IUser{
    country: Country
    username:string;
    birthday:string;
}