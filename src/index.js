import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';

import Start from './components/start/Start';

let renderDOM;
const config = {w: window.innerWidth, h: window.innerHeight};
const divStyle = { "height": config.h };
sessionStorage.setItem("config", JSON.stringify(config));

if (typeof(Storage) !== undefined) {
	injectTapEventPlugin();
	renderDOM = 
		<div className="Index-div" style={ divStyle }>
			<div className="Index-div2">
				<MuiThemeProvider><Start /></MuiThemeProvider>
			</div>
		</div>;
} 
else {
    renderDOM = 
    	<div className="Index-div" style={ divStyle }>
    		<div className="Index-div2">
    			<h2>Sorry! Your Browser Not Support..</h2>
    		</div>
    	</div>;
}

ReactDOM.render(
	renderDOM,
	document.getElementById('root')
);