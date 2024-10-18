import ReactPrint from 'react-to-print';
import { useRef, useState, useEffect } from 'react';
import Barcode from 'react-barcode';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Close } from '@mui/icons-material';

function PdfTemplate(props) {
    const ref = useRef();
    const [openAirPopup, setAirPopup] = useState(false);
    const [Item, setItem] = useState('');
    const [Amount, setAmount] = useState(0);
    const [Total, setTotal] = useState(0);
    const [List, setList] = useState([]);

    const addData = () => {
        if (Item && Amount) {
            // Create a new item and update the list
            setList(prevList => [...prevList, { product: Item, amount: Amount }]);
            setItem('');
            setAmount(0);
            setAirPopup(false);
        }
    };

    useEffect(() => {
        // Calculate total whenever the list changes
        const sum = List.reduce((acc, item) => acc + parseInt(item.amount || 0, 10), 0);
        setTotal(sum);
        console.log(`Sum is = ${sum}`);
    }, [List]);

    return (
        <>
            <div className="container" ref={ref}>
                <div className="container">
                    <div className="row">
                        <div>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-4 brcode">
                                        <Barcode value={`4n%${props.InvoiceNumber}+ut%`} width={1} height={50} displayValue={false} />
                                    </div>
                                    <div className="col-md-8 text-right bbc">
                                        <h4 style={{ color: '#325aa8' }}><strong>Company</strong></h4>
                                        <p>(+91) 1234567890</p>
                                        <p>sample@gmail.com</p>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <h2 style={{ color: '#325aa8' }}>INVOICE</h2>
                                        <h5> Id: {props.InvoiceNumber}</h5>
                                    </div>
                                </div>
                                <br />
                                <div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th><h5>Products</h5></th>
                                                <th><h5>Amount</h5></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {List.length ? List.map((items, index) => (
                                                <tr key={index}>
                                                    <td className="col-md-9">{items.product}</td>
                                                    <td className="col-md-3"><i className="fas fa-rupee-sign" aria-hidden="true"></i> ₹ {items.amount}</td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="2" className="text-center">No products added</td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td className="text-right">
                                                    <p><strong>Total Amount: </strong></p>
                                                    <p><strong>Payable Amount: </strong></p>
                                                </td>
                                                <td>
                                                    <p><strong><i className="fas fa-rupee-sign" aria-hidden="true"></i> ₹ {Total}</strong></p>
                                                    <p><strong><i className="fas fa-rupee-sign" aria-hidden="true"></i> ₹ {Total}</strong></p>
                                                </td>
                                            </tr>
                                            <tr style={{ color: '#F81D2D' }}>
                                                <td className="text-right"><h4><strong>Total:</strong></h4></td>
                                                <td className="text-left"><h4><strong><i className="fas fa-rupee-sign" aria-hidden="true"></i> ₹ {Total}</strong></h4></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <div className="col-md-12">
                                        <p><b>Date :</b> {props.date} </p>
                                        <br />
                                        <p><b>Name</b></p>
                                        <p><b>Contact: (+91) 1234567890</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ReactPrint trigger={() => <button>Print</button>} content={() => ref.current} documentTitle={`INVOICE ${props.InvoiceNumber}`} />

            <button onClick={() => setAirPopup(true)}>Add Product</button>

            {/* POPUP OPEN */}
            <Dialog open={openAirPopup}>
                <DialogTitle>
                    <div className="title">
                        <div className="hed">New product</div>
                        <div className="icon-cross" onClick={() => setAirPopup(false)}><Close /></div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="container">
                        <div className="forms">
                            <input type="text" value={Item} onChange={(e) => setItem(e.target.value)} placeholder='Product Name' />
                            <input type="number" value={Amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount ₹' />
                        </div>
                        <div className="buttons">
                            <button onClick={addData}>Add</button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            {/* POPUP CLOSED */}
        </>
    );
}

export default PdfTemplate;
