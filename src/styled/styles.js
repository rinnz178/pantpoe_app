/* @format */

import React from "react";
import styled from "styled-components";

export const CommentContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 3px;
  marginbottom: 1.3rem;
  .commentTime {
    font-size: 0.825rem;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: start;
  gap: 10px;
  flex-grow: 1;
`;

export const CommentDetail = styled.div`
  text-align: start;
  width: 100%;
  margin-bottom: 5px;
  margin-top: 5px;
  width: -webkit-fill-available;

  h5 {
    margin-bottom: 3px;
    text-align: left;
    font-size: 0.925rem;
  }
  p {
    font-size: 0.925rem;
    margin-top: 3px;
    margin-bottom: 5px;
  }
`;
export const MainReply = styled.div`
  margin-left: 3.75rem;
  display: flex;
  justify-content: space-between;
  width: -webkit-fill-available;
  .commentTime {
    font-size: 0.825rem;
  }
`;

export const ReplyBoxDiv = styled.div`
  margin-left: 3.75rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  gap: 10px;

  width: -webkit-fill-available;
  .commentTime {
    font-size: 0.825rem;
  }
`;

export const ReplyInfo = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  .commentTime {
    font-size: 0.825rem;
  }
`;


export const AllDetail = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  .commentTime {
    font-size: 0.825rem;
  }
`;

export const ReplyDetail = styled.div`
  text-align: start;
  width: 100%;
  margin-bottom: 5px;
  h4 {
    margin-bottom: 3px;
    text-align: left;
    font-size: 0.925rem;
  }
  p {
    font-size: 0.925rem;
    margin-top: 3px;
    margin-bottom: 2px;
  }
`;

export const Counting = styled.span`
  display: flex;
  vertical-align: flex-end;
  font-size: 1rem;
  color: #000;
`;

export const Wrapper = styled.div`
  minheight: 100vh;
  diplay: grid;
  place-items: center;
`;

export const CusFormInput = styled.div`
  text-align: start;
  padding: 10px 0px;
  width:100%;
  & label: {
    color: #333333;
    padding: 18px 0px;
    margin-bottom: 8px;
  }
  ,
  & .inputfield: {
    margin: 0.5rem 0px;
    background: rgb(245, 244, 242);
  },
  
`;
export const CusOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;