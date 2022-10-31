export default function Message({ children, username, description }) {
  return (
    <div className="bg-white p-2 sm:p-8 border-b-2 rounded-lg">
      <h2 className="font-medium text-lg sm:text-2xl">{username}</h2>
      <div className="py-4">
        <p className="font-normal text-md">{description}</p>
      </div>
      {children}
    </div>
  );
}
