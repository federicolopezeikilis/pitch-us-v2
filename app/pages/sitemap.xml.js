import fs from "fs"
import { retrieveAllArtistsWithSongs, retrieveAllUsernames } from "../logic";
import { stringToUrl } from '../utils'

function SiteMap() {
}

export async function getServerSideProps({ res }) {
    const baseUrl = 'https://pitch-us.vercel.app'

    const staticPages = fs
        .readdirSync('./.next/server/pages')
        .filter((staticPage) => {
            return ![
                '_app.js',
                '_document.js',
                '_error.js',
                'sitemap.xml.js',
                'artist',
                'profile',
                'logout.js',
                'index.js'
            ].includes(staticPage);
        })
        .map((staticPagePath) => {
            return `${baseUrl}/${staticPagePath.split('.').slice(0, -1).join('.')}`;
        });

    debugger

    const artistsWithSongs = await retrieveAllArtistsWithSongs()

    const dynamicPages = artistsWithSongs.reduce((previousValue, currentArtist) => {
        const arrayOfUrls = currentArtist.songs.map(song => {
            return `${baseUrl}/artist/${stringToUrl(currentArtist.name)}/song/${stringToUrl(song)}`
        })

        arrayOfUrls.unshift(`${baseUrl}/artist/${stringToUrl(currentArtist.name)}`)

        previousValue.push(...arrayOfUrls)

        return previousValue
    }, [])

    const usernames = await retrieveAllUsernames()

    usernames.forEach(username => dynamicPages.push(`${baseUrl}/profile/${username}`))

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