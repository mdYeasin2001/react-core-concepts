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
        {/* <Count/> */}
        {/* <User/> */}
        {/* <ul>
          {
            friends.map(friend => <li>{friend}</li>)
          }
          {
            products.map(pd => <li>{pd.name}</li>)
          }
        </ul> */}
        {/* {
          products.map(pd => <Product productData={pd}/>)
        } */}

        <AdditionGame/>

      </header>
    </div>
  );
}

function AdditionGame() {
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(1);
  const [score, setScore] = useState(0);
  const [incorrect, setIncorrect] = useState(false);
  let [response, setResponse] = useState('');

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      const answer = +response;
      // console.log(answer, num1 + num2);
      if (answer == num1 + num2){
        setScore(score + 1);
        setNum1(Math.ceil(Math.random() * 10));
        setNum2(Math.ceil(Math.random() * 10));
        setResponse('');
        setIncorrect(false);
      }else{
        setResponse('');
        setIncorrect(true);
      }
    }
  }
  return(
    <div className="addition">
      <h1>Test Your Math Knowledge</h1>
      <h2 className={incorrect ? 'incorrect' : ''}>{num1} + {num2}</h2>
      <input onKeyPress={handleKeyPress} onChange={(event) => setResponse(response = event.target.value)} value={response} type="text"/>
      <div>
        <h3>Score: {score}</h3>
      </div>
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
