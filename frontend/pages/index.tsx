import type { NextPage } from "next";

import Banner from "../components/Banner";
import Nav from "../components/Nav";
import HowtoCard from "../components/HowtoCard";
import IntroBanner from "../components/IntroBanner";

const Home: NextPage = () => {
  return (
    <>
      <head>
        <title>Lego2me</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </head>
      <Nav></Nav>
      <Banner></Banner>
      <HowtoCard></HowtoCard>
      <IntroBanner></IntroBanner>
    </>
  );
};

export default Home;
