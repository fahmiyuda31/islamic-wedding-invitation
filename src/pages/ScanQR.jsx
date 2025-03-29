import { Scanner } from '@yudiel/react-qr-scanner';
import { Button, Modal, Tabs } from 'antd';
import { useState } from 'react';
import { collection, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';

const ScanQR = ({ db }) => {
    const [loading, setLoading] = useState(false);

    const findGuest = (guestName) => {
        const colRef = collection(db, 'guest');
        const guestQuery = query(colRef, where('name', '==', guestName));
        setLoading(true)
        getDocs(guestQuery).then(querySnapshot => {
            if (querySnapshot.docs.length > 0) {
                const guestDoc = querySnapshot.docs[0];
                const check_in = serverTimestamp();
                updateDoc(guestDoc.ref, { check_in }).then(() => {
                    Modal.success({ content: `Selamat datang ${guestName}, terima kasih telah hadir` })
                    document.querySelector('input').value = '';

                }).catch(error => {
                    Modal.error({ content: `Error updating guest ${error}` })
                });
            } else {
                Modal.error({ content: `Guest ${guestName} not found` })
            }
        }).catch(error => {
            Modal.error({ content: `Error finding guest ${error}` })
        }).finally(() => setLoading(false))
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
            // justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            // minHeight: '100vh',
            // backgroundColor: 'red',
        }}>

            <Tabs
                defaultActiveKey='1'
                style={{
                    width: '100%',
                    padding: '2rem'
                }}
                items={[
                    {
                        label: 'Scan QR',
                        key: '1',
                        children:
                            <div>
                                <p className='p-4 text-center font-bold text-2xl'>Scan QR Code Tamu</p>
                                <Scanner
                                    onScan={(result) => handleScan(result)}
                                    facingMode="user" // Show the front camera
                                    resolution={1280} // Set the resolution to 1280x720
                                    continuousScan={true}
                                    style={{ width: '100%', height: '100%', }} // Set the camera view to full screen
                                />
                            </div>
                    },
                    {
                        label: 'Input Nama Tamu',
                        key: '2',
                        children: <div>
                            <p className='p-4 text-center font-bold text-2xl'>Input Nama Tamu</p>
                            <input type="text" placeholder='Nama Tamu' className='p-4 text-center font-bold text-xl w-full border border-gray-300' />

                            <div style={{ height: '2rem' }}></div>
                            <Button
                                type='primary'
                                className='btn w-full'
                                loading={loading}
                                onClick={() => findGuest(document.querySelector('input').value)}>{loading ? 'Loading' : 'Submit'}</Button>
                        </div>
                    },
                ]}
            >
            </Tabs>
        </div>
    )
}


export default ScanQR