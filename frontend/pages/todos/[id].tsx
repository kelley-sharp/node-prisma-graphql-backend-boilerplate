import { NextPage } from "next";
import { useRouter } from "next/router";

const TodosShowPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>Viewing Todo ID # {id}</div>;
};

export default TodosShowPage;
