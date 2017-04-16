import React from 'react';
import ReactDOM from 'react-dom';

export default class TrackVolumeSlider extends React.Component{
    render() {
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
};