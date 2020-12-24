var PSscrollUtils = /** @class */ (function () {
    function PSscrollUtils() {
    }
    PSscrollUtils.scrollBoth = function () {
        return {
            suppressScrollX: false,
            suppressScrollY: false,
            minScrollbarLength: this.minScrollbarLength
        };
    };
    PSscrollUtils.scrollY = function () {
        return {
            suppressScrollX: true,
            suppressScrollY: false
        };
    };
    PSscrollUtils.minScrollbarLength = 24;
    return PSscrollUtils;
}());
export { PSscrollUtils };
//# sourceMappingURL=perfect-scrollbar-config.js.map