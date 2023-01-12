import styled from 'styled-components';
import { Link } from 'react-router-dom';
const DashboardCard = ({ image, text, linkTo }) => {
  return (
    // The linkTo the feature the card represents
    <StyledLink to={linkTo}>
      <Card>
        <Img src={image} />
        <Text>{text}</Text>
      </Card>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const Card = styled.div`
  border: 1px solid var(--primary-color);
  border-radius: 15px;
  width: 200px;
  padding: 10px;
  background: white;
`;

const Img = styled.img``;

const Text = styled.h2`
  border-top: 2px solid var(--primary-color);
  padding-top: 10px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 20px;
`;

export default DashboardCard;
