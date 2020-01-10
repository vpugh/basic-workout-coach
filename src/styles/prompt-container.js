import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
`;

export const PromptContainer = styled.div`
  padding: 20px;
  /* background: #614841; */
  line-height: 1.5;
  background: #ed8c6f;
  border-radius: 3px;
  margin: 0 auto;

  p:first-child {
    margin-top: 0;
  }
`;

export const PromptText = styled.div`
  background: #7aa154;
  padding: 40px 50px;
  display: inline-block;
  font-size: 1.6rem;
  margin-bottom: 2rem;

  p {
    margin-bottom: 0;
    margin-top: 0.5rem;
  }
`;

export const PromptDate = styled.div`
  font-size: 1rem;
`;
