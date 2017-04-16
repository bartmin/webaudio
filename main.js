import React from 'react';
import ReactDOM from 'react-dom';
import {MainView} from './js/views.jsx';

window.APP = {
		CONTEXT : new AudioContext() || new WebKitAudioContext(),
		settings: {
			LINES_PER_SCREEN: 4000,
			CANVAS_WIDTH: 1400,
			CANVAS_HEIGHT: 200
		},

		POSITION: 0.0, //

		// gets an array with data?
		playAudio: function(tracks) {
			console.log(tracks);
		},

		pauseAudio: function() {

		},

		stopAudio: function() {
			this.POSITION = 0.0;
		},


		init: function() {
			ReactDOM.render(
					<MainView playAudio={this.playAudio} stopAudio={this.stopAudio()} pauseAudio={this.pauseAudio} />,
					document.body
			);

		}
	};


	APP.init();