import Landing from "components/Pages/Auth";

const title = "Home";
const desc = `${title} Page`;

const LandingPage = () => <Landing />;

export function getStaticProps() {
  return {
    props: {
      desc,
      title,
    },
  };
}

export default LandingPage;
