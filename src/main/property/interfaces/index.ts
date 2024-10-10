export interface PropertyCardProps {
  _id: string;
  rowIndex: number;
  thumbnail: string;
  alt?: string;
  name: string;
  slug: string;
  city: string;
  location: string;
  qrCode: string;
}

export interface GoogleMapComponentProps {
  handleMapLoad: (map: any) => void;
  handleMapClick: (event: any) => void;
  defaultLocation: { lat: number; lng: number };
  selectedLocation: { lat: number; lng: number } | null;
  error?: string | null;
  markers?: any[];
}

export interface LatLng {
  lat: number;
  lng: number;
  place?: string;
}

export interface TimePeriod {
  time: string;
  period: string;
}
export interface CheckInCheckOutInterface {
  checkIn: TimePeriod;
  checkOut: TimePeriod;
}

export interface UspContainerInterface {
  value: string;
}
export interface HouseRulesContainerInterface {
  value: string;
}

export interface PropertyInterface {
  id?: string;
  name: string;
  slug: string;
  thumbnail: string;
  location: string;
  city: string;
  qrCode?: string;
  bookingPageLink: string;
  thankYouText?: string;
  hospitals: LatLng[];
  nearByRestaurants: LatLng[];
  nearByRentals: LatLng[];
  localTours: LatLng[];
  usp: UspContainerInterface[];
  checkIn: TimePeriod;
  checkOut: TimePeriod;
  houseRules: HouseRulesContainerInterface[];
  createdAt: Date;
}

export interface WeatherResponseInterface {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
