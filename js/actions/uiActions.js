export const zoomIn = (currentZoom) => {
    return {
        type: 'ZOOM_IN',
        currentZoom
    }
}

export const zoomOut = (currentZoom) => {
    return {
        type: 'ZOOM_OUT',
        currentZoom
    }
}

export const changePosition = (newPosition) => {
    return {
        type: 'CHANGE_POSITION',
        newPosition
    }
}