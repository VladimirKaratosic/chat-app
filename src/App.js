import ChatLog from './components/ChatLog/ChatLog';
import LogIn from './components/LogIn/LogIn';
import React, { useReducer, useLayoutEffect } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.scss';

function App() {
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  // When window is resized, rerender the Component so it could use appropriate background images
  useLayoutEffect(() => {
    window.addEventListener('resize', forceUpdate);
    return () => window.removeEventListener('resize', forceUpdate);
  }, []);

  const minStyles = {
    App: {
      backgroundImage: `url('${process.env.PUBLIC_URL}assets/mobile_BodyBG.png')`,
    }
  };

  const maxStyles = {
    App: {
      backgroundImage: `url('${process.env.PUBLIC_URL}assets/BodyBG.png')`,
    }
  }

  let style = () => {
    if (window.innerWidth < 800) {
      return minStyles;
    } else {
      return maxStyles;
    }
  };


  return (
    <BrowserRouter>
      <div className="App" style={style().App}>
        <Switch>
          <Route exact path='/' component={LogIn} />
          <Route path='/chat' component={ChatLog} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
