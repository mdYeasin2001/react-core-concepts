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
        <h1>Learning React</h1>
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
        <CurrencyConversion/>
        <MathTest/>

      </header>
    </div>
  );
}

function AdditionGame() {
  const [num1, setNum1] = useState(Math.ceil(Math.random() * 10));
  const [num2, setNum2] = useState(Math.ceil(Math.random() * 10));
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
      <hr/>
    </div>
  );

  
}

const CurrencyConversion = () => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  let [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState();
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  console.log(exchangeRate);
  let fromAmount, toAmount;
  if(amountInFromCurrency){
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  }else{
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }


  console.log(fromCurrency, toCurrency);
  useEffect(() => {
    fetch('https://api.exchangeratesapi.io/latest')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const firstCurrency = Object.keys(data.rates)[0];
      setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
      setFromCurrency(data.base);
      setToCurrency(firstCurrency);
      setExchangeRate(data.rates[firstCurrency])
    })
  },[])
  return (
    <div className='currency-conversion-area'>
      <h1>Currency Conversion</h1>
      <CurrencyRow currencyKeys={currencyOptions} selectedCurrency={fromCurrency} onChangeCurrency={event => setFromCurrency(event.target.value)} amount={fromAmount} onAmountChange={(event) => setAmount(amount = event.target.value)}/>
        <p>=</p>   
      <CurrencyRow currencyKeys={currencyOptions} selectedCurrency={toCurrency} onChangeCurrency={event => setToCurrency(event.target.value)} amount={toAmount}/>
      <hr/>
    </div>
  )
}

const MathTest = () => {
  const [firstNumber, setFirstNumber] = useState(1);
  const [secondNumber, setSecondNumber] = useState(1);
  const [operator, setOperator] = useState('+');
  let [score, setScore] = useState(0);
  let [response, setResponse] = useState('');
  const [incorrect, setIncorrect] = useState(false);
  const handleEnterKeyPress = (event) => {
    if(event.key === 'Enter'){
      const answer = +response;
      if(score >= 2){
        setOperator('-');
      }
      if(score >= 5){
        setOperator('*');
      }
      if(score >= 6){
        setOperator('/');
      }
      if(operator === '+'){
        if(answer === firstNumber + secondNumber){
          setScore(score + 1);
          setFirstNumber(Math.ceil(Math.random() * 10));
          setSecondNumber(Math.ceil(Math.random() * 10));
          setIncorrect(false);
          setResponse('');
        }else{
          setIncorrect(true);
        }
      }else if(operator === '-'){
        if(answer === firstNumber - secondNumber){
          setScore(score + 1);
          setFirstNumber(Math.ceil(Math.random() * 10));
          setSecondNumber(Math.ceil(Math.random() * 10));
          setIncorrect(false);
          setResponse('');
        }else{
          setIncorrect(true);
        }
      }else if(operator === '*'){
        if(answer === firstNumber * secondNumber){
          setScore(score + 1);
          setFirstNumber(Math.ceil(Math.random() * 10));
          setSecondNumber(Math.ceil(Math.random() * 10));
          setIncorrect(false);
          setResponse('');
        }else{
          setIncorrect(true);
        }
      }else if(operator === '/'){
        if(answer === firstNumber / secondNumber){
          setScore(score + 1);
          setFirstNumber(Math.ceil(Math.random() * 10));
          setSecondNumber(Math.ceil(Math.random() * 10));
          setIncorrect(false);
          setResponse('');
        }else{
          setIncorrect(true);
        }
      }
    }
  }
  return (
    <div className="math-test-area">
      <h1>How is Your Math? Take a Test.</h1>
      <h3 className={incorrect ? 'incorrect-answer' : ''}>{firstNumber} {operator} {secondNumber}</h3>
      <input onKeyPress={handleEnterKeyPress} type="text" value={response} onChange={(event) => setResponse(response = event.target.value)}/>
      <h3>Score: {score}</h3>
    </div>
  )
}

const CurrencyRow = ({currencyKeys, selectedCurrency, onChangeCurrency, amount, onAmountChange}) => {
  // console.log(selectedCurrency);
  return (
    <div>
      <input type="number" name="" id="" value={amount} onChange={onAmountChange}/>
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {
          currencyKeys.map((key, i) => <option key={i} value={key}>{key}</option>)
        }
      </select>
    </div>
  )
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
