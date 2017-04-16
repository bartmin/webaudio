import React from 'react';
import ReactDOM from 'react-dom';

export default class TrackButtonContainer extends React.Component{
    render() {
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
};