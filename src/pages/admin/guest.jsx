import { Button, Card, Col, Form, Input, Modal, Row, Table } from 'antd';
import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
// import { readExcel } from 'read-excel-file';
import html2canvas from 'html2canvas';
import _ from 'lodash';
import moment from 'moment';
import * as xlsx from "xlsx";
import QRCode from "react-qr-code";
const Guest = ({ db }) => {
    const [listData, setListData] = useState([
    ]);

    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [showModal, setShowModal] = useState(false);
    const [dataGuest, setDataGuest] = useState(null);
    const [summaryGuest, setSummaryGuest] = useState({
        totalGuest: 0,
        totalAttending: 0,
        totalNotAttending: 0
    });

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            width: 100
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 500,
            filterSearch: true,
            sorter: {
                compare: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
                multiple: 1,
            },
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
                <Input
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => confirm()}
                    style={{ width: 200 }}
                />
            ),
            filterIcon: (filtered) => (
                <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
            ),
            onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),

        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            sorter: {
                compare: (a, b) => a.address.localeCompare(b.address),
                multiple: 2,
            },
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
                <Input
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => confirm()}
                    style={{ width: 200 }}
                />
            ),
            filterIcon: (filtered) => (
                <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
            ),
            onFilter: (value, record) => record.address.toLowerCase().includes(value.toLowerCase()),

        },
        {
            title: 'Attend At',
            dataIndex: 'date_in',
            sorter: {
                compare: (a, b) => a.date_in.localeCompare(b.date_in),
                multiple: 3,
            },
            key: 'date_in',
        },
        // {
        //     title: 'Phone',
        //     dataIndex: 'phone',
        //     key: 'phone',
        // },
        {
            title: 'Detail',
            render: (text, record) => {
                return (
                    <div>
                        {/* <QRCode value={JSON.stringify(record.name)} /> */}
                        <Button type="primary" className='mr-2' onClick={() => {
                            setDataGuest(record)
                            setShowModal(true)
                        }}
                        >Detail</Button>
                        <Button type="primary" danger onClick={() => {
                            Modal.confirm({
                                title: 'Are you sure you want to delete this guest?',
                                okText: 'Yes',
                                okType: 'danger',
                                cancelText: 'No',
                                onOk() {
                                    deleteGuest(record.id)
                                },
                            })
                        }}
                        >Delete</Button>
                    </div >
                )
            }
        }
    ];

    const deleteGuest = async (id) => {
        const colRef = collection(db, 'guest');
        const docRef = doc(colRef, id);
        await deleteDoc(docRef)
            .then(() => {
                fetchGuest()
                Modal.success({ content: 'Guest deleted successfully!' })
            }).catch(error => {
                console.error('Error updating document: ', error);
                Modal.error({ content: 'Error deleting guest' })
            })
    }
    const downloadElement = (dataGuest) => {
        const element = document.getElementById('element-to-download');
        html2canvas(element).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL();
            link.download = `invitation ${dataGuest?.name}.png`;
            link.click();
        });
    };

    const shareLink = async (dataGuest) => {
        try {
            const url = `https://weeding-anggrie-fahmi.vercel.app?name=${encodeURIComponent(dataGuest?.name)}`
            console.log(url);
            const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(url)}`
            window.open(whatsappUrl, '_blank')
        } catch (error) {
            Modal.error({ content: 'Error sharing link' })
        }
    }

    const fetchGuest = async () => {
        setLoading(true)
        const colRef = collection(db, 'guest');
        getDocs(colRef).
            then(querySnapshot => {
                // setWishes(querySnapshot)
                let data = []
                querySnapshot.forEach(doc => {
                    data.push({ ...doc.data(), id: doc.id });
                });
                const sortedData = _.orderBy(data, ['name', 'address'], 'asc');

                const newData = sortedData.map((item, index) => ({
                    ...item, key: item.id,
                    no: index + 1,
                    date_in: item.check_in ? moment(item.check_in.toDate()).format('YYYY-MM-DD HH:mm:ss') : ''
                }));
                setSummaryGuest({
                    totalGuest: data.length,
                    totalAttending: data.filter(item => item.check_in)?.length,
                    totalNotAttending: data.filter(item => !item.check_in)?.length
                })
                setListData(newData)
            }).catch(error => {
                console.error('Error retrieving documents: ', error);
            }).finally(() => setLoading(false))
    }

    const onClose = () => {
        setShowModal(false)
        setDataGuest(null)
        form.resetFields()
    }

    const onFinish = (values) => {
        if (dataGuest) {
            const colRef = collection(db, 'guest');
            const docRef = doc(colRef, values.id);
            const updatedAt = serverTimestamp();
            updateDoc(docRef, { ...values, updatedAt }).then(() => {
                console.log('Document updated successfully!');
                Modal.success({ content: 'Guest updated successfully!' })
                onClose()
                fetchGuest()
            }).catch(error => {
                console.error('Error updating document: ', error);
                Modal.error({ content: 'Error updating guest' })
            });
        } else {
            const colRef = collection(db, 'guest');
            const createdAt = serverTimestamp();
            addDoc(colRef, { ...values, createdAt }).then(docRef => {
                console.log('Document added with ID: ', docRef.id);
                Modal.success({ content: 'Guest added successfully!' })
                onClose()
                fetchGuest()
            }).catch(error => {
                console.error('Error adding document: ', error);
                Modal.error({ content: 'Error adding guest' })
            });

        }
    }
    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);

                // Add data to Firestore
                try {
                    json.forEach(async (row) => {
                        const colRef = collection(db, 'guest');
                        const guestQuery = query(colRef, where('name', '==', row?.name));
                        await getDocs(guestQuery).then(async (querySnapshot) => {
                            if (querySnapshot.docs.length > 0) {
                                // console.log(`Guest with name ${row.name} already exists, skipping...`);
                            } else {
                                const createdAt = serverTimestamp();
                                await addDoc(colRef, { ...row, createdAt }).then(docRef => {
                                    console.log('Document added with ID: ', docRef.id);
                                }).catch(error => {
                                    console.error('Error adding document: ', error);
                                    Modal.error({ content: 'Error adding guest' })
                                });
                            }
                        });
                    });

                    Modal.success({ content: 'Guest added successfully!' })
                    fetchGuest()
                } catch (error) {
                    Modal.error({ content: 'Error import guest' })
                }
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        Modal.error({
            title: 'Error',
            content: errorInfo.errorFields[0].errors[0],
        });
    };

    useEffect(() => {
        fetchGuest()
    }, [])

    useEffect(() => {
        form.setFieldsValue({
            id: dataGuest?.id,
            name: dataGuest?.name,
            phone: dataGuest?.phone,
            address: dataGuest?.address,
        })
    }, [dataGuest])

    return (
        <>
            <div style={{ display: 'flex' }}>
                <Card
                    title="Total Guest"
                    style={{ width: 300 }}
                    className='mr-2 bg-sky-100'

                >
                    <p style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>{summaryGuest?.totalGuest}</p>
                </Card>

                <Card
                    title="Attending"
                    style={{ width: 300 }}
                    className='mr-2 bg-green-100'
                >
                    <p style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>{summaryGuest?.totalAttending}</p>
                </Card>

                <Card
                    title="Not Attending"
                    style={{ width: 300 }}
                    className='mr-2 bg-red-100'
                >
                    <p style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>{summaryGuest?.totalNotAttending}</p>
                </Card>

            </div>
            <div style={{ height: 20 }}></div>
            <Row justify='space-between'>
                <Button className='' type="primary" onClick={() => setShowModal(true)}>New Guest</Button>
                <Row>
                    <form className='mt-1'>
                        <label htmlFor="upload  mr-2">Upload File </label>
                        <input
                            type="file"
                            name="upload"
                            id="upload"
                            onChange={readUploadFile}
                        />
                    </form>
                    <a href='/format-guest.xlsx' target='_blank' download={'format-guest.xlsx'} className='mt-1'>Download Format Upload</a>
                </Row>
            </Row>
            <Table
                columns={columns}
                dataSource={listData}
                loading={loading}
                pagination={false}
                scroll={{ y: 470 }}
            />
            <div height={100}></div>
            <Modal
                title="Guest Info"
                open={showModal}
                onCancel={() => { }}
                footer={null}
                width={1000}
                style={{ top: 20 }}
            >
                <Form
                    form={form}
                    layout='vertical'
                    onFinishFailed={onFinishFailed}
                    onFinish={(value) =>
                        Modal.confirm({
                            title: 'Are you sure?',
                            icon: <></>,
                            // content: 'Some descriptions',
                            okText: 'Yes',
                            okType: 'primary',
                            cancelText: 'No',
                            onOk() {
                                onFinish(value)
                            }
                        })
                    }

                >
                    {
                        dataGuest && dataGuest.name ?
                            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "100%" }} id="element-to-download">
                                <div style={{ textAlign: "center" }}>
                                    <div style={{ height: 20 }}>
                                        Card Guest
                                    </div>
                                    <p>Scan qr ini untuk ditukarkan dengan souvenir</p>
                                    <div style={{ height: 10 }}></div>
                                    <QRCode
                                        value={dataGuest?.name}
                                        viewBox={`0 0 256 256`}
                                        style={{ maxWidth: "100%", width: "100%" }}
                                    />
                                    <h1 className='text-center'>{dataGuest?.name}</h1>
                                </div>
                                <div style={{ height: 20 }}></div>
                                <Form.Item name={'id'} label="id" hidden>
                                    <Input placeholder="Enter guest name" />
                                </Form.Item>
                            </div>
                            : null
                    }
                    <Button type="primary" hidden={!dataGuest} style={{ width: '100%', fontSize: 20, padding: 20 }} onClick={() => downloadElement(dataGuest)}>Download Kartu Penukaran Suvenir</Button>
                    <div style={{ height: 20 }}></div>

                    <Button type="primary" className='bg-green-800' hidden={!dataGuest} style={{ width: '100%', fontSize: 20, padding: 20 }} onClick={() => shareLink(dataGuest)}>Bagikan Undangan</Button>
                    <div style={{ height: 20 }}></div>
                    <Form.Item name={'name'} label="Name" required >
                        <Input placeholder="Enter guest name" />
                    </Form.Item>
                    <Form.Item name={'phone'} label="Phone (Optional)">
                        <Input placeholder="Enter guest phone number" minLength={10} />
                    </Form.Item>
                    <Form.Item name={'address'} label="Address" required>
                        <Input placeholder="Enter guest address" />
                    </Form.Item>

                    <Form.Item>
                        <Row>
                            <Col span={11}>
                                <Button type="primary" style={{ width: '100%', fontSize: 20, padding: 20 }} htmlType="submit">
                                    Save
                                </Button>
                            </Col>
                            <Col offset={2} span={11}>
                                <Button type="primary" style={{ width: '100%', fontSize: 20, padding: 20 }} danger onClick={() => onClose()}>
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default Guest
