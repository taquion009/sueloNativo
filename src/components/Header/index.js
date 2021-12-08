import {
    AppBar,
    Toolbar,
    Button,
    Badge,
    IconButton,
    Modal,
    Link as Link_UI,
    MenuItem,
    useScrollTrigger,
    Slide
  } from "@mui/material";
  import React, { useState, useEffect, useContext } from "react";
  import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
  import MenuIcon from '@mui/icons-material/Menu';
  import CloseIcon from '@mui/icons-material/Close';
  import Link from 'next/link';
  import Image from 'next/image'
  import { store } from '../../context/store'
  import logo from '../../../public/logo.svg'
  import styled from '@emotion/styled';
  
  const headersData = [
    {
      label: "INICIO",
      href: "/",
    },
    {
      label: " TIENDA",
      href: "/tienda",
    },
    {
      label: "CONTACTO",
      href: "/contacto",
    }
  ];
  
  export default function Header(props) {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ mobileView, setMobileView ] = useState(false);
    const { state } = useContext(store)
    const { scroll } = props

    const ModalMenuStyle = styled.div`
      background: #fff;
      margin: 1.5em;
      height: calc(100% - 3em);
      border-radius: 10px;
      padding-top: 2em;
      position: relative;
      overflow: hidden;
      & > div {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        align-content: stretch;
        justify-content: space-around;
        align-items: stretch;
        height: 100%;
      }
      & a{
        width: 100%;
        height: 100%;
      }
      & a li{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2em;
        font-weight: 800;
        letter-spacing: 3px;
        font-family: Rockwell Condensed;
      }
      & > svg {
        position: absolute;
        top: 0.75em;
        left: calc(100% - 1.75em);
        cursor: pointer;
        transform: scale(1.25);
      }
      & .card-icon-mobile {
        transform: scale(1.5);
      }
    `;
    
    const FigureStyled = styled.figure`
      padding-left: 6px;
      filter: ${scroll?"invert(1)":"none"};
      `

    useEffect(() => {
      const setResponsiveness = () => {
        return window.innerWidth < 900
          ? setMobileView(true)
          : setMobileView(false);
      };
  
      setResponsiveness();
  
      window.addEventListener("resize", () => setResponsiveness());
  
      return () => {
        window.removeEventListener("resize", () => setResponsiveness());
      };
    }, []);

    const getMenuButtons = () => {
        return (
          <>
          {headersData.map(({ label, href }) => 
            <Link href={href} key={label+href} passHref>
              <Button 
                sx={{
                  fontFamily: "Open Sans, sans-serif",
                  fontWeight: "700",
                  size: "18px",
                  marginLeft: "38px",
                }}
                {...{
                  key: label,
                  color: "inherit",
                  to: href,
                }}
              >
                {label}
              </Button>
            </Link>
          )}
          <Link href="/cart" passHref>
            <Button 
              sx={{
                fontFamily: "Open Sans, sans-serif",
                fontWeight: "700",
                size: "18px",
                marginLeft: "38px",
              }}
              size="large"
              aria-label={`show ${state.cart.length} new notifications`}
              color="inherit">
              <Badge badgeContent={state.cart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </Button >
            </Link>
        </>
          );
      };
  
    const displayDesktop = () => {
      return (
        <Toolbar
          sx={{
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            marginBottom:".25em",
            marginTop:".25em",
            '@media (minWidth: 1200px)': {
              width: "100%",
              maxWidth:"1200px",
              marginRight:"auto",
              marginLeft:"auto",
            }       
          }}
        >
          {femmecubatorLogo}
          <div>{getMenuButtons()}</div>
        </Toolbar>
      );
    };
  
    const getModalChoices = () => {
        return (
          <>
            {
            headersData.map(({ label, href }) => 
            <Link_UI
                {...{
                  color: "inherit",
                  style: { textDecoration: "none" },
                  key: label,
                }}
                key={label+href}
                
              >
                <Link href={href} passHref>
                  <MenuItem>{label}</MenuItem>
                </Link> 
            </Link_UI>
          )
          }
            <Link_UI
              size="large"
              aria-label={`show ${state.cart.length} new notifications`}
              key="Cart"
              color="inherit"
              style= { {textDecoration: "none"} }
            >
              <Link href="/cart" passHref>
                <MenuItem>
                  <Badge badgeContent={state.cart.length} color="error" className="card-icon-mobile">
                    <ShoppingCartIcon />
                  </Badge>
                </MenuItem>
              </Link>
            </Link_UI>
          </>
          );
      };

    const displayMobile = () => {
        const handleModalOpen = () => setModalOpen(true);
        const handleModalClose = () => setModalOpen(false);
    return (
      <Toolbar
        sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom:".25em",
            marginTop:".25em",
            '@media (minWidth: 1200px)': {
            width: "100%",
            maxWidth:"1200px",
            marginRight:"auto",
            marginLeft:"auto",
            }       
        }}
      >
        <Modal
          {...{
            anchor: "left",
            open: modalOpen,
            onClose: handleModalClose,
          }}
          sx={{
            zIndex: "999999",
          }}
        >
          <ModalMenuStyle>
            <div>
              {getModalChoices()}
            </div>
            <CloseIcon onClick={() => setModalOpen(false)} />
          </ModalMenuStyle>
        </Modal>
  
        <div>{femmecubatorLogo}</div>
          <IconButton
              edge = "end"
              color = "inherit"
              aria-label = "menu"
              aria-haspopup = "true"
              onClick = {handleModalOpen}
              sx={{ mr: 1.5 }}
          >
            {!modalOpen?<MenuIcon />:<CloseIcon />}
        </IconButton>
      </Toolbar>
      );
    };
  
    const femmecubatorLogo = (
      <Link href="/">
        <a
            style={{
              display:"flex",
              cursor:"pointer",
              height: "70px",
              padding: "3px 0",
            }}
        >
        <FigureStyled>
          <Image
            alt="Femmecubator"
            height={64}
            width={64}
            loading="eager"
            src={logo}
           />
        </FigureStyled>
        </a>
      </Link>
    );
  
    function HideOnScroll(props) {
      const { children, window } = props;
      const trigger = useScrollTrigger({
        target: window ? window() : undefined,
      });
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
    }
  
    return (
      <>
          {scroll?
            (<HideOnScroll {...props}>
            <AppBar
              sx={{
                backgroundColor:"rgba(10,10,10,0.23)",
                '@media (max-width: 900px)': {
                  paddingLeft: "0",
                }
                }}>
              {mobileView ? displayMobile() : displayDesktop()}
            </AppBar>
          </HideOnScroll>):(
          <AppBar
            sx={{
              position: "relative",
              backgroundColor:"#ffffff",
              boxShadow:"none",
              color:"#000",
              paddingRight: "0!important",
              '@media (max-width: 900px)': {
                paddingLeft: "0",
              }
              }}
          >
            {mobileView ? displayMobile() : displayDesktop()}
          </AppBar>)
        }
      </>
      );
  }