import React from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { Modal } from 'antd';

const ScanQR = ({ db }) => {

    const updateGuest = (guestName) => {
        const guestRef = db.collection('guests').doc(guestName);
        const updatedAt = serverTimestamp();
        guestRef.update({ check_in: updatedAt }).then(() => {
            // console.log('Guest updated successfully!');
            Modal.success({ content: `Selamat Datang ${guestName}, Silahkan Ambil Souvenir nya` })
        }).catch(error => {
            // console.error('Error updating guest: ', error);
            Modal.error({ content: 'Error updating guest' })
        });
    }
    const findGuest = (guestName) => {
        const guestRef = db.collection('guests').doc(guestName);
        guestRef.get().then((doc) => {
            if (doc.exists) {
                // console.log('Guest found:', doc.data());
                updateGuest(guestName);
            } else {
                Modal.error({ content: 'Tamu tidak ditemukan' })
                console.log('Guest not found');
            }
        });
    }

    const handleScan = (result) => {
        // console.log('Scan result:', result);
        const rawResult = result[0]?.rawValue;
        if (rawResult) {
            findGuest(rawResult)
        }
    }
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center', 
        }}>
            
            <p className='p-4 text-center font-bold text-2xl'>Silahkan Scan QR Code Tamu</p>
            <Scanner
                onScan={(result) => handleScan(result)}
                facingMode="user" // Show the front camera
                resolution={1280} // Set the resolution to 1280x720
                style={{ width: '100%', height: '100%',  }} // Set the camera view to full screen
            />
        </div>
    )
}

export default ScanQR