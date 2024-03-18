import { type Post } from "./AddPostForm";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

const PostItem = ({ address, id }: Post & { isEditable?: boolean }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const darkClassess = theme === "dark" ? "border-3 border-blue-600" : "";

  return (
    <article
      onClick={() => navigate(`/app/posts/${id}`)}
      className={`w-[330px] min-w-80 cursor-pointer overflow-hidden  rounded-2xl shadow-2xl transition-transform hover:translate-y-[-6px] ${darkClassess}`}
    >
      <div className="w-full">
        <img
          src="/images/bg.jpg"
          className="aspect-video w-full"
          alt="house to sell"
        />
      </div>
      <div className="m-4">
        <p>
          <span className="font-bold"> آدرس:</span> <span>{address}</span>
        </p>
      </div>
    </article>
  );
};

export default PostItem;
