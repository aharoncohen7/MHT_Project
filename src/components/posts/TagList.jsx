
import { Chip, Stack, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../../helpers/useAxiosReq";

export default function TagList({ postTags }) {
  const nav = useNavigate();
  const [allTags, setAllTags] = useState([]);
  let postTagList = [];

  const getTags = async () => {
    const data = await axiosReq({ method: "GET", body: {}, url: "/tags" });
    const uniqueTags = data.filter(
      (tag, index, self) => index === self.findIndex((t) => t.name === tag.name)
    );
    setAllTags(uniqueTags);
  };

  useEffect(() => {
    if (!postTags) {
      getTags();
    }
  }, [postTags]); // רק כש postTags אינו מוגדר מבצעים את הקריאה

  if (postTags) {
    postTagList = postTags.split(",");
  }

  return (
    <>
      {postTags != null && (
        <Stack
          direction="row"
          paddingBottom={"10px"}
          spacing={{ xs: 1 }}
          useFlexGap
          sx={{ flexWrap: "wrap" }}
        >
          {postTagList.map((tag, index) => (
            <Tooltip key={tag} title="לחץ כדי להציג מאמרים נוספים בנושא זה">
              <Chip
                color="primary"
                label={tag}
                onClick={() => {
                  nav(`/home/?tag=${tag}`);
                }}
              />
            </Tooltip>
          ))}
        </Stack>
      )}
      {allTags.length ? (
        <Stack
          direction="row"
          paddingBottom={"10px"}
          spacing={{ xs: 1 }}
          useFlexGap
          sx={{ flexWrap: "wrap" }}
        >
          {allTags.map((tag, index) => (
            <Tooltip
              key={tag.name}
              title="לחץ כדי להציג מאמרים נוספים בנושא זה"
            >
              <Chip
                color="primary"
                label={tag.name}
                onClick={() => {
                  nav(`/home/?tag=${tag.name}`);
                }}
              />
            </Tooltip>
          ))}
        </Stack>
      ) : null}
    </>
  );
}



// import { Chip, Stack, Tooltip } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// export default function TagList({ postTags }) {
//   const nav = useNavigate();
//   let tags = postTags.split(",");

//   return (
//     postTags != null && (
//       <Stack
//         direction="row"
//         paddingBottom={"10px"}
//         spacing={{ xs: 1 }}
//         useFlexGap
//         sx={{ flexWrap: "wrap" }}
//       >
//         {tags.map((tag, index) => (
//           <Tooltip key={tag} title="לחץ כדי להציג מאמרים נוספים בנושא זה">
//             <Chip
//               color="primary"
//               label={tag}
//               onClick={() => {
//                 nav(`/home/?tag=${tag}`);
//               }}
//             />
//           </Tooltip>
//         ))}
//       </Stack>
//     )
//   );
// }
