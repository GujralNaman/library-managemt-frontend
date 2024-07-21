import React from 'react'
import '../assets/style/ErrorPage.css'
import error from '../assets/img/error.jpg'

const ErrorPage = () => {
  return (
    <div className='error-div'>
      <img src={error} alt="login img" />
    </div>
  )
}

export default ErrorPage
