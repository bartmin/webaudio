import React from 'react';
import ReactDOM from 'react-dom';
import PlayerControls from './playerControls';
import OtherControls from './otherControls';

export default class ToolsMenu extends React.Component{
    handleLoadFile(data) {
        this.props.onFileLoad(data);
    }


    render() {
        return (
            <div className="tools-menu-container">
                <PlayerControls onAudioPlay={this.props.onAudioPlay}  onAudioPause={this.props.onAudioPause}  onAudioStop={this.props.onAudioStop} />
                <OtherControls loadFile={this.handleLoadFile.bind(this)} zoomIn={this.props.zoomIn} zoomOut={this.props.zoomOut}/>
            </div>
        );
    }
};