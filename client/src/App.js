import './App.css';
import {Routes, Route} from 'react-router-dom'
import Cart from './components/cart/Cart';
import Products from './components/productItem/ProductItem';
import Success from './components/success/Success';

function App() {


  return (
    <div>
      <Routes>
        <Route path='/' element={
          <>
            <Cart />
            <Products />
          </>
        } />
        <Route path='/success' element={<Success />} />
      </Routes>
    </div>
  );
}

export default App;
