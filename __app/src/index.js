import React    from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router , Switch , Route } from 'react-router-dom';
import { DefaultHeadSEO , HeadSeo } from './seoTag';

import App_main    from './_routes/app_main/main.render';
import App_explore from './_routes/app_explore/explore.homepage';

import './_cssLibrary/class_reset.css';
import './_cssLibrary/class_app.scss';

const App = () => {
    return (
      <Router>
          <div className="App">
                <HeadSeo title={ 'gmail reminder' } description={ 'my main app description'} keywords={ 'react , css' }/>
                <Switch>
                    <Route path="/"    exact component={ App_explore } />
                    <Route path="/app" exact component={ App_main    } />
                </Switch>
          </div>
    </Router>
    );
}

export { App };

ReactDOM.render( <App /> , document.getElementById('root'));
