import React from 'react'
import styled from "styled-components";

const MainTitle = styled.div`
    font-family:"Calibri", sans-serif;
    font-size: 30px;
`;

const SubTitle = styled.div`
    font-family:"Calibri", sans-serif;
    font-size: 20px;
`;

const TitleContainer = styled.div`
    padding-top: 2em;
    padding-bottom: 3em;
`;

const AccountTableTitle = () => {
  return (
    <TitleContainer>
        <MainTitle>Account management</MainTitle>
        <SubTitle>Management-Tool</SubTitle>
    </TitleContainer>
  )
}

export default AccountTableTitle