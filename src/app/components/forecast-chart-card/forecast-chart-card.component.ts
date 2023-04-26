import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    Input,
    NgZone,
    OnDestroy,
    PLATFORM_ID
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DegreePipe } from 'app/pipes/degree.pipe';

// amCharts imports
import { AdroitNgUtilsModule } from '@adroit-group/ng-utils';
import { IEntity } from '@adroit-group/ng-utils/lib/interfaces';
import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import { WeatherApiService } from 'app/api/services/weather/weather.service';
import { GeoCodeResponse, WeatherForecastResponse } from 'app/models/open-weather';
import { WeekDayPipe } from 'app/pipes/weekday.pipe';
import * as dayjs from 'dayjs';
import { WeatherIconComponent } from '../weather-icon/weather-icon.component';

interface ForecastChartDataEntry {
    day: string;
    min: number;
    max: number;
    icon: string;
}

@Component({
    selector: 'app-forecast-chart-card',
    templateUrl: './forecast-chart-card.component.html',
    styleUrls: ['./forecast-chart-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    providers: [WeekDayPipe],
    imports: [CommonModule, MatIconModule, DegreePipe, WeatherIconComponent, AdroitNgUtilsModule]
})
export class ForecastChartCardComponent implements AfterViewInit, OnDestroy {
    @Input() public weather!: Partial<WeatherForecastResponse & GeoCodeResponse> & IEntity;

    private root!: am5.Root;

    weekdays!: string[];
    data!: ForecastChartDataEntry[];

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private zone: NgZone,
        private readonly weatherApiService: WeatherApiService,
        private readonly weekdayPipe: WeekDayPipe,
        private readonly cdr: ChangeDetectorRef
    ) {}

    // Run the function only in the browser
    browserOnly(f: () => void) {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                f();
            });
        }
    }

    ngAfterViewInit() {
        // Chart code goes in here
        this.browserOnly(() => {
            this.weatherApiService
                .getForecastFor(this.weather.lat!, this.weather.lon!)
                .subscribe((res) => {
                    let root = am5.Root.new('chartdiv');

                    root.setThemes([am5themes_Animated.new(root)]);

                    let chart = root.container.children.push(
                        am5xy.XYChart.new(root, {
                            panY: false,
                            layout: root.verticalLayout
                        })
                    );

                    const data = res.list
                        .map((forecast) => ({
                            day: this.weekdayPipe.transform(dayjs(forecast.dt_txt).day()),
                            min: forecast.main.temp_min,
                            max: forecast.main.temp_max,
                            icon: forecast.weather[0].icon
                        }))
                        .reduce((acc, curr) => {
                            const dayDataInList = acc.some((data) => data.day === curr.day);

                            return dayDataInList ? acc : [...acc, curr];
                        }, [] as ForecastChartDataEntry[]);
                    this.data = data;

                    this.weekdays = data.map((d) => d.day);

                    // Create Y-axis
                    let yAxis = chart.yAxes.push(
                        am5xy.ValueAxis.new(root, {
                            min: 0,
                            max: 40,
                            renderer: am5xy.AxisRendererY.new(root, {})
                        })
                    );

                    // Create X-Axis
                    let xAxis = chart.xAxes.push(
                        am5xy.CategoryAxis.new(root, {
                            renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 10 }),
                            categoryField: 'day'
                        })
                    );
                    xAxis.data.setAll(data);

                    // Create series
                    let series1 = chart.series.push(
                        am5xy.LineSeries.new(root, {
                            name: 'min',
                            xAxis: xAxis,
                            yAxis: yAxis,
                            valueYField: 'min',
                            categoryXField: 'day'
                        })
                    );
                    series1.data.setAll(data);

                    let series2 = chart.series.push(
                        am5xy.LineSeries.new(root, {
                            name: 'max',
                            xAxis: xAxis,
                            yAxis: yAxis,
                            valueYField: 'max',
                            categoryXField: 'day'
                        })
                    );
                    series2.data.setAll(data);

                    // Add legend
                    let legend = chart.children.push(am5.Legend.new(root, {}));
                    legend.data.setAll(chart.series.values);

                    // Add cursor
                    chart.set('cursor', am5xy.XYCursor.new(root, {}));

                    this.root = root;
                    this.cdr.detectChanges();
                });
        });
    }

    ngOnDestroy() {
        // Clean up chart when the component is removed
        this.browserOnly(() => {
            if (this.root) {
                this.root.dispose();
            }
        });
    }
}
