import { DraxRegistry, DraxProtocol, RegisterViewPayload, UnregisterViewPayload, UpdateViewProtocolPayload, UpdateViewMeasurementsPayload, DraxViewData, DraxViewMeasurements, Position, DraxFoundAbsoluteViewEntry, StartDragPayload, DraxAbsoluteViewEntry, DraxAbsoluteViewData, DraxStateDispatch, DraxSnapbackTarget, GetDragPositionDataParams } from "../types";
/** Create a Drax registry and wire up all of the methods. */
export declare const useDraxRegistry: (stateDispatch: DraxStateDispatch) => {
    registryRef: import("react").MutableRefObject<DraxRegistry>;
    getReleaseViews: () => string[];
    getViewData: (id: string | undefined) => DraxViewData | undefined;
    getAbsoluteViewData: (id: string | undefined) => DraxAbsoluteViewData | undefined;
    getTrackingDragged: () => {
        tracking: import("../types").DraxTrackingDrag;
        id: string;
        data: DraxAbsoluteViewData;
    } | undefined;
    getTrackingReceiver: () => {
        tracking: import("../types").DraxTrackingReceiver;
        id: string;
        data: DraxAbsoluteViewData;
    } | undefined;
    getTrackingMonitorIds: () => string[];
    getTrackingMonitors: () => DraxAbsoluteViewEntry[];
    getDragPositionData: (params: GetDragPositionDataParams) => {
        dragAbsolutePosition: {
            x: number;
            y: number;
        };
        dragTranslation: {
            x: number;
            y: number;
        };
        dragTranslationRatio: {
            x: number;
            y: number;
        };
    } | undefined;
    findMonitorsAndReceiver: (absolutePosition: Position, excludeViewId: string) => {
        monitors: DraxFoundAbsoluteViewEntry[];
        receiver: DraxFoundAbsoluteViewEntry | undefined;
    };
    getHoverItems: (viewIds: string[]) => ({
        scrollPosition: import("react-native-reanimated").SharedValue<Position> | undefined;
        scrollPositionOffset: Position | undefined;
        parentId?: string;
        protocol: DraxProtocol;
        measurements?: DraxViewMeasurements;
        hoverMeasurements?: DraxViewMeasurements;
        id: string;
    } | undefined)[];
    registerView: (payload: RegisterViewPayload) => void;
    updateViewProtocol: (payload: UpdateViewProtocolPayload) => void;
    updateViewMeasurements: (payload: UpdateViewMeasurementsPayload) => void;
    updateHoverViewMeasurements: (payload: UpdateViewMeasurementsPayload) => void;
    resetReceiver: () => void;
    resetDrag: (snapbackTarget?: DraxSnapbackTarget) => void;
    startDrag: (payload: StartDragPayload) => {
        dragAbsolutePosition: Position;
        dragTranslation: {
            x: number;
            y: number;
        };
        dragTranslationRatio: {
            x: number;
            y: number;
        };
        dragOffset: Position;
        hoverPosition: import("react-native-reanimated").SharedValue<Position>;
    };
    updateDragPosition: (dragAbsolutePosition: Position) => void;
    updateReceiver: (receiver: DraxFoundAbsoluteViewEntry, dragged: DraxAbsoluteViewEntry) => import("../types").DraxTrackingReceiver | undefined;
    setMonitorIds: (monitorIds: string[]) => void;
    unregisterView: (payload: UnregisterViewPayload) => void;
};
