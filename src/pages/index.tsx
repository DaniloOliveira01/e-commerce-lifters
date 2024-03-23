import type { NextPage } from "next";
import { useTheme } from "next-themes";

import { Meta } from "../layout/Meta";

const Home: NextPage = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <>
      <Meta title="Blog Template" description="Este é o template para blogs" />
      <div className="flex flex-col align-center mt-10 text-center">
        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          click here to change the theme
        </button>
      </div>
    </>
  );
};

export default Home;
