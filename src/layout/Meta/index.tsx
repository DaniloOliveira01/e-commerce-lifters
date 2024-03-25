import { NextSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";

import { AppConfig } from "../../utils/appConfig";

type MetaProps = {
  title: string;
  description: string;
  canonical?: string;
};

const Meta = ({ title, description, canonical }: MetaProps) => {
  const router = useRouter();
  const basePath = router.basePath || "";

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href={`${basePath}/favicon.png`} />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${basePath}/favicon-32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${basePath}/favicon-16.png`}
        />
        <link rel="icon" href={`${basePath}/favicon.ico`} />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          title,
          description,
          url: canonical,
          locale: AppConfig.locale,
          site_name: AppConfig.site_name,
        }}
      />
    </>
  );
};

export { Meta };
