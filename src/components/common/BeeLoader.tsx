export default function BeeLoader() {
  return (
    <div className="flex justify-center items-center fixed inset-0 bg-primary-100 bg-opacity-15 z-50">
      <div>
        <img src={"/bee_loader.gif"} alt="bee loader" width={280} />
      </div>
    </div>
  );
}
