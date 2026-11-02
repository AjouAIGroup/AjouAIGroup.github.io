# Photos

Each folder here is one album on the `/photo` page: photos from joint AAIG
activities such as workshops, seminars, retreats, and shared events.

## Adding an album

1. Create a folder named `YYYY-MM-DD-short-name`, for example
   `2026-10-15-joint-workshop`. The folder name is the album's id.
2. Put the photos in that folder. Use `.webp` or `.jpg`, at most 2400 px on
   the long side and 3 MB per file; larger files fail validation.
3. Add `album.json` next to the photos:

```json
{
    "title": "AAIG Joint Workshop",
    "date": "2026-10-15",
    "location": "Paldal Hall, Ajou University",
    "labs": ["cvl", "sail", "hei", "iknow", "lamda"],
    "description": "One or two sentences about the activity.",
    "photos": [
        {
            "file": "01.webp",
            "alt": "Students from five labs presenting posters in a hall",
            "caption": "Poster session"
        }
    ]
}
```

- `title`, `date` (YYYY-MM-DD), and `photos` are required.
- `labs` uses the lab keys `cvl` (MMAI), `sail`, `hei`, `iknow`, and `lamda`.
  Leave it out when the whole group took part.
- Every photo needs `alt`: a short description of what the photo shows, read
  aloud by screen readers. `caption` is optional and shown under the photo.
- Photos appear in the order listed. Every image in the folder must be listed,
  and every listed file must exist.

Only post photos that everyone pictured has agreed to share publicly.

Run `npm run validate:content` to check the album, then build as usual.
Albums are shown newest first.
