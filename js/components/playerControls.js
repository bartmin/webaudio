import React from 'react';
import ReactDOM from 'react-dom';

export default class PlayerControls extends React.Component{
    render() {
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
};