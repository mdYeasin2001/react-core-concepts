import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const products = [
    {name: 'Photoshop', price: '$90.99'},
    {name: 'Illustrator', price: '$60.99'},
    {name: 'Premier Pro', price: '$120.99'},
    {name: 'Premier El', price: '$320.99'},
  ]
  const friends = ['ali', 'bali', 'tali', 'kali']
  return (
    <div className="App">
      <header className="App-header">
        <h3>Learning React</h3>
        <Count/>
        <User/>
        <ul>
          {
            friends.map(friend => <li>{friend}</li>)
          }
          {
            products.map(pd => <li>{pd.name}</li>)
          }
        </ul>
        {
          products.map(pd => <Product productData={pd}/>)
        }
      </header>
    </div>
  );
}

function User() {
  const [users, setUser] = useState([])
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => setUser(data))
  }, [])
  return (
    <div>
      <h3>Total Users: {users.length}</h3>
      <ul>
        {
          users.map(user => <li>{user.email}</li>)
        }
      </ul>
    </div>
  )
}

function Count() {
  const [count, setCount] = useState(10);
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

function Product(props) {
  const style = {
    border: '2px solid gray',
    margin: '10px',
    height: '200px',
    width: '200px',
    background: 'teal'
  }
  const {name, price} = props.productData;
  return (
    <div style={style}>
      <h5>{name}</h5>
      <h3>{price}</h3>
      <button>Buy Now</button>
    </div>
  );
}



export default App;
