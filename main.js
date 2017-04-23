import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import ReactDOM from 'react-dom';

import {MainView} from './js/views.jsx';
import audioApp from './js/reducers';
;

let store = createStore(audioApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


window.APP = {
	CONTEXT : new AudioContext() || new WebKitAudioContext(),
	settings: {
		LINES_PER_SCREEN: 4000,
		CANVAS_WIDTH: 1400,
		CANVAS_HEIGHT: 200
	},

	init: function() {
		ReactDOM.render(
			<Provider store={store}>
				<MainView />
			</Provider>,
			document.body
		);

	}
};


APP.init();