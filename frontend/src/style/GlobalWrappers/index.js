import styled from "styled-components";
import rem from "polished/lib/helpers/rem";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - ${rem("136px")});
  width: 100vw;
  background: #fafafc;
`;
