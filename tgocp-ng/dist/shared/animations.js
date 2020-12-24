import { state, style, transition, animate, group } from '@angular/animations';
var AnimationsUtils = /** @class */ (function () {
    function AnimationsUtils() {
    }
    AnimationsUtils.slideInOutAnimation = function () {
        return [
            state('in', style({
                'opacity': '1', 'visibility': 'visible'
            })),
            state('out', style({
                'opacity': '0', 'visibility': 'hidden'
            })),
            transition('in => out', [group([
                    animate('0.3s ease-in-out', style({
                        'opacity': '0'
                    })),
                    animate('0.3s ease-in-out', style({
                        'visibility': 'hidden'
                    }))
                ])]),
            transition('out => in', [group([
                    animate('0.3s ease-in-out', style({
                        'visibility': 'visible'
                    })),
                    animate('0.3s ease-in-out', style({
                        'opacity': '1'
                    }))
                ])])
        ];
    };
    return AnimationsUtils;
}());
export { AnimationsUtils };
//# sourceMappingURL=animations.js.map