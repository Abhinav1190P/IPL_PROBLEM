import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise'
import Layout from './layout';
import AllTeams from './component/allTeams';
import {ChakraProvider} from '@chakra-ui/react'
import Reducers from './reducers/index'
import GroupedTeams from './component/groupedTeams';
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore)


const App = () => {
  return (
    <div>
      <Layout>
        <Router>
          <Routes>
            <Route path='/' element = {<AllTeams/>}/>
            <Route path='/grouped' element = {<GroupedTeams/>}/>
          </Routes>
        </Router>
      </Layout>
    </div>
  )
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={createStoreWithMiddleware(Reducers)}>
    <ChakraProvider>
    <App />
    </ChakraProvider>
    </Provider>
);

