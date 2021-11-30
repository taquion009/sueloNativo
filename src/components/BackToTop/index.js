import React from 'react';
import { useScrollTrigger, Box, Zoom, Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );
    if (anchor) {
      anchor.scrollIntoView({
        top:0,
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, left: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}


const BackToTop = (props) => {
  return (
     <ScrollTop {...props}>
        <Fab
          sx={{ 
            background: "#66666661",
            borderRadius: "5px",
            border: "2px solid #6a6a6a4a",
            opacity: "0.7",
            ":hover":{
                opacity: "1",
                background:"green",
                borderXolor:"green",
                color:"#fff",
              }
          }}
          size="small" 
          aria-label="scroll back to top" 
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
  );
};

export default BackToTop;
