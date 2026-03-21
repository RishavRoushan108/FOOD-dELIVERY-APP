import Editfooditem from "@/app/_component/Editfooditem";

const Editpage = async ({ params }) => {
  const { id } = await params;
  return (
    <div className="mt-10">
      <Editfooditem id={id} />
    </div>
  );
};

export default Editpage;
