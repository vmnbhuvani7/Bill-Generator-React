import React, { useState } from 'react'

import BillModal from './component/BillModal'
import './App.css'

const App = () => {

  const [status, setstatus] = useState(0)
  const buttonClick = () => setstatus(1)

  return (
    <>
      <div align="center">
        {status === 0 &&
          <button className="btn btn-success mt-5 " onClick={() => { buttonClick() }}>Add Bill </button>
        }
      </div>
      {
        status === 1 && <BillModal />
      }
    </>
  )
}

export default App
