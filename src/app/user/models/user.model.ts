export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface GeoLocation {
  latitude?: number;
  longitude?: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string; // Obbligatorio per la registrazione, ma non visibile per il profilo utente
  role: UserRole;
  isApproved: boolean;
  dateOfBirth?: Date;
  address?: Address;
  geoLocation?: GeoLocation;
  phoneNumber?: string;
  interests?: string[];
  bio?: string;
  avatarUrl?: string;
}
