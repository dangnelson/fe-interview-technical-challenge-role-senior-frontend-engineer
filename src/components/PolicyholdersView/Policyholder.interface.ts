interface Policyholder {
  address: {
    city: string;
    line1: string;
    line2: string;
    postalCode: number;
    state: string;
  };
  age: number;
  isPrimary: boolean;
  name: string;
  phoneNumber: string;
}

export default Policyholder;
