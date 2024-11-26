import { Chip, Stack, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../../helpers/useAxiosReq";

export default function TagList({ postTags }) {
  const nav = useNavigate();
  const [allTags, setAllTags] = useState([]);
  let postTagList = [];

  // const getTags = async () => {
  //   const data = await axiosReq({ method: "GET", body: {}, url: "/tags" });
  //   const uniqueTags = data.filter(
  //     (tag, index, self) => index === self.findIndex((t) => t.name === tag.name)
  //   );
  //   setAllTags(uniqueTags);
  // };

  const getTags = async () => {
    const data = await axiosReq({ method: "GET", body: {}, url: "/tags" });

    // הסרת כפילויות
    const uniqueTags = data.filter(
      (tag, index, self) => index === self.findIndex((t) => t.name === tag.name)
    );

    // ערבוב רשימה בצורה רנדומלית
    const shuffledTags = uniqueTags.sort(() => 0.5 - Math.random());

    // החזרת 20 התגיות הראשונות
    const top20Tags = shuffledTags.slice(0, 20);

    // עדכון מצב עם 20 התגיות הראשונות
    setAllTags(top20Tags);
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
                  nav(`/search/?tag=${tag}`);
                }}
              />
            </Tooltip>
          ))}
        </Stack>
      )}
      {allTags.length ? (
        <>
          <span className="pb-2 pr-1 block text-center/">נושאים באתר</span>

          <Stack
          className="overflow-hidden"
            direction="row"
            paddingBottom={"10px"}
            spacing={{ xs: 1 }}
            useFlexGap
            sx={{ flexWrap: "wrap" }}
            maxHeight={78}
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
                    nav(`/search/?tag=${tag.name}`);
                  }}
                />
              </Tooltip>
            ))}
          </Stack>
        </>
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
//                 nav(`/search/?tag=${tag}`);
//               }}
//             />
//           </Tooltip>
//         ))}
//       </Stack>
//     )
//   );
// }
