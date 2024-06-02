"use client";

import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Loading = ({ show }) => {
  if (!show) {
    return null;
  }

  return (
    <Backdrop>
      <ReactLoading type="bubbles" color="#ffffff" />
    </Backdrop>
  );
};

export default Loading;