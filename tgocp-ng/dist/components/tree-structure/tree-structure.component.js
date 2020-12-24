var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgModule, Input } from "@angular/core";
import { CommonModule } from '@angular/common';
var TreeStructureComponent = /** @class */ (function () {
    function TreeStructureComponent() {
        this.dataList = [];
        this.key = 'name';
    }
    TreeStructureComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeStructureComponent.prototype, "dataList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeStructureComponent.prototype, "key", void 0);
    TreeStructureComponent = __decorate([
        Component({
            selector: 'ot-tree-structure',
            template: "<div>\r\n        <ul class=\"ot-treeUl\">\r\n          <ng-container *ngTemplateOutlet=\"recursiveMenu; context:{ $implicit: dataList }\">\r\n            </ng-container>\r\n        </ul>\r\n          <ng-template #recursiveMenu let-dataList>\r\n            <ng-container *ngFor=\"let item of dataList\">\r\n             <li class=\"ot-treeLi\">{{item[key]}}\r\n             <ul class=\"ot-treeUl\">\r\n                  <ng-container *ngTemplateOutlet=\"recursiveMenu; context:{ $implicit: item.children }\"></ng-container>\r\n    \r\n                </ul>\r\n                </li>\r\n            </ng-container>\r\n      </ng-template>\r\n       \r\n    \r\n</div>"
        }),
        __metadata("design:paramtypes", [])
    ], TreeStructureComponent);
    return TreeStructureComponent;
}());
export { TreeStructureComponent };
var TreeStructureModule = /** @class */ (function () {
    function TreeStructureModule() {
    }
    TreeStructureModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [TreeStructureComponent],
            declarations: [TreeStructureComponent]
        })
    ], TreeStructureModule);
    return TreeStructureModule;
}());
export { TreeStructureModule };
//# sourceMappingURL=tree-structure.component.js.map