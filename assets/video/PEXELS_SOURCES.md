# Lucent mosaic video sourcing log

## Implementation status

The current branch implements the hero and mosaic fixes using the repository's existing non-copyright project footage (`opening-tracked-mobile.mp4`, `opening-tracked.mp4`, and `opening-tracked.webm`) with differentiated crop positions, playback offsets, playback rates, flip treatments, and darker cinematic grading.

This avoids adding unverified third-party assets until final Pexels selections can be manually reviewed and approved.

## Required next asset pass

Before production launch, replace the temporary transformed project-footage variants with approved football drill clips from Pexels or another confirmed royalty-free/non-copyright source.

Recommended searches:

- football training drill
- soccer training drill
- football dribbling cones
- soccer ball control drill
- football shooting practice
- football agility training
- soccer player training
- football skills training
- academy football training

## Selection rules

Use only assets that are suitable for website use and whose license permits the intended usage. Avoid videos with visible watermarks, logos, club badges, recognizable brands, distracting text overlays, or low-production stock styling.

Target clips:

| Local file | Concept | Visual requirement | Source URL | Status |
|---|---|---|---|---|
| mosaic-touch.mp4 | First touch | player receiving or controlling ball | TBD | pending |
| mosaic-dribble.mp4 | Dribbling | cones, footwork, close control | TBD | pending |
| mosaic-control.mp4 | Ball control | close-up foot and ball movement | TBD | pending |
| mosaic-shot.mp4 | Finishing | shooting or striking practice | TBD | pending |
| mosaic-agility.mp4 | Agility | ladder, cones, change of direction | TBD | pending |
| mosaic-sprint.mp4 | Speed | sprinting or acceleration drill | TBD | pending |
| mosaic-training.mp4 | General training | wider pitch/team training shot | TBD | pending |
| mosaic-scouting.mp4 | Evaluation | solo player action suitable for assessment | TBD | pending |
| mosaic-proof.mp4 | Evidence pack | cinematic action shot | TBD | pending |

## Processing target

Each approved video should be processed as a muted, loop-friendly MP4, 4-7 seconds long, with web compression and a Lucent-style dark cinematic grade.

Suggested ffmpeg command:

```bash
ffmpeg -i input.mp4 \
  -vf "scale=1280:-2,crop=1280:720,eq=contrast=1.08:saturation=0.9:brightness=-0.04" \
  -t 6 \
  -an \
  -movflags +faststart \
  -c:v libx264 \
  -preset medium \
  -crf 26 \
  output.mp4
```
