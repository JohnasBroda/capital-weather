export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Cloud {
    all: number;
}

export interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

export interface Sy {
    pod: string;
}

export interface List {
    dt: number;
    main: Main;
    weather: Weather[];
    clouds: Cloud;
    wind: Wind;
    visibility: number;
    pop: number;
    sys: Sy;
    dt_txt: string;
}

export interface Coord {
    lat: number;
    lon: number;
}

export interface City {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}

export interface WeatherForecast5DayResponse {
    cod: string;
    message: number;
    cnt: number;
    list: List[];
    city: City;
}
