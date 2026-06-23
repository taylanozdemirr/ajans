export interface PublicModel {
  id: string;
  firstName: string;
  whatsappPhone: string;
  photos: { id: string; url: string }[];
  company: {
    id: string;
    name: string;
  };
}
