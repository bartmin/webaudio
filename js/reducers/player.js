var initialState = {
    isPlaying: false,
    isPaused: false,
    currentPosition: 0,
    tracks: [
        /*
         {
         id: 0,
         data: AudioBuffer,
         mute: false,
         solo: false,
         name: "Track 1",
         volume: 100,
         panning: 50,
         collapsed: false
         }
        */
    ]
};

const player = (state = initialState, action) => {
    switch (action.type) {
        case 'PLAY_AUDIO':
            return {
                ...state,
                isPlaying: true
            };
        case 'PAUSE_AUDIO':
            return {
                ...state,
                isPaused: true
            };
        case 'STOP_AUDIO':
            return {
                ... state,
                isPlaying: false
            };
        case 'ADD_TRACK':
            var cid = state.tracks.length;

            return {
                ... state,
                tracks: [
                    ...state.tracks,
                    {
                        id: cid,
                        data: action.data,
                        mute: false,
                        solo: false,
                        name: "Track " + cid,
                        volume: 100,
                        panning: 50,
                        collapsed: false
                    }
                ]
            };
        default:
            return {
                ... state,
                isPlaying: false
            }
    }
}

export default player