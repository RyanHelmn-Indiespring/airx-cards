export interface ChatBookingDetails {
  flightType: string;
  fromDestinationAirport: string;
  fromDestinationCity: string;
  fromPassengers: string;
  toDestinationAirport: string;
  toDestinationCity: string;
  departureDate: Date;
  fromSpecialRequirements: string;
  returnDate?: Date;
  toPassengers?: string;
}
