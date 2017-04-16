import React from 'react';
import ReactDOM from 'react-dom';

// clips: array of AudioBuffer objects with offset added
export default class TrackWaveform extends React.Component{
    constructor(props) {
        super(props)
        this.state = {clips: this.props.clips};
    }

    componentDidMount() {
        this.drawWaveform()
    }

    drawWaveform() {
        var ctx = this.refs.waveform.getContext("2d");
        var clip = this.state.clips[0];
        var leftChannel = clip.getChannelData(0);
        var lines = APP.settings.LINES_PER_SCREEN;
        var eachBlock = Math.floor(leftChannel.length / lines);
        var lineGap = (APP.settings.CANVAS_WIDTH/lines);

        ctx.save();
        ctx.fillStyle = '#000' ;
        ctx.fillRect(0,0,APP.settings.CANVAS_WIDTH,APP.settings.CANVAS_HEIGHT); //ctx.fillRect(0,0,canvasWidth,canvasHeight )
        ctx.strokeStyle = '#484';
        ctx.globalCompositeOperation = 'lighter';
        ctx.translate(0,APP.settings.CANVAS_HEIGHT / 2);
        ctx.globalAlpha = 0.8 ;

        for (var i = 0; i <  lines; i++) {
            var audioBuffKey = Math.floor(eachBlock * i);
            var x = i*lineGap;
            var y = leftChannel[audioBuffKey] * APP.settings.CANVAS_HEIGHT / 2;
            ctx.moveTo( x, y );
            ctx.lineTo( x, (y*-1) );
        }

        ctx.stroke();
        ctx.restore();
    }

    render() {
        return(
            <canvas className="waveform-canvas" width="1000" height="200" ref="waveform">

            </canvas>
        );
    }
};