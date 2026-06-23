export interface PublicModel {
  id: string;
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  age: number;
  city: string;
  whatsappPhone: string;
  photoUrl: string | null;
  company: {
    name: string;
  };
}
