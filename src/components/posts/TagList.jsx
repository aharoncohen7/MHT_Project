import { Chip, Stack, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TagList({ postTags }) {
  const nav = useNavigate();
  let tags = postTags.split(",");

  return (
    postTags != null && (
      <Stack direction="row" spacing={1}>
        {tags.map((tag, index) => (
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
    )
  );
}
