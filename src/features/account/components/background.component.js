import styled from "styled-components/native";

const AccountBackgroundWrapper = styled.ImageBackground.attrs({
  source: require("../../../../assets/home_bg.jpg")
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const AccountBackground = ({ children }) => {
  return (
    <AccountBackgroundWrapper>
      <AccountCover />
      {children}
    </AccountBackgroundWrapper>
  );
}