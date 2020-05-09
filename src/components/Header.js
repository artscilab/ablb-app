import React, { useContext } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ActionButton } from './common'
import { SessionContext } from '../utils/session';

const HeaderContainer = styled.div`
  max-width: 100%;
  height: 100px;
  background: ${({theme}) => theme.black};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;

  img {
    max-height: 50px;
  }

  p {
    font-size: 18px;
    font-family: ${({theme}) => theme.brandon};
    color: ${({theme}) => theme.white};
    text-transform: uppercase;
    font-weight: 700;
  }

  ul {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  li {
    list-style-type: none;
    margin-left: 25px;
    > a {
      font-size: 18px;
      font-family: ${({theme}) => theme.brandon};
      text-decoration: none;
      padding: 5px 0;
      color: ${({theme}) => theme.white};
      transition: all .2s ease;
      text-transform: uppercase;
      font-weight: 700;
      border-bottom: 2px solid ${({theme}) => theme.black};
  
      &:hover {
        color: ${({theme}) => theme.green};
        border-bottom: 2px solid ${({theme}) => theme.green};
      }
    }
  }
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    max-height: 50px;
    margin-right: 15px;
  }

  p {
    font-size: 22px;
  }
`

const Header = () => {
  const {user} = useContext(SessionContext);

  return (
    <HeaderContainer>
      <LogoContainer>
        <img alt="ablb logo" src="../ablb_white.png"></img>
        <p>ABLB</p>
      </LogoContainer>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/catalog">Catalog</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            {user !== null 
            ? <Link to="/logout">Logout</Link>
            :
              <Link to="/login">
                <ActionButton inverted>
                  Login
                </ActionButton> 
              </Link>
            }
          </li>
          {user === null &&
            <li>
              <Link to="/signup">
                <ActionButton>
                  Sign up
                </ActionButton> 
              </Link>
          </li>
          }
        </ul>
      </nav>
    </HeaderContainer>
  )
}

export default Header;