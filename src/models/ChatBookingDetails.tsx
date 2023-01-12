export interface ChatBookingDetails {
  flightType: string;
  fromDestinationAirport: string;
  fromDestinationCity: string;
  fromDestinationCountry: string;
  fromPassengers: string;
  toDestinationAirport: string;
  toDestinationCity: string;
  toDestinationCountry: string;
  departureDate: Date;
  fromSpecialRequirements: string;
  returnDate?: Date;
  toPassengers?: string;
}
