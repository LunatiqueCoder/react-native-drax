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
exports.PanGestureDetector = void 0;
const react_1 = __importStar(require("react"));
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const react_native_reanimated_1 = require("react-native-reanimated");
const hooks_1 = require("./hooks");
exports.PanGestureDetector = (0, react_1.memo)(({ id, children, longPressDelay, draggable, }) => {
    // Connect with Drax.
    const { handleGestureEvent, handleGestureStateChange } = (0, hooks_1.useDraxContext)();
    const gesture = (0, react_1.useMemo)(() => draggable &&
        react_native_gesture_handler_1.Gesture.Pan()
            .onBegin(handleGestureStateChange(id))
            .onStart(handleGestureStateChange(id))
            .onUpdate((event) => (0, react_native_reanimated_1.runOnUI)(handleGestureEvent)(id, event))
            .onEnd(handleGestureStateChange(id))
            .shouldCancelWhenOutside(false)
            .activateAfterLongPress(longPressDelay)
            .enabled(draggable)
            .maxPointers(1)
            .runOnJS(true), [
        handleGestureStateChange,
        id,
        longPressDelay,
        draggable,
        handleGestureEvent,
    ]);
    if (!draggable || !gesture) {
        return react_1.default.createElement(react_1.default.Fragment, null, children);
    }
    return react_1.default.createElement(react_native_gesture_handler_1.GestureDetector, { gesture: gesture }, children);
});
