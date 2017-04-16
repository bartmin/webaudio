import React from 'react';
import ReactDOM from 'react-dom';
import ToolsMenu from './components/toolsMenu';
import Track from './components/track';


export class MainView extends React.Component{
    constructor(props) {
		super(props);
		
        this.state = {
            tracks : [],
            zoom : 1, // ...,-8,-4,-2,1,2,4,8,...
            currentFrame: {
                begin: 0,
                end: 0
            }
        };
    }

    addNewTrack(buffer) {
        var track_count = this.state.tracks.length + 1;
        var new_track_name = "Track " + track_count;
        buffer.offset = 0;

        var new_tracklist = this.state.tracks;
        new_tracklist.push({
            name: new_track_name,
            buffer: [buffer]
        });
        this.setState({tracks: new_tracklist});
    }

    handleFileLoad(file_content) {
        try {
            APP.CONTEXT.decodeAudioData(file_content, this.addNewTrack.bind(this));
        }
        catch (e) {
            console.log(e);
        }
    }

    zoomIn() {
        if (this.state.tracks.length !== 0) {
            var currentState = this.state;

            if (currentState.zoom >= 1) {
                currentState.zoom *= 2;
            }
            else if (currentState.zoom < -2) {
                currentState.zoom /= 2;
            }
            else {
                currentState.zoom = 1;
            }

            this.setState(currentState);
        }
    }

    zoomOut() {
        if (this.state.tracks.length !== 0) {
            var currentState = this.state;

            if (currentState.zoom > 1) {
                currentState.zoom /= 2;
            }
            else if (currentState.zoom <= -2) {
                currentState.zoom *= 2;
            }
            else {
                currentState.zoom = -2;
            }

            this.setState(currentState);
        }
    }

    render() {
        return (
            <div id="container">
                <div id="menu">
                    <ToolsMenu onFileLoad={this.handleFileLoad.bind(this)} zoomIn={this.zoomIn.bind(this)} zoomOut={this.zoomOut.bind(this)}
                               onAudioPlay={() => this.props.playAudio(this.state.tracks)} onAudioPause={this.props.pauseAudio} onAudioStop={this.props.stopAudio} />
                </div>
                <div id="tracks">
                    {this.state.tracks.map((t) => (
                        <Track type="audio" data={t} zoom={this.state.zoom} />
                    ))}
                </div>
            </div>
        );
    }
};