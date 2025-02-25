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
exports.useContent = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = require("react-native-reanimated");
const math_1 = require("../math");
const useDraxContext_1 = require("./useDraxContext");
const useStatus_1 = require("./useStatus");
const DraxSubprovider_1 = require("../DraxSubprovider");
const transform_1 = require("../transform");
const types_1 = require("../types");
const useContent = ({ draxViewProps: { id, style, dragInactiveStyle, draggingStyle, draggingWithReceiverStyle, draggingWithoutReceiverStyle, dragReleasedStyle, otherDraggingStyle, otherDraggingWithReceiverStyle, otherDraggingWithoutReceiverStyle, receiverInactiveStyle, receivingStyle, children, renderContent, renderHoverContent, isParent, scrollPositionOffset, ...props }, viewRef, }) => {
    const { getTrackingDragged, getTrackingReceiver, getAbsoluteViewData } = (0, useDraxContext_1.useDraxContext)();
    const { dragStatus, receiveStatus, anyDragging, anyReceiving } = (0, useStatus_1.useStatus)({
        id,
        otherDraggingStyle,
        otherDraggingWithReceiverStyle,
        otherDraggingWithoutReceiverStyle,
        ...props,
    });
    const dragged = getTrackingDragged();
    const trackingReleasedDraggedRef = (0, react_1.useRef)({});
    (0, react_1.useEffect)(() => {
        if (dragged && dragged.id === id)
            trackingReleasedDraggedRef.current = dragged;
    }, [dragged, id]);
    const receiver = getTrackingReceiver();
    const draggedData = getAbsoluteViewData(dragged?.id);
    // Get full render props for non-hovering view content.
    const getRenderContentProps = (0, react_1.useCallback)(() => {
        const viewData = getAbsoluteViewData(id);
        const measurements = viewData?.measurements;
        const dimensions = measurements && (0, math_1.extractDimensions)(measurements);
        return {
            viewState: {
                data: viewData,
                dragStatus,
                receiveStatus,
                ...dragged?.tracking,
                releasedDragTracking: trackingReleasedDraggedRef.current
                    ?.tracking && {
                    ...trackingReleasedDraggedRef.current.tracking,
                },
                receivingDrag: receiveStatus !== types_1.DraxViewReceiveStatus.Receiving ||
                    !receiver?.id ||
                    !draggedData
                    ? undefined
                    : {
                        id: receiver?.id,
                        payload: draggedData?.protocol.dragPayload,
                        data: draggedData,
                    },
            },
            trackingStatus: { dragging: anyDragging, receiving: anyReceiving },
            children,
            dimensions,
            hover: !viewRef,
        };
    }, [
        children,
        dragStatus,
        receiveStatus,
        anyDragging,
        anyReceiving,
        getTrackingDragged,
    ]);
    // Combined style for current render-related state.
    const combinedStyle = (0, react_1.useMemo)(() => {
        // Start with base style.
        const styles = [style];
        if (!viewRef) {
            const viewData = getAbsoluteViewData(id);
            const measurements = viewData?.measurements;
            const dimensions = measurements && (0, math_1.extractDimensions)(measurements);
            const combinedHoverStyle = dimensions &&
                (0, transform_1.getCombinedHoverStyle)({ dragStatus, anyReceiving, dimensions }, {
                    id,
                    style,
                    dragInactiveStyle,
                    draggingStyle,
                    draggingWithReceiverStyle,
                    draggingWithoutReceiverStyle,
                    dragReleasedStyle,
                    otherDraggingStyle,
                    otherDraggingWithReceiverStyle,
                    otherDraggingWithoutReceiverStyle,
                    receiverInactiveStyle,
                    receivingStyle,
                    children,
                    renderContent,
                    renderHoverContent,
                    isParent,
                    ...props,
                });
            styles.push(combinedHoverStyle);
        }
        // Apply style overrides for drag state.
        if (dragStatus === types_1.DraxViewDragStatus.Dragging) {
            styles.push(draggingStyle);
            if (anyReceiving) {
                styles.push(draggingWithReceiverStyle);
            }
            else {
                styles.push(draggingWithoutReceiverStyle);
            }
        }
        else if (dragStatus === types_1.DraxViewDragStatus.Released) {
            styles.push(dragReleasedStyle);
        }
        else {
            styles.push(dragInactiveStyle);
            if (anyDragging) {
                styles.push(otherDraggingStyle);
                if (anyReceiving) {
                    styles.push(otherDraggingWithReceiverStyle);
                }
                else {
                    styles.push(otherDraggingWithoutReceiverStyle);
                }
            }
        }
        // Apply style overrides for receiving state.
        if (receiveStatus === types_1.DraxViewReceiveStatus.Receiving) {
            styles.push(receivingStyle);
        }
        else {
            styles.push(receiverInactiveStyle);
        }
        if (!viewRef) {
            return (0, transform_1.flattenStylesWithoutLayout)(styles);
        }
        return react_native_1.StyleSheet.flatten(styles);
    }, [
        style,
        dragStatus,
        receiveStatus,
        draggingStyle,
        anyReceiving,
        draggingWithReceiverStyle,
        draggingWithoutReceiverStyle,
        dragReleasedStyle,
        dragInactiveStyle,
        anyDragging,
        otherDraggingStyle,
        otherDraggingWithReceiverStyle,
        otherDraggingWithoutReceiverStyle,
        receivingStyle,
        receiverInactiveStyle,
        viewRef,
    ]);
    const animatedHoverStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        if (viewRef) {
            return {};
        }
        return {
            opacity: props.hoverPosition.value.x === 0 &&
                props.hoverPosition.value.y === 0
                ? 0
                : 1, //prevent flash when release animation finishes.
            transform: [
                {
                    translateX: props.hoverPosition?.value?.x -
                        ((props.scrollPosition?.value?.x || 0) -
                            (scrollPositionOffset?.x || 0)),
                },
                {
                    translateY: props.hoverPosition?.value?.y -
                        ((props.scrollPosition?.value?.y || 0) -
                            (scrollPositionOffset?.y || 0)),
                },
                ...(combinedStyle?.transform || []),
            ],
        };
    });
    // The rendered React children of this view.
    const renderedChildren = (0, react_1.useMemo)(() => {
        let content;
        const renderDraxContent = !viewRef
            ? renderHoverContent || renderContent
            : renderContent;
        if (renderDraxContent) {
            const renderContentProps = getRenderContentProps();
            content = renderDraxContent(renderContentProps);
        }
        else {
            content = children;
        }
        if (isParent && viewRef) {
            // This is a Drax parent, so wrap children in subprovider.
            content = (react_1.default.createElement(DraxSubprovider_1.DraxSubprovider, { parent: { id, viewRef } }, content));
        }
        return content;
    }, [
        renderContent,
        getRenderContentProps,
        children,
        isParent,
        id,
        viewRef,
        renderHoverContent,
    ]);
    return {
        renderedChildren,
        combinedStyle,
        animatedHoverStyle,
        dragStatus,
    };
};
exports.useContent = useContent;
