import { IEntity } from '@adroit-group/ng-utils/lib/interfaces';

export interface Coord {
    lon: number;
    lat: number;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Forecast {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}

export interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

export interface Cloud {
    all: number;
}

export interface Sy {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

// WE don't get an id from the API, it's for type consistency
export interface WeatherForecastResponse extends IEntity {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Forecast;
    visibility: number;
    wind: Wind;
    clouds: Cloud;
    dt: number;
    sys: Sy;
    timezone: number;
    name: string;
    cod: number;
}

// WE don't get an id from the API, it's for type consistency
export interface ReverseGeoCodeResponse extends IEntity {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state: string;
}

// WE don't get an id from the API, it's for type consistency
export interface GeoCodeResponse extends IEntity {
    name: string;
    local_names: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
    state: string;
}
