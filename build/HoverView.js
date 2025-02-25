"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoverView = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const hooks_1 = require("./hooks");
const useContent_1 = require("./hooks/useContent");
const types_1 = require("./types");
const HoverView = ({ children, hoverPosition, renderHoverContent, renderContent, scrollPosition, ...props }) => {
    const { updateHoverViewMeasurements } = (0, hooks_1.useDraxContext)();
    const { combinedStyle, animatedHoverStyle, renderedChildren, dragStatus } = (0, useContent_1.useContent)({
        draxViewProps: {
            children,
            hoverPosition,
            renderHoverContent,
            renderContent,
            scrollPosition,
            ...props,
        },
    });
    const viewRef = (0, react_native_reanimated_1.useAnimatedRef)();
    if (!(props.draggable && !props.noHover)) {
        return null;
    }
    if (dragStatus === types_1.DraxViewDragStatus.Inactive ||
        typeof dragStatus === "undefined") {
        return null;
    }
    return (react_1.default.createElement(react_native_reanimated_1.default.View, { ...props, ref: viewRef, onLayout: (measurements) => {
            !props?.disableHoverViewMeasurementsOnLayout &&
                updateHoverViewMeasurements({
                    id: props.id,
                    measurements: { ...measurements.nativeEvent.layout },
                });
        }, style: [react_native_1.StyleSheet.absoluteFill, combinedStyle, animatedHoverStyle], pointerEvents: "none" }, renderedChildren));
};
exports.HoverView = HoverView;
