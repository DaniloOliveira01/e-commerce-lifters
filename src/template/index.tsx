import { Banner } from "@/components/Banner";
import HeaderWeb from "@/components/Header";
import { Fragment, ReactNode } from "react";

interface IMainTemplateProps {
  children: ReactNode;
}

export const MainTemplate = ({ children }: IMainTemplateProps) => {
  return (
    <Fragment>
      <HeaderWeb />
      <Banner />
      <main className="flex pb-10 flex-col min-h-screen overflow-hidden">
        {children}
      </main>
    </Fragment>
  );
};
