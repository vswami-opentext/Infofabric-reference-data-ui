var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, ElementRef, Input, Output, EventEmitter, ContentChild, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as Quill from "quill";
import { PSscrollUtils } from '../..';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
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
export var EDITOR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Editor; }),
    multi: true
};
var Editor = /** @class */ (function () {
    function Editor(el) {
        this.el = el;
        this.psConfig = PSscrollUtils.scrollY();
        this.onTextChange = new EventEmitter();
        this.onSelectionChange = new EventEmitter();
        this.onInit = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Editor.prototype.ngAfterViewInit = function () {
        var _this = this;
        debugger;
        var editorElement = DomHandler.findSingle(this.el.nativeElement, 'div.ot-ui-editor-content');
        var toolbarElement = DomHandler.findSingle(this.el.nativeElement, 'div.ot-ui-editor-toolbar');
        var defaultModule = { toolbar: toolbarElement };
        var modules = this.modules ? __assign({}, defaultModule, this.modules) : defaultModule;
        this.quill = new Quill(editorElement, {
            modules: modules,
            placeholder: this.placeholder,
            readOnly: this.readonly,
            theme: 'snow',
            formats: this.formats,
            bounds: this.bounds,
            debug: this.debug,
            scrollingContainer: this.scrollingContainer
        });
        if (this.value) {
            this.quill.pasteHTML(this.value);
        }
        this.quill.on('text-change', function (delta, oldContents, source) {
            debugger;
            if (source === 'user') {
                var html = editorElement.children[0].innerHTML;
                var text = _this.quill.getText().trim();
                if (html === '<p><br></p>') {
                    html = null;
                }
                _this.onTextChange.emit({
                    htmlValue: html,
                    textValue: text,
                    delta: delta,
                    source: source
                });
                _this.onModelChange(html);
                _this.onModelTouched();
            }
        });
        this.quill.on('selection-change', function (range, oldRange, source) {
            _this.onSelectionChange.emit({
                range: range,
                oldRange: oldRange,
                source: source
            });
        });
        this.onInit.emit({
            editor: this.quill
        });
    };
    Editor.prototype.writeValue = function (value) {
        this.value = value;
        if (this.quill) {
            if (value)
                this.quill.pasteHTML(value);
            else
                this.quill.setText('');
        }
    };
    Editor.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Editor.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Editor.prototype.getQuill = function () {
        return this.quill;
    };
    Object.defineProperty(Editor.prototype, "readonly", {
        get: function () {
            return this._readonly;
        },
        set: function (val) {
            this._readonly = val;
            if (this.quill) {
                if (this._readonly)
                    this.quill.disable();
                else
                    this.quill.enable();
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Editor.prototype, "onTextChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Editor.prototype, "onSelectionChange", void 0);
    __decorate([
        ContentChild(Header),
        __metadata("design:type", Object)
    ], Editor.prototype, "toolbar", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Editor.prototype, "style", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Editor.prototype, "styleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Editor.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], Editor.prototype, "formats", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Editor.prototype, "modules", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Editor.prototype, "bounds", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Editor.prototype, "scrollingContainer", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Editor.prototype, "debug", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Editor.prototype, "onInit", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], Editor.prototype, "readonly", null);
    Editor = __decorate([
        Component({
            selector: 'ot-text-editor',
            template: "\r\n    <div [ngClass]=\"'ot-ui-widget ot-ui-editor-container ot-ui-corner-all'\" [class]=\"styleClass\">\r\n            <div class=\"ot-ui-editor-toolbar ot-ui-widget-header ot-ui-corner-top\" *ngIf=\"toolbar\">\r\n                <ng-content select=\"ot-header\"></ng-content>\r\n            </div>\r\n            <div class=\"ot-ui-editor-toolbar ot-ui-widget-header ot-ui-corner-top ot-text-editor-toolbar\" *ngIf=\"!toolbar\">\r\n                <span class=\"ql-formats\">\r\n                    <button class=\"ql-bold\"></button>\r\n                    <button class=\"ql-italic \" ></button>\r\n                    <button class=\"ql-underline \"></button>\r\n                </span>\r\n            </div>\r\n            <div class=\"ot-ui-editor-content ot-ql-container ot-ql-snow ot-text-editor-container\"></div>\r\n        </div>\r\n ",
            providers: [EDITOR_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], Editor);
    return Editor;
}());
export { Editor };
var PERFECT_SCROLLBAR_CONFIG = {};
var EditorModule = /** @class */ (function () {
    function EditorModule() {
    }
    EditorModule = __decorate([
        NgModule({
            imports: [CommonModule, PerfectScrollbarModule],
            exports: [Editor, Header],
            declarations: [Editor, Header]
        })
    ], EditorModule);
    return EditorModule;
}());
export { EditorModule };
//# sourceMappingURL=editor.component.js.map