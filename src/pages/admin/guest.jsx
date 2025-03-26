import { Button, Table } from 'antd'
import React, { useState, useEffect } from 'react'
import { collection, addDoc, getDocs } from 'firebase/firestore';
// import { readExcel } from 'read-excel-file';
import _ from 'lodash'
const Guest = ({ db }) => {
    const [listData, setListData] = useState([
    ]);

    const [loading, setLoading] = useState(false);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Check In',
            dataIndex: 'check_in',
            key: 'check_in',
        },
    ];

    const fetchGuest = async () => {
        setLoading(true)
        const colRef = collection(db, 'guest');
        getDocs(colRef).
            then(querySnapshot => {
                // setWishes(querySnapshot)
                let data = []
                querySnapshot.forEach(doc => {
                    data.push(doc.data())
                });
                const sortedData = _.orderBy(data, 'check_in', 'desc');
                console.log('data', sortedData);
                setListData(data)
            }).catch(error => {
                console.error('Error retrieving documents: ', error);
            }).finally(() => setLoading(false))
    }


    useEffect(() => {
        fetchGuest()
    }, [])

    return (
        <>
            <Table columns={columns} dataSource={listData} loading={loading} />
            <div height={100}></div>
            {/* <Button type="primary" style={{ width: '100%', fontSize: 20, padding: 20 }}>
                Save
            </Button> */}
        </>
    );
}

export default Guest
