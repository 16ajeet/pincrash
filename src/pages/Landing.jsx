import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePinChange = (e) => {
    setPin(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin.length !== 6 || isNaN(pin)) {
      setError('Invalid pin');
      return;
    }
    setError('');
    // Navigate to the detail page with the pin code
    navigate(`/pin-detail/${pin}`);
  };

  return (
    <div className='flex flex-col items-start w-3/4 gap-3 ml-10'>
      <p className='pt-5 font-bold text-[18px] tracking-wide'>Enter Pincode</p>

      <form onSubmit={handleSubmit} className='flex flex-col items-start w-3/4 gap-3'>
        <input
          type="text"
          placeholder='Pincode'
          className='w-5/6 px-5 py-2 rounded border border-b-2 border-black focus:outline-none focus:placeholder-transparent'
          maxLength={6}
          onChange={handlePinChange}
          value={pin}
        />
        {error && <p className="text-red-600">{error}</p>}
        <button type="submit" className='bg-black text-white px-20 py-2 rounded'>Lookup</button>
      </form>
    </div>
  );
};

export default Landing;
