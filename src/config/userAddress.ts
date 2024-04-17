export type UserAddressType = {
  number: string;
  street: string;
  city: string;
  zip: string;
  country: string;
};

export const initialUserAddress: UserAddressType = {
  number: "",
  street: "",
  city: "",
  zip: "",
  country: "",
};
