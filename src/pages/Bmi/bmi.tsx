
import { ChangeEvent, useState } from 'react';
import './bmi.css';
import healthy from '../../assets/healthy.png';
import overweight from '../../assets/overweight.png';
import underweight from '../../assets/underweight.png';

function App() {
  // state
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [message, setMessage] = useState('');

  const calcBmi = (event: React.FormEvent<HTMLFormElement>) => {
    //prevent submitting
    event.preventDefault();

    if (weight <= 0 || height <= 0) {
      alert('Please enter a valid weight and height');
    } else {
      const bmi = weight / ((height / 100) * (height / 100));
      setBmi(Number(bmi.toFixed(1)));

      // Logic for message
      if (bmi < 18.5) {
        setMessage('You are underweight consult a Nutritionist');
      } else if (bmi >= 18.5 && bmi < 28) {
        setMessage('You are a healthy weight');
      } else {
        setMessage('You are overweight consult a Nutritionist');
      }
    }
  };

  // reload the bmi
  const reload = () => {
        window.location.reload()
      }

  return (
    <div className="app">
      <div className="container">
        <h2 className="center">BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (kg)</label>
            <input value={weight} onChange={(e: ChangeEvent<HTMLInputElement>) => setWeight(Number(e.target.value))} />
          </div>
          <div>
            <label>Height (cm)</label>
            <input value={height} onChange={(e: ChangeEvent<HTMLInputElement>) => setHeight(Number(e.target.value))} />
          </div>
          <div>
            <button className="btn" type="submit">
              Submit
            </button>
            <button className='btn btn-outline' onClick={reload} type='submit'>Reload</button>
            
          </div>
        </form>

        {bmi > 0 && (
          <>
            <p>Your BMI is {bmi}</p>
            <p>{message}</p>
            <div className='container__image__bim'>
              <img src={bmi < 18.5 ? underweight : bmi >= 18.5 && bmi < 28 ? healthy : overweight} alt="healthy" />
            </div>
          </>
          
        )}
        
      </div>
    </div>
  );
}

export default App;






















