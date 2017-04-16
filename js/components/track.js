import React from 'react';
import ReactDOM from 'react-dom';
import TrackVolumeSlider from './trackVolumeSlider';
import TrackPanningSlider from './trackPanningSlider';
import TrackButtonContainer from './trackButtonContainer';
import TrackWaveform from './trackWaveform';


export default class Track extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            volume: 100,
            panning: 50,
            solo: false,
            mute: false,
            record: false,
            collapsed: false,
        };
    }

    toggleSolo() {
        this.setState({solo : !this.state.solo});
    }

    toggleMute() {
        this.setState({mute : !this.state.mute});
    }

    toggleRecord() {
        this.setState({record : !this.state.record});
    }

    changeVolume(e) {
        var vol = e.target.value;
        if (vol <= 200 && vol >= 0)
            this.setState({volume: vol});
    }

    changePanning(e) {
        var pan = e.target.value;
        if (pan <= 100 && pan >= 0)
            this.setState({panning: pan});
    }

    render() {
        return (
            <div className="track-container">
                <div className="track-controls">
                    <span className="track-header"><h3>{this.props.data.name}</h3><span className="track-color-button"></span></span>
                    <TrackVolumeSlider volume={this.state.volume} volumeLabel="Volume"
                                       changeVolume={this.changeVolume.bind(this)} />
                    <TrackPanningSlider panning={this.state.panning} panningLabel="Panning"
                                        changePanning={this.changePanning.bind(this)} />
                    <TrackButtonContainer solo={this.state.solo} mute={this.state.mute} record={this.state.record}
                                          toggleSolo={this.toggleSolo.bind(this)} toggleMute={this.toggleMute.bind(this)} toggleRecord={this.toggleRecord.bind(this)} />
                    <div className="hide-button-container">
                        <button className="hide-button">(strzałka w górę)</button>
                    </div>
                </div>
                <div className="track-content">
                    <TrackWaveform type={this.props.type} clips={this.props.data.buffer} zoom={this.props.zoom} />
                </div>
            </div>
        );
    }
};