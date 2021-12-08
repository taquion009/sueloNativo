import React, { useState } from 'react'
import { Grid } from '@mui/material';
import imageUrlBuilder from '@sanity/image-url'
import { sanity } from '../../lib/client'
import styled from '@emotion/styled';
import Image from 'next/image'
 
function urlFor (source) {
    return imageUrlBuilder(sanity).image(source)
}

const GridStyled = styled(Grid)`
& .image-product {
  background: #fff;
  position: relative;
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

& .container-image-secondary > span {
  width: 80px!important;
  height: auto!important;
  min-width: auto!important;
  max-width: auto!important;
  min-height: auto!important;
  max-height: auto!important;
  position: relative!important;
  opacity: 0.7!important;
  cursor: pointer!important;
  margin-right: 5px!important;
}

& .container-image-secondary > span:hover {
  opacity: 1!important;
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

const Oferta = styled.div`
position: absolute;
top: calc(100% - 32px - 1em);
width: 60px;
left: calc(100% - 60px - 1em);
background-color: #fff;
padding: 0.5em;
border-radius: 0.5em;
font-size: 0.8em;
font-weight: bold;
color: #000;
text-transform: uppercase;
z-index: 1;
text-align: center;
`

const ProductImages = (props) => {
  const [img, setImg] = useState(0)
  const zoom = (e) => {
    let zoomer = e.currentTarget;

    let x= (((e.pageX - zoomer.offsetLeft)/zoomer.offsetWidth)*100)
    let y = (((e.pageY - zoomer.offsetTop)/zoomer.offsetHeight)*100)
    zoomer.style.backgroundPosition = x + '% ' + y + '%';
    zoomer.style.backgroundSize = '150%';
  }

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
                <Image
                  src={urlFor(props.images[img]).width(600).height(600).url()}
                  alt={props.images[img].alt}
                  width={600}
                  height={600}
                />
                {props.oferta && <Oferta>Oferta</Oferta>}
              </div>
            </figure>
            <div className="container-image-secondary">
              {props.images.map((image, index)=>
                <Image 
                  className="image-product-secondary" 
                  onClick={()=>setImg(index)} 
                  src={`${urlFor(image).width(200).height(200).url()}`}
                  key={image._key}
                  width={200}
                  height={200}
                  alt={image.alt}
                />
              )}
            </div>
          </GridStyled>
  );
}

export default ProductImages;
