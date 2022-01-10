import type { NextPage } from "next";

import Banner from "../components/Banner";
import Nav from "../components/Nav";
import HowtoCard from "../components/HowtoCard";
import IntroBanner from "../components/IntroBanner";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  return (
    <>
      <Nav></Nav>
      <body>
        <Banner></Banner>
        <HowtoCard></HowtoCard>
        <IntroBanner></IntroBanner>
      </body>
      <Footer></Footer>
    </>
  );
};

export default Home;
