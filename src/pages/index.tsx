import { HomePageFrame } from "@/components/Layouts/Home";
import { Meta } from "@/layout/Meta";
import type { NextPage } from "next";
import { Fragment } from "react";

const Home: NextPage = () => {
  return (
    <Fragment>
      <Meta title="Lifters Shop" description="The best store" />
      <HomePageFrame />
    </Fragment>
  );
};

export default Home;
