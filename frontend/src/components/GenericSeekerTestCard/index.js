import React from "react";
import { rem } from "polished";
import styled from "styled-components";
import { SmallBlueButton, SmallRedButton } from "../../style/GlobalButtons";

const TestCard = styled.div`
  width: ${rem("290px")};
  height: ${rem("150px")};
  background: #ffffff;
  border: 1px solid #d3d4d8;
  border-radius: 4px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const Text = styled.p`
  width: 100%;
  font-weight: 500;
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 22px;
  color: #121232;
`;

const PointContainer = styled.span`
  min-width: ${rem("84px")};
  max-width: fit-content;
  padding: 5px;
  height: ${rem("30px")};
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.16px;
  color: #43a047;
  border: 1px solid #71b774;
  border-radius: 4px;
  text-transform: uppercase;
`;

const TextContainer = styled.div`
  width: 80%;
  height: ${rem("42px")};
  margin-right: ${rem("17px")};
  text-transform: capitalize;
`;

const BottomContainer = styled.div`
  height: ${rem("40px")};
  width: ${rem("144px")};
  display: flex;
  justify-content: space-between;
`;

const CardBlueButton = styled(SmallBlueButton)`
  width: 60px;
  height: 30px;
  font-size: 12px;
`;

const CardRedButton = styled(SmallRedButton)`
  width: 60px;
  height: 30px;
  font-size: 12px;
`;

const GenericSeekerTestCard = ({
  test: {
    id,
    test_type,
    seeker_name,
    points_cost,
    expiry_date,
    created,
    is_bought,
    is_expired,
    seeker: {
      id: seeker_id,
      name,
      phone,
      is_donor,
      email,
      certificate,
      no_of_requests,
      is_valid,
      website,
      street,
      zip_code,
      country,
      logo,
    },
  },
}) => {
  return (
    <TestCard>
      <TextContainer>
        <Text>{test_type}</Text>
        <PointContainer>{points_cost}</PointContainer>
      </TextContainer>
      <BottomContainer>
        <CardBlueButton>edit</CardBlueButton>
        <CardRedButton>delete</CardRedButton>
      </BottomContainer>
    </TestCard>
  );
};

export default GenericSeekerTestCard;
