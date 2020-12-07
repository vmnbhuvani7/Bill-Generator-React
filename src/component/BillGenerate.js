import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import strings from './lan'

function BillGenerate({ props }) {
    const [show, setShow] = useState(false);
    const [minus, setminus] = useState(0)
    const [minusStatus, setminusStatus] = useState(0)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [error, seterror] = useState()

    const client = props[0]

    let totalAmount = 0;

    client && client.products.map((item) => {
        totalAmount += parseInt(item.itemQty) * parseInt(item.itemCost)
    })

    const minusHandler = (e) => {
        setminus(parseInt(e.target.value))
        seterror('')
    }

    const minusShower = () => {

        if (minus < 0) {
            seterror(`${strings.minusError}`)
        }
        else if (minus > totalAmount) {
            seterror(`${strings.minusValidError}`)
        }
        else {
            setminusStatus(1)
            setShow(false)
        }
    }
    return (

        <div className="mt-5">
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <div>
                        <b>{strings.Accrued}: </b><input type="number" name="minus" onChange={(e) => { minusHandler(e) }} />
                        {error ? <p className="errorColor">{error}</p> : ''}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>{strings.Close}</Button>
                    <Button variant="primary" onClick={() => minusShower()}>{strings.Save}</Button>
                </Modal.Footer>
            </Modal>
            {
                <div align="center" >
                    <Card className="card">
                        <div className="cardhead">
                            <h1>{strings.BillDemo}</h1>
                            <div className="address">
                                <h6>{strings.DisplayAddress}</h6>
                            </div>
                        </div>
                        <Card.Body>
                            <div className="row">
                                <div align="left" className="col-4">
                                    <h6><b>{strings.BuildTo}</b></h6>
                                    <h6>{client.fname}{client.lname}</h6>
                                    <h6>{client.address}</h6>
                                    <h6>{client.city}</h6>
                                </div>
                                <div className="col-4" align="left">
                                    <h6><b>{strings.BillNo}</b>{client.billNo}</h6>
                                    <h6><b>{strings.Date}</b>{client.date}</h6>
                                    <h6><b>{strings.gstno}</b>{client.gst}</h6>
                                </div>
                                <div align="right" className="col-4">
                                    <h6>{strings.InvoiceTotal}</h6>
                                    <h1 style={{ color: '#0d83dd' }}> &#x20B9;{minusStatus === 1 ? totalAmount - minus : totalAmount}</h1>
                                </div>
                            </div>
                            <hr color='#0d83dd' />
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>{strings.Name}</th>
                                        <th>{strings.Price}</th>
                                        <th>{strings.Qty}</th>
                                        <th>{strings.Total}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        client && client.products.map((item) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{item.itemid}</td>
                                                        <td>{item.itemName}</td>
                                                        <td>&#x20B9;{item.itemCost}</td>
                                                        <td>{item.itemQty}</td>
                                                        <td>&#x20B9;{parseInt(item.itemQty) * parseInt(item.itemCost)}</td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                            {client.products.length > 0 ?
                                <button className="btn btn-primary minus" onClick={handleShow}><b>-</b></button>
                                : null}
                            <hr color='#0d83dd' />
                            <div className="row">
                                <div className="total col-6" align="left">
                                    <h6><b>{strings.SubTotal} </b>&#x20B9;{totalAmount}</h6>
                                    <h6><b>{strings.Tax} </b>&#x20B9;0</h6>
                                    {
                                        minusStatus === 1 ? 
                                        <><h6><b style={{ color: '#0d83dd' }}>{strings.Accrued} </b>-&#x20B9;{minus}</h6><br /></> : null
                                    }
                                    <h6><b>{strings.FinalTotal} </b>&#x20B9;{minusStatus === 1 ? totalAmount - minus : totalAmount}</h6>
                                </div>
                            </div>
                            <div align="left">
                                <button className="btn btn-primary" onClick={() => { window.print() }}>Print</button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            }

        </div>
    )
}

export default BillGenerate
