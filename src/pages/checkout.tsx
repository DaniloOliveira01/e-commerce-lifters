import { NextPage } from "next";
import { useRouter } from "next/router";

const CheckoutPage: NextPage = () => {
  const router = useRouter();
  const { totalPrice } = router.query;

  return (
    <main className="flex justify-center items-center ">
      <section className="flex flex-col justify-start items-start gap-5">
        <h3>Your bag:</h3>
      </section>

      <section></section>
    </main>
  );
};

export default CheckoutPage;
