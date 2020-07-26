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

export const BaseMenuContainer = styled.div`
    //width: ${rem("445px")};
    width: 100%;
    height: ${rem("48px")};
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    margin-bottom: ${rem("24px")};
`;

export const BaseChartWrapper = styled.div`
background-color: white;
  padding: ${rem("20px")};;
  border-radius: 4px;
  box-shadow: 0px 8px 16px rgba(0,0,0,0.1);
`