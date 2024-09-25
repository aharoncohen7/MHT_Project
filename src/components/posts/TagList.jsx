import { useNavigate } from "react-router-dom";
import { ButtonClick } from "../about/ButtonClick";

export default function TagList({ postTags }) {
  const nav = useNavigate();
  let tags = postTags.split(",");

  return (
    postTags != null && (
      <div className="items-center rounded-md bg-gray-300 px-2 py-1 font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
        {tags.map((tag, index) => (
          <ButtonClick
            key={index}
            className="inline-flex items-center rounded-md bg-indigo-200 px-3 py-3 text-xl font-medium text-blue-700 ring-1 ring-inset ring-blue-1900/10"
            onClick={() => {
              nav(`/home/?tag=${tag}`);
            }}
          >
            {tag}
          </ButtonClick>
        ))}
      </div>
    )
  );
}
