import React from 'react'
import { CircularProgress, Backdrop } from '@mui/material';

const Loader = () => {
    return (
    <Backdrop open={true} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
    )
}

export default Loader