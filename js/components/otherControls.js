import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import * as PlayerActions from '../actions/playerActions.js'

class OtherControls extends React.Component{
    constructor(props) {
        super(props);
        this.state = {trackLoaderVisible: false};
    }

    toggleTrackLoader() {
        if (!this.state.trackLoaderVisible)
            document.getElementById("track-loader").style.display = "inline-block";
        else
            document.getElementById("track-loader").style.display = "none";

        this.setState({trackLoaderVisible: !this.state.trackLoaderVisible});
    }

    loadFile(e) {
        this.toggleTrackLoader();
        var file = e.target.files[0]; // we assume there is only one file

        var data; // we will fill this with data
        var fr = new FileReader(); // lets initialize FileReader()
        var tmp_context = this; // it's important


        fr.onload = function(e) {           // and after reading file...
            data = e.target.result;       // ... we retrieve data...
            tmp_context.props.loadFile(data);   // ... and pass them to parent's function

            APP.CONTEXT.decodeAudioData(data).then(function(data) {
                tmp_context.props.playerActions.addTrack(data);
                console.log(data);
            }.bind(this));
        };

        fr.readAsArrayBuffer(file);
        document.getElementById('track-loader').value = "";  // reset FILE input
    }

    render() {
        return (
            <div className="other-controls">
                <button className="zoom-in-button" onClick={this.props.zoomIn}><img src="./img/icons/" alt="++" /></button>
                <button className="zoom-out-button" onClick={this.props.zoomOut}><img src="./img/icons/" alt="--" /></button>
                <button className="add-button"><img src="./img/icons/plus.png" onClick={this.toggleTrackLoader.bind(this)} /></button>
                <input type="file" accept="audio/*" className="track-loader" id="track-loader" onChange={this.loadFile.bind(this)} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        player: state.player
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        playerActions: bindActionCreators(PlayerActions, dispatch)
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OtherControls)