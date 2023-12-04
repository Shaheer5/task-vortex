// Avatar.js
import React from 'react';
import './Avatar.css';

export default function Avatar({ src }) {
  // if (!src) {
  //   console.error("Avatar component is missing the 'src' prop!");
  //   return null;
  // }

  return (
    <div className='avatar'>
      <img src={src} alt="user avatar" />
    </div>
  );
}
