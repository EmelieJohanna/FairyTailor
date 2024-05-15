function Button({ children }) {
  return (
    <div className="bg-yellow-300 text-center hover:bg-yellow-500 font-bold py-4 px-6 rounded-full mb-4 border-none w-[100px]">
      {children}
    </div>
  );
}

export default Button;
