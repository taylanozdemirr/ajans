export interface PublicModel {
  id: string;
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  age: number;
  city: string;
  whatsappPhone: string;
  photos: { id: string; url: string }[];
  company: {
    id: string;
    name: string;
  };
}
