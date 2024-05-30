function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-3 w-[200px] text-center text-[16px] bg-[#9bf2d9] text-black border-[2px] border-solid shadow-md shadow-gray-400 border-[#2f856b] cursor-pointer active:shadow-none"
    >
      {children}
    </button>
  );
}

export default Button;
