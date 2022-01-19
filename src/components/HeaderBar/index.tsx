import React from "react";
import styled from "styled-components";
import GitHubIcon from "@mui/icons-material/GitHub";

interface HeaderBarProps {}

const Bar = styled.div`
  position: fixed;
  margin: auto;
  width: 100%;
  background-color: #eaf9f7;
  border-bottom: 1px solid #a9a9a9;
`;

const BarContent = styled.div`
  margin: auto;
  max-width: 960px;
`;

const HeaderLink = styled.a`
  display: inline-block;
  text-decoration: none;
  margin: 0.83em 0;
  color: #000000;
  font-size: 1.5em;
  font-weight: 700;
`;

const HeaderBar: React.FC<HeaderBarProps> = (props: HeaderBarProps) => {
  return (
    <Bar>
      <BarContent>
        <HeaderLink
          target="_blank"
          href="https://github.com/AnsonTu/Spacestagram"
          rel="noopener noreferrer"
        >
          Spacestagram <GitHubIcon />
        </HeaderLink>
      </BarContent>
    </Bar>
  );
};

export default HeaderBar;
