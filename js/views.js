TrackVolumeSlider = React.createClass({
    render: function() {
        return (
            <div className="volume-control-container">
                <span>
                    <h4 className="volume-label">{this.props.volumeLabel}:</h4>
                    <span className="volume-value">
                        <input type="text" className="volume-input" min="0" max="200" disabled
                               onChange={this.props.changeVolume} value={this.props.volume} />
                        <span>%</span>
                    </span>
                </span>
                <input type="range" defaultValue={this.props.volume} onChange={this.props.changeVolume}
                       className="volume-slider" min="0" max="200" step="1" />
            </div>
        );
    }
});

TrackPanningSlider = React.createClass({
    render: function() {
        return (
            <div className="panning-container">
				<span>
					<h4 className="panning-label">{this.props.panningLabel}:</h4>
					<span className="panning-value">
						<input type="text" className="panning-input" min="0" max="100" disabled
                               onChange={this.props.changePanning} value={this.props.panning} />
						<span>%</span>
					</span>
				</span>
                <input type="range" defaultValue={this.props.panning} onChange={this.props.changePanning}
                       className="panning-slider" min="0" max="100" />
            </div>
        );
    }
});

TrackButtonContainer = React.createClass({
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

TrackHideButton = React.createClass({
    render: function() {
        return (
            <div className="hide-button-container">
                <button className="hide-button">(strzałka w górę)</button>
            </div>
        );
    }
});

TrackHeader = React.createClass({
    render: function() {
        return (<span className="track-header"><h3>Ścieżka 1</h3><span className="track-color-button"></span></span>);
    }
});

Track = React.createClass({
    getInitialState: function () {
        return {
            volume: 100,
            panning: 50,
            solo: false,
            mute: false,
            record: false,
            collapsed: false,
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
        if (vol <= 200 && vol >= 0)
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
                    <span className="track-header"><h3>{this.props.data.name}</h3><span className="track-color-button"></span></span>
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
                    <TrackWaveform type={this.props.type} clips={this.props.data.buffer} />
                </div>
            </div>
        );
    }
});

// clips: array of AudioBuffer objects with offset added
TrackWaveform = React.createClass({
    getInitialState: function() {
        return {clips: this.props.clips};
    },

    componentDidMount: function() {
        this.drawWaveform()
    },

    drawWaveform: function() {
        var ctx = this.refs.waveform.getContext("2d");
        var clip = this.state.clips[0];
        var leftChannel = clip.getChannelData(0);
        var lines = APP.settings.LINES_PER_SCREEN;
        var eachBlock = Math.floor(leftChannel.length / lines);
        var lineGap = (1000/lines);

        ctx.save();
        ctx.fillStyle = '#222' ;
        ctx.fillRect(0,0,1000,200 ); //ctx.fillRect(0,0,canvasWidth,canvasHeight )
        ctx.strokeStyle = '#121';
        ctx.globalCompositeOperation = 'lighter';
        ctx.translate(0,200 / 2);
        ctx.globalAlpha = 0.8 ;

        for (var i=0; i<  lines; i++) {
            var audioBuffKey = Math.floor(eachBlock * i);
            var x = i*lineGap;
            var y = leftChannel[audioBuffKey] * 200 / 2;
            ctx.moveTo( x, y );
            ctx.lineTo( x, (y*-1) );
        }

        ctx.stroke();
        ctx.restore();
    },

    render: function() {
        return(
            <canvas className="waveform-canvas" width="1000" height="200" ref="waveform">

            </canvas>
        );
    }
});

PlayerControls = React.createClass({
    render: function() {
        return (
            <div className="player-controls">
                <button className="start-button"><img src="./img/icons/start.png" onClick={this.props.onAudioPlay} /></button>
                <button className="pause-button"><img src="./img/icons/pause.png" onClick={this.props.onAudioPause} /></button>
                <button className="stop-button"><img src="./img/icons/stop.png" onClick={this.props.onAudioStop} /></button>
                <button className="home-button"><img src="./img/icons/back.png" /></button>
                <button className="end-button"><img src="./img/icons/end.png" /></button>
            </div>
        );
    }
});

OtherControls = React.createClass({
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

        var data; // we will fill this with data
        var fr = new FileReader(); // lets initialize FileReader()
        var tmp_context = this; // it's important


        fr.onload = function(e) {           // and after reading file...
            data = e.target.result;       // ... we retrieve data...
            tmp_context.props.loadFile(data);   // ... and pass them to parent's function
        };

        fr.readAsArrayBuffer(file);
        document.getElementById('track-loader').value = "";  // reset FILE input
    },

    showAddTrackModal: function() {
        this.toggleTrackLoader();
    },

    render: function() {
        return (
            <div className="other-controls">
                <button className="zoom-in-button" onClick={this.props.zoomIn}><img arc="./img/icons/" alt="++" /></button>
                <button className="zoom-out-button" onClick={this.props.zoomOut}><img arc="./img/icons/" alt="--" /></button>
                <button className="add-button"><img src="./img/icons/plus.png" onClick={this.showAddTrackModal} /></button>
                <input type="file" accept="audio/*" className="track-loader" id="track-loader" onChange={this.loadFile} />
            </div>
        );
    }
});

ToolsMenu = React.createClass({
    handleLoadFile: function(data) {
        this.props.onFileLoad(data);
    },


    render: function() {
        return (
            <div className="tools-menu-container">
                <PlayerControls onAudioPlay={this.props.onAudioPlay}  onAudioPause={this.props.onAudioPause}  onAudioStop={this.props.onAudioStop} />
                <OtherControls loadFile={this.handleLoadFile} zoomIn={this.props.zoomIn} zoomOut={this.props.zoomOut}/>
            </div>
        );
    }
});



MainView = React.createClass({
    getInitialState: function() {
        return ({tracks : []});
    },

    addNewTrack: function(buffer) {
        var track_count = this.state.tracks.length + 1;
        var new_track_name = "Ścieżka " + track_count;
        buffer.offset = 0;

        var new_tracklist = this.state.tracks;
        new_tracklist.push({
            name: new_track_name,
            buffer: [buffer]
        });
        this.setState({tracks: new_tracklist});
    },

    handleFileLoad: function(file_content) {
        try {
            APP.CONTEXT.decodeAudioData(file_content, this.addNewTrack);
        }
        catch (e) {
            console.log(e);
        }
    },

    zoomIn: function() {
        if (this.state.tracks.length !== 0) {
            alert("Zoom in");
        }
    },

    zoomOut: function() {
        if (this.state.tracks.length !== 0) {
            alert("Zoom out");
        }
    },

    render: function() {
        return (
            <div id="container">
                <div id="menu">
                    <ToolsMenu onFileLoad={this.handleFileLoad} zoomIn={this.zoomIn} zoomOut={this.zoomOut}
                               onAudioPlay={() => this.props.playAudio(this.state.tracks)} onAudioPause={this.props.pauseAudio} onAudioStop={this.props.stopAudio} />
                </div>
                <div id="tracks">
                    {this.state.tracks.map((t) => (
                        <Track type="audio" data={t} />
                    ))}
                </div>
            </div>
        );
    }
});