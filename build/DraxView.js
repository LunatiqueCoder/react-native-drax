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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraxReanimatedView = exports.DraxView = void 0;
const react_1 = __importStar(require("react"));
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const PanGestureDetector_1 = require("./PanGestureDetector");
const hooks_1 = require("./hooks");
const useContent_1 = require("./hooks/useContent");
const useDraxProtocol_1 = require("./hooks/useDraxProtocol");
const useMeasurements_1 = require("./hooks/useMeasurements");
const math_1 = require("./math");
const params_1 = require("./params");
exports.DraxView = (0, react_1.memo)((props) => {
    // Coalesce protocol props into capabilities.
    const draggable = props.draggable ??
        (props.dragPayload !== undefined ||
            props.payload !== undefined ||
            !!props.onDrag ||
            !!props.onDragEnd ||
            !!props.onDragEnter ||
            !!props.onDragExit ||
            !!props.onDragOver ||
            !!props.onDragStart ||
            !!props.onDragDrop);
    const receptive = props.receptive ??
        (props.receiverPayload !== undefined ||
            props.payload !== undefined ||
            !!props.onReceiveDragEnter ||
            !!props.onReceiveDragExit ||
            !!props.onReceiveDragOver ||
            !!props.onReceiveDragDrop);
    const monitoring = props.monitoring ??
        (!!props.onMonitorDragStart ||
            !!props.onMonitorDragEnter ||
            !!props.onMonitorDragOver ||
            !!props.onMonitorDragExit ||
            !!props.onMonitorDragEnd ||
            !!props.onMonitorDragDrop);
    // The unique identifier for this view.
    const id = (0, hooks_1.useDraxId)(props.id);
    return (react_1.default.createElement(PanGestureDetector_1.PanGestureDetector, { id: id, draggable: draggable, longPressDelay: props.longPressDelay ?? params_1.defaultLongPressDelay },
        react_1.default.createElement(exports.DraxReanimatedView, { id: id, ...props, draggable: draggable, receptive: receptive, monitoring: monitoring })));
});
exports.DraxReanimatedView = (0, react_1.memo)((props) => {
    const hoverPosition = (0, react_native_reanimated_1.useSharedValue)({ x: 0, y: 0 });
    const updateViewProtocol = (0, useDraxProtocol_1.useDraxProtocol)(props, hoverPosition);
    const { registerView, unregisterView } = (0, hooks_1.useDraxContext)();
    const { onLayout, viewRef } = (0, useMeasurements_1.useMeasurements)(props);
    const { combinedStyle, renderedChildren } = (0, useContent_1.useContent)({
        draxViewProps: { ...props, hoverPosition },
        viewRef,
    });
    // useEffect(() => {
    // 	/** @todo 🪲BUG:
    // 	 * For some reason, the Staging zone from the ColorDragDrop example loses its measurements,
    // 	 * and we need to force refresh on them */
    // 	measureWithHandler?.();
    // }, [combinedStyle]);
    (0, react_1.useEffect)(() => {
        /** @todo 🪲BUG:
         * Ugly hack to update hover views.
         * Mostly useful when their props change and we need a forced refresh
         */
        updateViewProtocol();
        const fakeId = (0, math_1.generateRandomId)();
        registerView({ id: fakeId });
        unregisterView({ id: fakeId });
    }, [updateViewProtocol, registerView, unregisterView]);
    return (react_1.default.createElement(react_native_reanimated_1.default.View, { ...props, style: combinedStyle, ref: viewRef, onLayout: onLayout, collapsable: false }, renderedChildren));
});
