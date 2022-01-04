import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner";
import Nav from "../components/Nav";
import "animate.css/animate.min.css";
import Howto from "../components/Howto";

const Home: NextPage = () => {
  return (
    <>
      <Nav></Nav>
      <Banner></Banner>
      <Howto></Howto>
    </>
  );
};

export default Home;
