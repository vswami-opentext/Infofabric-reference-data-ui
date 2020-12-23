var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
var UIChart = /** @class */ (function () {
    function UIChart(el) {
        this.el = el;
        this.options = {};
        this.responsive = true;
        this.PIE_COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#FFC496", "#32CD32", "transparent"];
        this.onDataSelect = new EventEmitter();
        this.defaultChartOptions = {
            legend: {
                display: true,
                position: 'right',
                labels: {
                    fontColor: '#fff',
                    fontSize: 14,
                    boxWidth: 20,
                    padding: 10,
                    fontFamily: 'OpenTextSans-Light'
                }
            },
            tooltips: {
                display: false
            }
        };
    }
    Object.defineProperty(UIChart.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (val) {
            this._data = val;
            this.chartColors();
            this.reinit();
        },
        enumerable: true,
        configurable: true
    });
    UIChart.prototype.chartColors = function () {
        if (this._data && this._data.datasets) {
            for (var i = 0; i < this._data.datasets.length; i++) {
                this._data.datasets[i].borderWidth = 0;
                if (!this._data.datasets[i].backgroundColor)
                    this._data.datasets[i].backgroundColor = this.PIE_COLORS;
                if (!this._data.datasets[i].hoverBackgroundColor)
                    this._data.datasets[i].hoverBackgroundColor = this.PIE_COLORS;
            }
        }
    };
    UIChart.prototype.ngAfterViewInit = function () {
        this.initChart();
        this.initialized = true;
    };
    UIChart.prototype.onCanvasClick = function (event) {
        if (this.chart) {
            var element = this.chart.getElementAtEvent(event);
            var dataset = this.chart.getDatasetAtEvent(event);
            if (element && element[0] && dataset) {
                this.onDataSelect.emit({ originalEvent: event, element: element[0], dataset: dataset });
            }
        }
    };
    UIChart.prototype.initChart = function () {
        var opts = {};
        if (this.options && !this.options.legend) {
            this.options = this.defaultChartOptions;
        }
        opts = this.options;
        opts.responsive = this.responsive;
        // allows chart to resize in responsive mode
        if (opts.responsive && (this.height || this.width)) {
            opts.maintainAspectRatio = false;
        }
        this.chart = new Chart(this.el.nativeElement.children[0].children[0], {
            type: this.type,
            data: this.data,
            options: this.options
        });
    };
    UIChart.prototype.getCanvas = function () {
        return this.el.nativeElement.children[0].children[0];
    };
    UIChart.prototype.getBase64Image = function () {
        return this.chart.toBase64Image();
    };
    UIChart.prototype.generateLegend = function () {
        if (this.chart) {
            return this.chart.generateLegend();
        }
    };
    UIChart.prototype.refresh = function () {
        if (this.chart) {
            this.chart.update();
        }
    };
    UIChart.prototype.reinit = function () {
        if (this.chart) {
            this.chart.destroy();
            this.initChart();
        }
    };
    UIChart.prototype.ngOnDestroy = function () {
        if (this.chart) {
            this.chart.destroy();
            this.initialized = false;
            this.chart = null;
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], UIChart.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], UIChart.prototype, "options", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], UIChart.prototype, "width", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], UIChart.prototype, "height", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], UIChart.prototype, "responsive", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], UIChart.prototype, "onDataSelect", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], UIChart.prototype, "data", null);
    UIChart = __decorate([
        Component({
            selector: 'ot-chart',
            template: "<div style=\"position:relative\" [style.width]=\"responsive && !width ? null : width\" [style.height]=\"responsive && !height ? null : height\">\r\n    <canvas [attr.width]=\"responsive && !width ? null : width\" [attr.height]=\"responsive && !height ? null : height\" (click)=\"onCanvasClick($event)\"></canvas>\r\n</div>"
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], UIChart);
    return UIChart;
}());
export { UIChart };
var ChartModule = /** @class */ (function () {
    function ChartModule() {
    }
    ChartModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [UIChart],
            declarations: [UIChart]
        })
    ], ChartModule);
    return ChartModule;
}());
export { ChartModule };
//# sourceMappingURL=uiChart.component.js.map