import { InfoProducts } from "@/components/Layouts/InfoProducts";
import { Meta } from "@/layout/Meta";
import { NextPage } from "next";
import { Fragment } from "react";

const ProductPage: NextPage = () => {
  return (
    <Fragment>
      <Meta title="Lifters Shop" description="The best store" />
      <InfoProducts />
    </Fragment>
  );
};

export default ProductPage;
