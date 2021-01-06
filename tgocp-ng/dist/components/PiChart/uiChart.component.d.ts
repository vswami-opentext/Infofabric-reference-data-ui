import { ElementRef, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
export declare class UIChart implements AfterViewInit, OnDestroy {
    el: ElementRef;
    type: string;
    options: any;
    width: string;
    height: string;
    responsive: boolean;
    PIE_COLORS: string[];
    onDataSelect: EventEmitter<any>;
    defaultChartOptions: {
        legend: {
            display: boolean;
            position: string;
            labels: {
                fontColor: string;
                fontSize: number;
                boxWidth: number;
                padding: number;
                fontFamily: string;
            };
        };
        tooltips: {
            display: boolean;
        };
    };
    initialized: boolean;
    _data: any;
    chart: any;
    constructor(el: ElementRef);
    data: any;
    chartColors(): void;
    ngAfterViewInit(): void;
    onCanvasClick(event: any): void;
    initChart(): void;
    getCanvas(): any;
    getBase64Image(): any;
    generateLegend(): any;
    refresh(): void;
    reinit(): void;
    ngOnDestroy(): void;
}
export declare class ChartModule {
}
