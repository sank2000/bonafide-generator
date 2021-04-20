import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export default function Welcome() {
  return (
    <Container>
      <Typography variant="h3">Welcome to bonafide generator</Typography>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
