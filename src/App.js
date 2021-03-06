import React,{useState, useEffect} from 'react';
import  {  Route, Link } from 'react-router-dom';
// import data from './data';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import './App.css';
import SigninScreen from './Screens/SigninScreen';
import RegisterScreen from './Screens/RegisterScreen';
import AppContext from './AppContext';
import config from './config'



function App() {
  const [cart, setCart] = useState([])

  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch(`${config.API_ENDPOINT}/products`)
    .then(res => res.json())
    .then(products => setProducts(products))
  }, [])

  const openMenu = ()=> {
    document.querySelector('.sidebar').classList.add('open');

  };

  const closeMenu = ()=> {
    document.querySelector('.sidebar').classList.remove('open');
  };

  const addToCart = (item)=>{
    setCart([...cart, item])
  }

  const value = {
    cart,
    addToCart,
    products
  }

  return (
    <AppContext.Provider value ={value}>
    <div className='grid-container'>
      <header className='header'>
        <div className='brand'>
          <button onClick={openMenu}>
            &#9776;
          </button>
        </div>
        <div className='header-links'>
          <Link to='/'>African Clothing</Link>
        </div>
        <div className='header-links'>
           <Link to='/cart'> Cart-{cart.length}</Link>
          <Link to='/signin'> Sign In </Link>
        </div>
      </header>
      <aside className='sidebar'>
        <h3>Shopping Categories</h3>
        <button className='sidebar-close-button' onClick={closeMenu}>X</button>
        <ul className='categories'>
          <li key="category1"><Link to='/category/Skirt and Blouse'>Skirt and Blouse</Link></li>
          <li key="category2"><Link to='/category/Gown'>Gown</Link></li>
          <li key="category3"><Link to='/category/Blouse'>Blouse</Link></li>
          <li key="category4"><Link to='/category/Skirt'>Skirt</Link></li>
        </ul>
      </aside>
     
      <main className ='main'>
        <div className='content'>
          <Route path='/product/:id' component={ProductScreen}/>
          <Route path='/signin' component={SigninScreen}/>
          <Route path='/register' component={RegisterScreen}/>
          <Route path='/cart/:id?' component={CartScreen}/>
          <Route path="/category/:id" component={HomeScreen} />
          <Route path='/' exact component={HomeScreen}/>
          
        </div>
        
        </main>

    <footer className='footer'>All right reserved</footer>
    </div>
    </AppContext.Provider>
  );
}

export default App;