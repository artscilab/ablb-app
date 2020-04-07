import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ActionButton } from './common'

const HeaderContainer = styled.div`
  max-width: 100%;
  height: 100px;
  background: ${({theme}) => theme.black};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;

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

const Header = ({loginStatus}) => {
  return (
    <HeaderContainer>
      <div>
        <p>ABLB</p>
      </div>
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
            {loginStatus 
            ? <Link to="/logout">Logout</Link>
            :
              <Link to="/login">
                <ActionButton inverted>
                  Login
                </ActionButton> 
              </Link>
            }
          </li>
          {loginStatus == null &&
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