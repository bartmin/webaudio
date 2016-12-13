window.APP = {
    CONTEXT : new AudioContext() || new WebKitAudioContext(),
    settings: {
        ZOOM_LEVEL : 1,
        LINES_PER_SCREEN: 2000
    },

    POSITION: 0.0,

    // gets an array with data?
    playAudio: function(tracks) {
        console.log(tracks);
        alert(tracks);
    },

    pauseAudio: function() {

    },

    stopAudio: function() {
        this.POSITION = 0.0;
    },


    init: function() {
        ReactDOM.render(
            <MainView />,
            document.body
        );
    }
};


APP.init();