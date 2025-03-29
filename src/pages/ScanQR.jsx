import React from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

const ScanQR = () => {
  return (
    <>
      <p className='p-4 text-center font-bold text-2xl'>Silahkan QR Scan Code Guest / Tamu</p>
      <Scanner
        onScan={(result) => console.log(result)}
        facingMode="user" // Show the front camera
        resolution={1280} // Set the resolution to 1280x720
        style={{ width: '100%', height: '100vh' }} // Set the camera view to full screen
      />
    </>
  )
}

export default ScanQR