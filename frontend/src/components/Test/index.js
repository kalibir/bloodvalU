import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Button,
  BigButton,
  SmallButton,
  LikeButton,
  CommentButton,
  SplitButton,
} from "../../style/GlobalButtons";

import { TitleContainer } from "../../style/GlobalWrappers";
import {
  MainTitle,
  TitleHr,
  SmallTitleHr,
  BigTitleHr,
} from "../../style/GlobalTitles";
import {
  BaseInput,
  SearchInput,
  FilterListInput,
  CommentInput,
  InputTextArea,
} from "../../style/GlobalInputs";
import Spinner from "../GenericSpinner";
import {DonorValidationPage} from "../Credentials/ValidationDonor";



function Template(props) {
  return (
    <div className="App">
      <header className="App-header">
       <DonorValidationPage />
        {/*<h1>Spinner</h1>*/}
        {/*<Spinner />*/}
        {/*<br></br>*/}
        {/*<h1>Buttons</h1>*/}
        {/*<br></br>*/}
        {/*<Button>Button</Button>*/}
        {/*<p>.</p>*/}
        {/*<SmallButton>Small Btn</SmallButton>*/}
        {/*<p>.</p>*/}
        {/*<BigButton>Big Button</BigButton>*/}
        {/*<p>.</p>*/}
        {/*<p>.</p>*/}
        {/*<SplitButton>*/}
        {/*  <LikeButton>*/}
        {/*    <FontAwesomeIcon icon={["fa", "thumbs-up"]} />*/}
        {/*    Like 11*/}
        {/*  </LikeButton>*/}
        {/*  <CommentButton>Comment 22</CommentButton>*/}
        {/*</SplitButton>*/}
        {/*<br></br>*/}
        {/*<br></br>*/}
        {/*<h1>Icons</h1>*/}
        {/*<br></br>*/}

        {/*<br></br>*/}
        {/*<br></br>*/}

        {/*<div*/}
        {/*  style={{*/}
        {/*    display: "flex",*/}
        {/*    alignItems: "center",*/}
        {/*    justifyContent: "center",*/}
        {/*    flexDirection: "row",*/}
        {/*    gap: "12px",*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <FontAwesomeIcon icon={["fas", "clock"]} />*/}
        {/*  <FontAwesomeIcon icon={["fas", "money-bill-wave"]} />*/}
        {/*  <FontAwesomeIcon icon={["fas", "map-marker-alt"]} />*/}
        {/*  <FontAwesomeIcon icon={["fas", "mobile"]} />*/}
        {/*  <FontAwesomeIcon icon={["fas", "laptop"]} />*/}
        {/*</div>*/}
        {/*<br></br>*/}
        {/*<br></br>*/}

        {/*<br></br>*/}
        {/*<br></br>*/}
        {/*<h1>Inputs</h1>*/}
        {/*<br></br>*/}
        {/*<div*/}
        {/*  style={{*/}
        {/*    display: "flex",*/}
        {/*    alignItems: "center",*/}
        {/*    justifyContent: "center",*/}
        {/*    flexDirection: "column",*/}
        {/*    gap: "12px",*/}
        {/*    flexWrap: "wrap",*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <BaseInput placeholder="Base Input Field" type="text"></BaseInput>*/}
        {/*  <SearchInput*/}
        {/*    placeholder="Search Input Field"*/}
        {/*    type="text"*/}
        {/*  ></SearchInput>*/}
        {/*  <FilterListInput*/}
        {/*    placeholder="Filter List Input Field"*/}
        {/*    type="text"*/}
        {/*  ></FilterListInput>*/}
        {/*  <CommentInput*/}
        {/*    placeholder="Comment Input Field"*/}
        {/*    type="text"*/}
        {/*  ></CommentInput>*/}
        {/*  <InputTextArea*/}
        {/*    placeholder="Your review helps others learn about great local businesses. &#10;*/}
        {/*Please don't review this business if you received a freebie for writing this review, or if you're connected in any way to the owner or employees."*/}
        {/*    type="text"*/}
        {/*  ></InputTextArea>*/}
        {/*</div>*/}
        {/*<br></br>*/}
        {/*<br></br>*/}
        {/*<h1>Titles</h1>*/}
        {/*<br></br>*/}
        {/*<TitleContainer>*/}
        {/*  <MainTitle>Main Title</MainTitle>*/}
        {/*  <BigTitleHr></BigTitleHr>*/}
        {/*</TitleContainer>*/}
        {/*<br></br>*/}
        {/*<TitleContainer>*/}
        {/*  <MainTitle>Main Title</MainTitle>*/}
        {/*  <TitleHr></TitleHr>*/}
        {/*</TitleContainer>*/}
        {/*<br></br>*/}
        {/*<TitleContainer>*/}
        {/*  <MainTitle>Main Title</MainTitle>*/}
        {/*  <SmallTitleHr></SmallTitleHr>*/}
        {/*</TitleContainer>*/}
        {/*<br></br>*/}
        {/*<br></br>*/}
        {/*<br></br>*/}
        {/*<h1>Wrappers</h1>*/}
        {/*<br></br>*/}
        {/*<div*/}
        {/*  style={{*/}
        {/*    display: "flex",*/}
        {/*    alignItems: "center",*/}
        {/*    justifyContent: "center",*/}
        {/*    flexDirection: "row",*/}
        {/*    gap: "12px",*/}
        {/*    flexWrap: "wrap",*/}
        {/*  }}*/}
        {/*>*/}
        {/*  /!* Restaurant CARD *!/*/}
        {/*  /!* USER CARD *!/*/}
        {/*  /!* review CARD *!/*/}
        {/*</div>*/}
        {/*<br></br>*/}
        {/*<div*/}
        {/*  style={{*/}
        {/*    display: "flex",*/}
        {/*    alignItems: "center",*/}
        {/*    justifyContent: "center",*/}
        {/*    flexDirection: "row",*/}
        {/*    gap: "12px",*/}
        {/*    flexWrap: "wrap",*/}
        {/*  }}*/}
        {/*>*/}
        {/*  /!* wide review CARD *!/*/}

        {/*</div>*/}
        {/*<br></br>*/}
      </header>
    </div>
  );
}

export default Template;
