import Student from "components/Pages/Admin/Student";

const title = "Home";
const desc = `${title} Page`;

const StudentPage = () => <Student />;

export function getStaticProps() {
  return {
    props: {
      desc,
      title,
    },
  };
}

export default StudentPage;
