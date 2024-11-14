// App.js
import React from 'react';
import ProductList from './components/ProductList';
import Header from './components/Header';

const App = () => {
  return (
    <div className="app">
      <Header />
      <ProductList/>
    </div>
  );
};

export default App;
