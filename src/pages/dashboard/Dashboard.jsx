
import React from 'react'
import RequestCallback from '../../components/forms/request-callback/RequestCallback'

const Dashboard = () => {
    return (
        <RequestCallback/>
    )
}

export default Dashboard;


// import { useState } from 'react';
// import { Button } from 'react-bootstrap';
// // import RequestCallback from '../../components/forms/request-callback/RequestCallback';
// // import RequestCallbackModal from '../../components/forms/request-callback-modal/RequestCallbackModal';
// import CustomerEdit from '../../components/forms/customer-home/CustomerEdit';
// import CustomerDetails from '../../components/forms/customer-home/CustomerDetails';

// const Dashboard = () => {

//     const [showCustomerEdit, setShowCustomerEdit] = useState(false)
//     return (
//         <>
//             <Button onClick={() => setShowCustomerEdit(true)}>Show Modal</Button>
//             <CustomerDetails/>
//             <CustomerEdit
//                 showCustomerEdit = { showCustomerEdit }
//                 setShowCustomerEdit = { setShowCustomerEdit }
//             />
//         </>
        
//     )
// }

// export default Dashboard;