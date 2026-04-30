import { Link } from "react-router-dom";

function MenuItem({ direction, text }: { direction: string, text: string }) {
  return (
    <Link 
      to={direction} 
      className="p-2 hover:bg-green-50 hover:text-green-600 rounded cursor-pointer transition-colors"
    >
      {text}
    </Link>
  );
}

export default MenuItem;