module.exports = {
    siteMetadata: {
        title: `Title from siteMetadata`,
        author: `Zach`,
        description: `A cool website`,
        menuLinks:[
            {
                name: `Home`,
                link: `/`
            },
            {
                name: `Radio Free Jesse`,
                link: `/radio-free-jesse`,
            },
            {
                name: `Radio Free Zach`,
                link: `/radio-free-zach`
            },
            {
                name: `shop`,
                link: `/shop`
            },
        ]
    },
    plugins: [
        `gatsby-plugin-netlify-cms`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `src`,
                path: `${__dirname}/src/`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                path: `${__dirname}/src/pages/`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `posts`,
                path: `${__dirname}/src/posts/`,
            },
        },
        {
            resolve: `gatsby-plugin-web-font-loader`,
            options: {
                typekit: {
                    id: `jeu3hfk`
                }
            }
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `GatsbyJS`,
                short_name: `GatsbyJS`,
                start_url: `/`,
                background_color: `#6b37bf`,
                theme_color: `#6b37bf`,
                // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
                // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
                display: `standalone`,
                icon: `src/images/icon.png`, // This path is relative to the root of the site.
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-offline`,
        `gatsby-plugin-sass`,
        `gatsby-transformer-remark`,
        `gatsby-plugin-react-helmet`,
    ]
}
