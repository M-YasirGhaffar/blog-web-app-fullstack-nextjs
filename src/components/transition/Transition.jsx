"use client";

import React from 'react';
import styled, { keyframes } from 'styled-components';

const slide = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

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

const Bar = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 5px;
  background-color: #ffffff;
  animation: ${slide} 2s linear infinite;
`;

const Transition = ({ show }) => {
  if (!show) {
    return null;
  }

  return (
    <Backdrop>
      <Bar />
    </Backdrop>
  );
};

export default Transition;