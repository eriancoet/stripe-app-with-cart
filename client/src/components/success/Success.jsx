import React from 'react'
import classes from './success.module.css'

const Success = () => {
  return (
    <div className={classes.successMessage}>
      You have successfully made a payment!
    </div>
  )
}

export default Success