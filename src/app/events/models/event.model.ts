// models/event.model.ts
export interface Venue {
    name: string;
    city: {
        name: string;
    };
}

export interface Price {
    type: string;
    currency: string;
    min: number;
    max: number;
}

export interface Event {
    _id: string;
    title: string;
    description: string;
    date: Date;
    venues: Venue[];
    category: string;
    price: Price[];
    totalTickets: number;
    availableTickets: number;
    imageUrl: string;
}