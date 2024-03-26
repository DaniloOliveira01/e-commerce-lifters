import { Banner } from "@/components/Banner";
import HeaderWeb from "@/components/Header";
import { useRouter } from "next/router";
import { Fragment, ReactNode, useEffect } from "react";

interface IMainTemplateProps {
  children: ReactNode;
}

export const MainTemplate = ({ children }: IMainTemplateProps) => {
  const router = useRouter();

  return (
    <Fragment>
      <HeaderWeb />
      {router.asPath === "/" && <Banner />}
      <main className="flex pb-10 flex-col min-h-screen overflow-hidden">
        {children}
      </main>
    </Fragment>
  );
};
