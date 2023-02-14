import React from 'react';
import Copy from '../assets/copy.svg';
import './TextToClipboard.css'

function CopyToClipboardButton({text}) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <button onClick={copyToClipboard} className='copy-button'>
        <img src={Copy} />
    </button>
  );
}

export default CopyToClipboardButton;
