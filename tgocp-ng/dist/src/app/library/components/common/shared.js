var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, EventEmitter, Directive, ViewContainerRef, Input, Output, ContentChildren, ContentChild, TemplateRef, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
var Header = /** @class */ (function () {
    function Header() {
    }
    Header = __decorate([
        Component({
            selector: 'ot-header',
            template: '<ng-content></ng-content>'
        })
    ], Header);
    return Header;
}());
export { Header };
var Footer = /** @class */ (function () {
    function Footer() {
    }
    Footer = __decorate([
        Component({
            selector: 'ot-footer',
            template: '<ng-content></ng-content>'
        })
    ], Footer);
    return Footer;
}());
export { Footer };
var PrimeTemplate = /** @class */ (function () {
    function PrimeTemplate(template) {
        this.template = template;
    }
    PrimeTemplate.prototype.getType = function () {
        return this.name;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PrimeTemplate.prototype, "type", void 0);
    __decorate([
        Input('pTemplate'),
        __metadata("design:type", String)
    ], PrimeTemplate.prototype, "name", void 0);
    PrimeTemplate = __decorate([
        Directive({
            selector: '[pTemplate]',
            host: {}
        }),
        __metadata("design:paramtypes", [TemplateRef])
    ], PrimeTemplate);
    return PrimeTemplate;
}());
export { PrimeTemplate };
var TemplateWrapper = /** @class */ (function () {
    function TemplateWrapper(viewContainer) {
        this.viewContainer = viewContainer;
    }
    TemplateWrapper.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.templateRef, {
            '\$implicit': this.item,
            'index': this.index
        });
    };
    TemplateWrapper.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TemplateWrapper.prototype, "item", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TemplateWrapper.prototype, "index", void 0);
    __decorate([
        Input('pTemplateWrapper'),
        __metadata("design:type", TemplateRef)
    ], TemplateWrapper.prototype, "templateRef", void 0);
    TemplateWrapper = __decorate([
        Directive({
            selector: '[pTemplateWrapper]'
        }),
        __metadata("design:paramtypes", [ViewContainerRef])
    ], TemplateWrapper);
    return TemplateWrapper;
}());
export { TemplateWrapper };
var Column = /** @class */ (function () {
    function Column() {
        this.filterType = 'text';
        this.exportable = true;
        this.sortFunction = new EventEmitter();
    }
    Column.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'header':
                    _this.headerTemplate = item.template;
                    break;
                case 'body':
                    _this.bodyTemplate = item.template;
                    break;
                case 'footer':
                    _this.footerTemplate = item.template;
                    break;
                case 'filter':
                    _this.filterTemplate = item.template;
                    break;
                case 'editor':
                    _this.editorTemplate = item.template;
                    break;
                default:
                    _this.bodyTemplate = item.template;
                    break;
            }
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "field", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "colId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "sortField", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "filterField", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "header", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "footer", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Column.prototype, "sortable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "editable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "filter", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "filterMatchMode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "filterType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "excludeGlobalFilter", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], Column.prototype, "rowspan", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], Column.prototype, "colspan", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "scope", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Column.prototype, "style", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "styleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "exportable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Column.prototype, "headerStyle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "headerStyleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Column.prototype, "bodyStyle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "bodyStyleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Column.prototype, "footerStyle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "footerStyleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "hidden", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "expander", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "draggable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "selectionMode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "sortByDefault", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "order", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "filterPlaceholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], Column.prototype, "filterMaxlength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "frozen", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Column.prototype, "sortFunction", void 0);
    __decorate([
        ContentChildren(PrimeTemplate),
        __metadata("design:type", QueryList)
    ], Column.prototype, "templates", void 0);
    __decorate([
        ContentChild(TemplateRef),
        __metadata("design:type", TemplateRef)
    ], Column.prototype, "template", void 0);
    Column = __decorate([
        Component({
            selector: 'ot-column',
            template: ''
        })
    ], Column);
    return Column;
}());
export { Column };
var Row = /** @class */ (function () {
    function Row() {
    }
    __decorate([
        ContentChildren(Column),
        __metadata("design:type", QueryList)
    ], Row.prototype, "columns", void 0);
    Row = __decorate([
        Component({
            selector: 'ot-row',
            template: ""
        })
    ], Row);
    return Row;
}());
export { Row };
var HeaderColumnGroup = /** @class */ (function () {
    function HeaderColumnGroup() {
    }
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], HeaderColumnGroup.prototype, "frozen", void 0);
    __decorate([
        ContentChildren(Row),
        __metadata("design:type", QueryList)
    ], HeaderColumnGroup.prototype, "rows", void 0);
    HeaderColumnGroup = __decorate([
        Component({
            selector: 'ot-headerColumnGroup',
            template: ""
        })
    ], HeaderColumnGroup);
    return HeaderColumnGroup;
}());
export { HeaderColumnGroup };
var FooterColumnGroup = /** @class */ (function () {
    function FooterColumnGroup() {
    }
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FooterColumnGroup.prototype, "frozen", void 0);
    __decorate([
        ContentChildren(Row),
        __metadata("design:type", QueryList)
    ], FooterColumnGroup.prototype, "rows", void 0);
    FooterColumnGroup = __decorate([
        Component({
            selector: 'ot-footerColumnGroup',
            template: ""
        })
    ], FooterColumnGroup);
    return FooterColumnGroup;
}());
export { FooterColumnGroup };
var ColumnBodyTemplateLoader = /** @class */ (function () {
    function ColumnBodyTemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    ColumnBodyTemplateLoader.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.column.bodyTemplate, {
            '\$implicit': this.column,
            'rowData': this.rowData,
            'rowIndex': this.rowIndex
        });
    };
    ColumnBodyTemplateLoader.prototype.ngOnChanges = function (changes) {
        if (!this.view) {
            return;
        }
        if ('rowIndex' in changes) {
            this.view.context.rowIndex = changes['rowIndex'].currentValue;
        }
    };
    ColumnBodyTemplateLoader.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ColumnBodyTemplateLoader.prototype, "column", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ColumnBodyTemplateLoader.prototype, "rowData", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ColumnBodyTemplateLoader.prototype, "rowIndex", void 0);
    ColumnBodyTemplateLoader = __decorate([
        Component({
            selector: 'ot-columnBodyTemplateLoader',
            template: ""
        }),
        __metadata("design:paramtypes", [ViewContainerRef])
    ], ColumnBodyTemplateLoader);
    return ColumnBodyTemplateLoader;
}());
export { ColumnBodyTemplateLoader };
var ColumnHeaderTemplateLoader = /** @class */ (function () {
    function ColumnHeaderTemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    ColumnHeaderTemplateLoader.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.column.headerTemplate, {
            '\$implicit': this.column
        });
    };
    ColumnHeaderTemplateLoader.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ColumnHeaderTemplateLoader.prototype, "column", void 0);
    ColumnHeaderTemplateLoader = __decorate([
        Component({
            selector: 'ot-columnHeaderTemplateLoader',
            template: ""
        }),
        __metadata("design:paramtypes", [ViewContainerRef])
    ], ColumnHeaderTemplateLoader);
    return ColumnHeaderTemplateLoader;
}());
export { ColumnHeaderTemplateLoader };
var ColumnFooterTemplateLoader = /** @class */ (function () {
    function ColumnFooterTemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    ColumnFooterTemplateLoader.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.column.footerTemplate, {
            '\$implicit': this.column
        });
    };
    ColumnFooterTemplateLoader.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ColumnFooterTemplateLoader.prototype, "column", void 0);
    ColumnFooterTemplateLoader = __decorate([
        Component({
            selector: 'ot-columnFooterTemplateLoader',
            template: ""
        }),
        __metadata("design:paramtypes", [ViewContainerRef])
    ], ColumnFooterTemplateLoader);
    return ColumnFooterTemplateLoader;
}());
export { ColumnFooterTemplateLoader };
var ColumnFilterTemplateLoader = /** @class */ (function () {
    function ColumnFilterTemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    ColumnFilterTemplateLoader.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.column.filterTemplate, {
            '\$implicit': this.column
        });
    };
    ColumnFilterTemplateLoader.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ColumnFilterTemplateLoader.prototype, "column", void 0);
    ColumnFilterTemplateLoader = __decorate([
        Component({
            selector: 'ot-columnFilterTemplateLoader',
            template: ""
        }),
        __metadata("design:paramtypes", [ViewContainerRef])
    ], ColumnFilterTemplateLoader);
    return ColumnFilterTemplateLoader;
}());
export { ColumnFilterTemplateLoader };
var ColumnEditorTemplateLoader = /** @class */ (function () {
    function ColumnEditorTemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    ColumnEditorTemplateLoader.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.column.editorTemplate, {
            '\$implicit': this.column,
            'rowData': this.rowData,
            'rowIndex': this.rowIndex
        });
    };
    ColumnEditorTemplateLoader.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ColumnEditorTemplateLoader.prototype, "column", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ColumnEditorTemplateLoader.prototype, "rowData", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ColumnEditorTemplateLoader.prototype, "rowIndex", void 0);
    ColumnEditorTemplateLoader = __decorate([
        Component({
            selector: 'ot-columnEditorTemplateLoader',
            template: ""
        }),
        __metadata("design:paramtypes", [ViewContainerRef])
    ], ColumnEditorTemplateLoader);
    return ColumnEditorTemplateLoader;
}());
export { ColumnEditorTemplateLoader };
var TemplateLoader = /** @class */ (function () {
    function TemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    TemplateLoader.prototype.ngOnInit = function () {
        if (this.template) {
            this.view = this.viewContainer.createEmbeddedView(this.template, {
                '\$implicit': this.data
            });
        }
    };
    TemplateLoader.prototype.ngOnDestroy = function () {
        if (this.view)
            this.view.destroy();
    };
    __decorate([
        Input(),
        __metadata("design:type", TemplateRef)
    ], TemplateLoader.prototype, "template", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TemplateLoader.prototype, "data", void 0);
    TemplateLoader = __decorate([
        Component({
            selector: 'ot-templateLoader',
            template: ""
        }),
        __metadata("design:paramtypes", [ViewContainerRef])
    ], TemplateLoader);
    return TemplateLoader;
}());
export { TemplateLoader };
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Header, Footer, Column, TemplateWrapper, ColumnHeaderTemplateLoader, ColumnBodyTemplateLoader, ColumnFooterTemplateLoader, ColumnFilterTemplateLoader, PrimeTemplate, TemplateLoader, Row, HeaderColumnGroup, FooterColumnGroup, ColumnEditorTemplateLoader],
            declarations: [Header, Footer, Column, TemplateWrapper, ColumnHeaderTemplateLoader, ColumnBodyTemplateLoader, ColumnFooterTemplateLoader, ColumnFilterTemplateLoader, PrimeTemplate, TemplateLoader, Row, HeaderColumnGroup, FooterColumnGroup, ColumnEditorTemplateLoader]
        })
    ], SharedModule);
    return SharedModule;
}());
export { SharedModule };
//# sourceMappingURL=shared.js.map