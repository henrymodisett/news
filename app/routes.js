import React from 'react';
import { Route, Switch } from 'react-router-dom';
import News from './containers/News';
import About from './components/About';

export default (
	<Switch>
		<Route exact path="/" component={News} />
		<Route path="/about" component={About} />
	</Switch>
);
