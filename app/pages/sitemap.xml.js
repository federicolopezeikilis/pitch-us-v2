import fs from "fs"
import { retrieveAllArtistsWithSongs } from "../logic/retrieveAllArtistsWithSongs";

function SiteMap() {
}

export async function getServerSideProps({ res }) {
    const baseUrl = 'https://pitch-us.vercel.app'

        const staticPages = fs
            .readdirSync('./.next/BUILD_ID')
            .filter((staticPage) => {
                return ![
                    '_app.jsx',
                    '_document.jsx', -
                    'sitemap.xml.jsx',
                ].includes(staticPage);
            })
            .map((staticPagePath) => {
                return `${baseUrl}/${staticPagePath}`;
            });

    const artistsWithSongs = await retrieveAllArtistsWithSongs()

    const dynamicPages = artistsWithSongs.reduce((previousValue, currentArtist) => {
        const arrayOfUrls = currentArtist.songs.map(song => {
            return `${baseUrl}/artist/${currentArtist.name.toLowerCase().replaceAll(' ', '-')}/song/${song.toLowerCase().replaceAll(' ', '-')}`
        })

        arrayOfUrls.unshift(`${baseUrl}/artist/${currentArtist.name.toLowerCase().replaceAll(' ', '-')}`)

        previousValue.push(...arrayOfUrls)

        return previousValue
    }, [])

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
            .map((url) => {
                return `
            <url>
              <loc>${url}</loc>
              <priority>1.0</priority>
            </url>
          `;
            })
            .join("")}
        ${dynamicPages
            .map((url) => {
                return `
                <url>
                  <loc>${url}</loc>
                  <priority>1.0</priority>
                </url>
              `;
            })
            .join("")}
    </urlset>
  `;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;