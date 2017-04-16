import React from 'react';
import ReactDOM from 'react-dom';

export default class TrackPanningSlider extends React.Component{
    render() {
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
};