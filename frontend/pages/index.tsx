import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner";
import Nav from "../components/Nav";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";

const Home: NextPage = () => {
  return (
    <>
      <Nav></Nav>
      <Banner></Banner>
    </>
  );
};

export default Home;
