var TrackVolumeSlider = React.createClass({
    render: function() {
        return (
            <div className="volume-control-container">
                <input type="range" defaultValue={this.props.volume} onChange={this.props.changeVolume}
                       className="volume-slider" min="0" max="100" step="1" />
                <span>
                        <h4 className="volume-label">{this.props.volumeLabel}:</h4>
                        <span className="volume-value">
                            <input type="text" className="volume-input" min="0" max="100" disabled
                                   onChange={this.props.changeVolume} value={this.props.volume} />
                            <span>%</span>
                        </span>
                    </span>
            </div>
        );
    }
});

var TrackPanningSlider = React.createClass({
    render: function() {
        return (
            <div className="panning-container">
                <input type="range" defaultValue={this.props.panning} onChange={this.props.changePanning}
                       className="panning-slider" min="0" max="100" />
				<span>
					<h4 className="panning-label">{this.props.panningLabel}:</h4>
					<span className="panning-value">
						<input type="text" className="panning-input" min="0" max="100" disabled
                               onChange={this.props.changePanning} value={this.props.panning} />
						<span>%</span>
					</span>
				</span>
            </div>
        );
    }
});

var TrackButtonContainer = React.createClass({
    render: function() {
        var soloClass = (this.props.solo === false) ? "solo-button disabled" : "solo-button enabled";
        var muteClass = (this.props.mute === false) ? "mute-button disabled" : "mute-button enabled";
        var recordClass = (this.props.record === false) ? "record-button disabled" : "record-button enabled";

        return (
            <div className="buttons-container">
                <button className={soloClass} onClick={this.props.toggleSolo}>S</button>
                <button className={muteClass} onClick={this.props.toggleMute}>M</button>
                <button className={recordClass} onClick={this.props.toggleRecord}>R</button>
            </div>
        );
    }
});

var TrackHideButton = React.createClass({
    render: function() {
        return (
            <div className="hide-button-container">
                <button className="hide-button">(strzałka w górę)</button>
            </div>
        );
    }
});

var TrackHeader = React.createClass({
    render: function() {
        return (<span className="track-header"><h3>Ścieżka 1</h3><span className="track-color-button"></span></span>);
    }
});

var Track = React.createClass({
    getInitialState: function () {
        return {
            volume: 50,
            panning: 50,
            audio: null,
            solo: false,
            mute: false,
            record: false,
            color: 'yellow',
            collapsed: false
        };
    },

    toggleSolo: function() {
        this.setState({solo : !this.state.solo});
    },

    toggleMute: function() {
        this.setState({mute : !this.state.mute});
    },

    toggleRecord: function() {
        this.setState({record : !this.state.record});
    },

    changeVolume: function(e) {
        var vol = e.target.value;
        if (vol <= 100 && vol >= 0)
            this.setState({volume: vol});
    },

    changePanning: function(e) {
        var pan = e.target.value;
        if (pan <= 100 && pan >= 0)
            this.setState({panning: pan});
    },

    render: function() {
        return (
            <div className="track-container">
                <div className="track-controls">
                    <span className="track-header"><h3>Ścieżka 1</h3><span className="track-color-button"></span></span>
                    <TrackVolumeSlider volume={this.state.volume} volumeLabel="Głośność"
                                       changeVolume={this.changeVolume} />
                    <TrackPanningSlider panning={this.state.panning} panningLabel="Panorama"
                                        changePanning={this.changePanning} />
                    <TrackButtonContainer solo={this.state.solo} mute={this.state.mute} record={this.state.record}
                                          toggleSolo={this.toggleSolo} toggleMute={this.toggleMute} toggleRecord={this.toggleRecord} />
                    <div className="hide-button-container">
                        <button className="hide-button">(strzałka w górę)</button>
                    </div>
                </div>
                <div className="track-content">
                    <TrackWaveform data={this.state.audio} />
                </div>
            </div>
        );
    }
})

var TrackWaveform = React.createClass({
    render: function() {
        return(
            <canvas className="waveform-canvas">

            </canvas>
        );
    }
});

var PlayerControls = React.createClass({
    render: function() {
        return (
            <div className="player-controls">
                <button className="start-button"><img src="./img/icons/start.png" /></button>
                <button className="pause-button"><img src="./img/icons/pause.png" /></button>
                <button className="stop-button"><img src="./img/icons/stop.png" /></button>
                <button className="home-button"><img src="./img/icons/back.png" /></button>
                <button className="end-button"><img src="./img/icons/end.png" /></button>
            </div>
        );
    }
});

var OtherControls = React.createClass({
    getInitialState: function() {
        return ({trackLoaderVisible: false});
    },

    toggleTrackLoader: function() {
        if (!this.state.trackLoaderVisible)
            document.getElementById("track-loader").style.display = "inline-block";
        else
            document.getElementById("track-loader").style.display = "none";

        this.setState({trackLoaderVisible: !this.state.trackLoaderVisible});
    },

    loadFile: function(e) {
        this.toggleTrackLoader();
        var file = e.target.files[0]; // we assume there is only one file
        console.log(file);
    },

    render: function() {
        return (
            <div className="other-controls">
                <button className="add-button"><img src="./img/icons/plus.png" onClick={this.toggleTrackLoader} /></button>
                <input type="file" accept="audio/*" className="track-loader" id="track-loader" onChange={this.loadFile} />
            </div>
        );
    }
});

var ToolsMenu = React.createClass({
    render: function() {
        return (
            <div className="tools-menu-container">
                <PlayerControls/>
                <OtherControls/>
            </div>
        );
    }
});

app = {
    init: function() {
        ReactDOM.render(
            <ToolsMenu />,
            document.getElementById('menu')
        );
        ReactDOM.render(
            <Track />,
            document.getElementById('tracks')
        );
    }
};

app.init();