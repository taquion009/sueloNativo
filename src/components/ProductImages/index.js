import React, { useState } from 'react'
import { Grid } from '@mui/material';
import imageUrlBuilder from '@sanity/image-url'
import { sanity } from '../../lib/client'
import styled from '@emotion/styled';
 
function urlFor (source) {
    return imageUrlBuilder(sanity).image(source)
}

const ProductImages = (props) => {
  const [img, setImg] = useState(0)
  const zoom = (e) => {
    let zoomer = e.currentTarget;

    let x= (((e.pageX - zoomer.offsetLeft)/zoomer.offsetWidth)*100)
    let y = (((e.pageY - zoomer.offsetTop)/zoomer.offsetHeight)*100)
    zoomer.style.backgroundPosition = x + '% ' + y + '%';
    zoomer.style.backgroundSize = '150%';
  }

  const GridStyled = styled(Grid)`
    & .image-product {
      background: #fff;
    }
    
    & .image-product img {
      width: 100%;
    }
    
    & .container-image-secondary {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      margin-top: 0.5em;
      gap: 0.5em;
    }
    
    & .image-product-secondary {
      width: 80px;
      opacity: 0.7;
      cursor: pointer;
      margin-right: 5px;
    }
    
    & .image-product-secondary:hover {
      opacity: 1;
    }
    
    & figure.zoom {
      transition: opacity 0.5s;
      display: block;
      width: 100%;
      background-position: 50% 50%;
      position: relative;
      overflow: hidden;
      cursor: zoom-in;
      background-repeat: no-repeat;
    }
    
    & figure.zoom .image-product:hover {
      opacity: 0;
      transition: opacity 0.5s;
      display: block;
      width: 100%;
    }
`


  return (
          <GridStyled 
          item
          sx={{
            padding: "1.5em",
            "@media (max-width: 750px)": {
              padding: "0.5em"
            }
          }}
          >
            <figure 
              className="zoom" 
              onMouseMove={zoom} 
              style={{
                backgroundImage: `url(${urlFor(props.images[img]).width(900).height(900).url()})`
                }}
            >
              <div className="image-product">
                <img src={urlFor(props.images[img]).width(600).height(600).url()} />
              </div>
            </figure>
            <div className="container-image-secondary">
            {
            props.images.map((image, index)=>
              <img className="image-product-secondary" onClick={()=>setImg(index)} src={`${urlFor(image).width(200).height(200).url()}`} key={image._key} />
            )
            }
            </div>
          </GridStyled>
  );
}

export default ProductImages;
