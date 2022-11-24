import { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { colors, codes } from './data';

const Cat = () => {
  const history = useHistory();
  const [colorNum, setColorNum] = useState(0);
  const [statusChange, setStatusChange] = useState(() => {
    if(!localStorage.getItem('catStatus')){
      return '418';
    }
    return localStorage.getItem('catStatus');
  });
  const [status, setStatus] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setStatusChange(status);
    console.log(status);
    console.log(statusChange);
    setStatus('');
  };

  

  useEffect(() => {
    function increase() {
      colorNum >= colors.length ?
      setColorNum(0) : setColorNum(c => c + 1)
    }
    const interval = setInterval(increase, 5000);  
    return () => {
      clearInterval(interval)}
  }, []);

  useEffect(() => {
    localStorage.setItem('catStatus', statusChange);
  }, [statusChange]);

  useEffect(() => {
    if(statusChange === ''){
      alert('Please Enter A Code');
      setStatusChange('404');
    }
    if(!codes.includes(Number(statusChange))){
      alert(`Code ${statusChange} might exist, but it is not a proper Cat Status code.`); 
      setStatusChange('404');
    }

    
  }, [statusChange])

  return (
    <div
      className='cat-container'
      style={{
        backgroundColor: colors[colorNum],
        transition: 'background-color 4s',
      }}
    >
      <h1>Cat Status {colorNum}</h1>
      <button onClick={() => history.push('/')}>Home</button>
      <div className='image-container'>
        <img src={`https://http.cat/${statusChange}`} alt='404' />
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='cStatus'>
          <input
            type='number'
            id='cStatus'
            onChange={e => setStatus(e.target.value)}
            placeholder='find new status'
            value={status}
          />
        </label>
        <button type='submit'>Change Status</button>
      </form>
    </div>
  );
};

export default Cat;