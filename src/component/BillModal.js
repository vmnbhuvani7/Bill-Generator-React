import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import BillGenerate from './BillGenerate'
import strings from './lan'
import App from '../App'

const BillModal = () => {

    const [show, setShow] = useState(true);
    const [displayStatus, setDisplayStatus] = useState(0)
    const [productBox, setproductBox] = useState({
        numberofbox: []
    })
    const [lan, setlan] = useState('en')

    let today = new Date()
    let date = today.getDate() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear() + " " + today.getHours() + ':' + today.getMinutes();

    const [personal, setpersonal] = useState({
        billNo: Math.random().toString().substr(9, 4),
        date: date,
        fname: '',
        lname: '',
        address: '',
        city: '',
        phone: '',
        gst: '',
        products: []
    })

    const [error, seterror] = useState({
        fnameError: '',
        lnameError: '',
        addressError: '',
        cityError: '',
        phoneError: '',
        gstError: '',
        itemnameError: '',
        itemcostError: '',
    })

    const [alldata, setalldata] = useState([])

    const handleClose = () => {
        setShow(false)
        setDisplayStatus(2)
    }

    const saveChange = (e) => {
        let item = productBox.numberofbox

        if (personal.fname === "" && personal.lname === "" && personal.address === "" &&
            personal.city === "" && personal.phone === "" && personal.gst === "") {
            seterror({
                fnameError: `${strings.EnterInfo}`,
                lnameError: `${strings.EnterInfo}`,
                addressError: `${strings.EnterInfo}`,
                cityError: `${strings.EnterInfo}`,
                phoneError: `${strings.EnterInfo}`,
                gstError: `${strings.EnterInfo}`,
            })
        }
        else if (personal.fname === "") {
            seterror({ fnameError: `${strings.fnameError}` })
        }
        else if (personal.lname === "") {
            seterror({ lnameError: `${strings.lnameError}` })
        }
        else if (personal.address === "") {
            seterror({ addressError: `${strings.addressError}` })
        }
        else if (personal.city === "") {
            seterror({ cityError: `${strings.cityError}` })
        }
        else if (personal.phone === "") {
            seterror({ phoneError: `${strings.phoneError}` })
        }
        else if (personal.phone.length > 10) {
            seterror({ phoneError: `${strings.phoneValid}` })
        }
        else if (personal.gst === "") {
            seterror({ gstError: `${strings.gstError}` })
        }
        else if (!/^([0-2][0-9]|[3][0-7])[A-Z]{3}[ABCFGHLJPTK][A-Z]\d{4}[A-Z][A-Z0-9][Z][A-Z0-9]$/.test(personal.gst)) {
            seterror({ gstError: `${strings.gstValid}` })
        }
        else {
            const target = item.map((data) => {
                if (data.itemName === "" && data.itemCost === "") {
                    const index = item.findIndex((item) => data.itemid === item.itemid)
                    if (index >= 0) {
                        const dummyForms = item
                        dummyForms[index].nameError = `${strings.ItemNameError}`
                        dummyForms[index].costError = `${strings.ItemCostError}`

                        setpersonal({
                            ...personal,
                            products: dummyForms
                        })
                        return false
                    }
                }
                else if (data.itemName === "") {
                    const index = item.findIndex((item) => data.itemid === item.itemid)
                    if (index >= 0) {
                        const dummyForms = item
                        dummyForms[index].nameError = `${strings.ItemNameError}`

                        setpersonal({
                            ...personal,
                            products: dummyForms
                        })
                        return false
                    }
                }
                else if (data.itemCost === "") {
                    const index = item.findIndex((item) => data.itemid === item.itemid)
                    if (index >= 0) {
                        const dummyForms = item
                        dummyForms[index].costError = `${strings.ItemCostError}`

                        setpersonal({
                            ...personal,
                            products: dummyForms
                        })
                        return false
                    }
                }
                else {
                    return true
                }
            })
            if (target.includes(false)) {
                return
            } else {
                alldata.push(personal)
                setShow(false)
                setDisplayStatus(1)
            }

        }
    }
    const inputHandler = (e) => {
        const { name, value } = e.target
        setpersonal({
            ...personal,
            [name]: value
        })
        seterror({
            fnameError: '',
            lnameError: '',
            addressError: '',
            cityError: '',
            phoneError: '',
            gstError: '',
        })
    }

    const itemhandlelr = (e, id) => {
        const index = productBox.numberofbox.findIndex((item) => {
            return item.itemid == id
        })
        if (index >= 0) {
            const dummyForms = productBox.numberofbox
            dummyForms[index][e.target.name] = e.target.value
            dummyForms.map((item) => {
                item.nameError = ''
                item.costError = ''
            })
            setpersonal({
                ...personal,
                products: dummyForms
            })
            seterror({
                fnameError: '',
                lnameError: '',
                addressError: '',
                cityError: '',
                phoneError: '',
                gstError: '',
            })
        }
    }

    const addMoreProduct = (e) => {
        e.preventDefault()
        setproductBox({
            ...productBox,
            numberofbox: [...productBox.numberofbox, {
                itemid: Math.random().toString(36).substr(2, 9),
                itemName: '',
                itemCost: '',
                itemQty: 1,
                nameError: '',
                costError: '',
            }]
        })

    }
    useEffect(() => {
        setproductBox({
            ...productBox,
            numberofbox: [...productBox.numberofbox, {
                itemid: Math.random().toString(36).substr(2, 9),
                itemName: '',
                itemCost: '',
                itemQty: 1,
                nameError: '',
                costError: '',
            }]
        })
    }, [])

    const increment = (e, id) => {
        e.preventDefault()
        const index = productBox.numberofbox.findIndex((item) => {
            return item.itemid == id
        })
        if (index >= 0) {
            const dummyForms = productBox.numberofbox
            dummyForms[index].itemQty += 1

            setproductBox({
                ...productBox,
                numberofbox: dummyForms
            })
        }
    }
    const decrement = (e, id) => {
        e.preventDefault()
        const index = productBox.numberofbox.findIndex((item) => {
            return item.itemid == id
        })
        if (index >= 0) {
            const dummyForms = productBox.numberofbox
            if (dummyForms[index].itemQty > 1) {
                dummyForms[index].itemQty -= 1
            }

            setproductBox({
                ...productBox,
                numberofbox: dummyForms
            })

        }
    }

    const deleteItem = (e, id) => {
        e.preventDefault()
        const filterItem = productBox.numberofbox.filter((item) => {
            if (item.itemid !== id) {
                return item
            }
        })
        setproductBox({
            ...productBox,
            numberofbox: filterItem
        })
        setpersonal({
            ...personal,
            products: filterItem
        })
    }

    const languageHandler = (e) => {
        setlan(e.target.value)
    }
    strings.setLanguage(lan)

    return (
        <>
            {  displayStatus == 1 && <BillGenerate props={alldata} />}
            { displayStatus == 2 && <App />}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{strings.ADD_DETAILS}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div class="selectLang">
                                <select className="btn btn-info" onChange={e => languageHandler(e)}> Select Language
                                    <option disabled selected className="option">Select Language</option>
                                    <option className="option" value="en">English</option>
                                    <option className="option" value="it">Italian</option>
                                    <option className="option" value="ur">Urdu</option>
                                    <option className="option" value="hin">Hindi</option>
                                    <option className="option" value="guj">Gujarat</option>
                                </select>
                            </div>
                        </div>
                        <legend><u>{strings.CustomerInfo}</u></legend>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div class="row register-form">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder={strings.Fname} name="fname" onChange={(e) => { inputHandler(e) }} />
                                            {error.fnameError !== '' ? <p className="errorColor"> {error.fnameError} </p> : ''}
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder={strings.Lname} name="lname" onChange={(e) => { inputHandler(e) }} />
                                            {error.lnameError !== '' ? <p className="errorColor"> {error.lnameError} </p> : ''}</div>
                                        <div class="form-group">
                                            <textarea class="form-control" placeholder={strings.Address} name="address" onChange={(e) => { inputHandler(e) }}></textarea>
                                            {error.addressError !== '' ? <p className="errorColor"> {error.addressError} </p> : ''}</div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group ">
                                            <input type="text" class="form-control" placeholder={strings.City} name="city" onChange={(e) => { inputHandler(e) }} />
                                            {error.cityError !== '' ? <p className="errorColor"> {error.cityError} </p> : ''} </div>
                                        <div class="form-group">
                                            <input type="number" onInput={(e) => { e.target.value = e.target.value.slice(0, 10); }} minlength="10" maxlength="10" class="form-control" name="phone" placeholder={strings.Phone} onChange={(e) => { inputHandler(e) }} />
                                            {error.phoneError !== '' ? <p className="errorColor"> {error.phoneError} </p> : ''} </div>
                                        <div class="form-group">
                                            <input type="text" name="txtEmpPhone" class="form-control" placeholder={strings.Gst} name="gst" onChange={(e) => { inputHandler(e) }} />
                                            {error.gstError !== '' ? <p className="errorColor"> {error.gstError} </p> : ''} </div>
                                    </div>
                                </div>

                                <hr />
                                <div className="d-flex">
                                    <legend><u>{strings.ProductInfo}</u></legend>
                                </div>
                                {
                                    productBox && productBox.numberofbox.map((item, i) => {
                                        return (
                                            <>
                                                <b>{strings.ItemIndex} {i + 1}: </b>
                                                {item.itemid}
                                                {
                                                    (i + 1 !== productBox.numberofbox.length) === false &&
                                                    <button onClick={(e) => { e.preventDefault(); addMoreProduct(e) }} className="btn btn-info addmore">{strings.Add}</button>
                                                }
                                                <div class="row register-form">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                placeholder={strings.Itemname}
                                                                name="itemName"
                                                                value={item.itemName}
                                                                onChange={(e) => { itemhandlelr(e, item.itemid) }} />
                                                            {item.nameError !== '' ?
                                                                <p className="errorColor"> {item.nameError} </p>
                                                                : ''}
                                                        </div>
                                                        <div class="form-group">
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                placeholder={strings.Itemcost}
                                                                name="itemCost"
                                                                value={item.itemCost}
                                                                onChange={(e) => { itemhandlelr(e, item.itemid) }} />
                                                            {item.costError !== '' ?
                                                                <p className="errorColor"> {item.costError} </p>
                                                                : ''}
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <button
                                                                onClick={(e) => { e.preventDefault(); decrement(e, item.itemid) }}>-</button>
                                                            <input
                                                                type="text"
                                                                name="itemQty"
                                                                style={{ width: '50px' }}
                                                                value={productBox.numberofbox[i].itemQty ? productBox.numberofbox[i].itemQty
                                                                    : 1} />
                                                            <button onClick={(e) => { e.preventDefault(); increment(e, item.itemid) }}>+</button>
                                                        </div>
                                                    </div>
                                                    <div className="deleteName">
                                                        {
                                                            productBox.numberofbox.length > 1 &&
                                                            <button
                                                                className="btn btn-danger"
                                                                onClick={(e) => { deleteItem(e, item.itemid) }}>{strings.Delete}</button>
                                                        }
                                                    </div>
                                                </div>
                                                <hr />
                                            </>
                                        )
                                    })
                                }


                            </div>
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        {strings.Close}
                    </Button>
                    <Button variant="primary" onClick={() => saveChange()}>
                        {strings.Save}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BillModal