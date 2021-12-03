import React from 'react'
import styled from '@emotion/styled';

const LoaderStyled = styled.div`
    z-index: 2147483647;
    display: block;
    background: rgba(0, 0, 0, 0.7);
    border: 0px;
    overflow: hidden;
    visibility: visible;
    margin: 0px;
    padding: 0px;
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    opacity: 1;
    height: 100%;
    transition: opacity 220ms ease-in 0s;

  & .loader_icon {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -25px;
    margin-left: -25px;
  }
  
  & .loader_icon .circular {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 5px solid transparent;
    border-top: 5px solid #f3f3f3;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Loader = () => {
    return (
        <LoaderStyled>
            <div className="loader_icon">
                <div className="circular"></div>
            </div>
        </LoaderStyled>
    )
}

export default Loader