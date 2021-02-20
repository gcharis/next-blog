import { Container } from '@material-ui/core';

const ContentContainer: React.FC = ({ children }) => {
  return <Container style={{ marginTop: '100px' }}>{children}</Container>;
};

export default ContentContainer;
