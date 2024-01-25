import React from 'react'
import AccountTable from './AccountTable'
import AccountTableTitle from './AccountTableTitle'
import styled from "styled-components";

const AccountContainer = styled.div`
    width: 90%;
    margin: 0 auto;
`;

const AccountMgmt = () => {
  return (
    <AccountContainer>
        <AccountTableTitle/>
        <AccountTable/>
    </AccountContainer>
  )
}

export default AccountMgmt