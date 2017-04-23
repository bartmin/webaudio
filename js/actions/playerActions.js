export const playAudio = (currentPosition) => {
    return {
        type: 'PLAY_AUDIO',
        currentPosition
    }
}

export const stopAudio = () => {
    return {
        type: 'STOP_AUDIO'
    }
}

export const pauseAudio = (currentPosition) => {
    return {
        type: 'PAUSE_AUDIO',
        currentPosition
    }
}

export const addTrack = (data) => {
    return {
        type: 'ADD_TRACK',
        data
    }
}

export const removeTrack = (id) => {
    return {
        type: 'REMOVE_TRACK',
        id
    }
}