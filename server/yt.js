const { google } = require("googleapis")
const fs = require('fs')

function uploadVideo(client, {title, description, tags, path}) {
    return new Promise((resolve, reject) => {
        const youtube = google.youtube({
            version: 'v3',
            auth: client
        })
    
        youtube.videos.insert(
            {
                resource: {
                    snippet: {
                        title: title,
                        description: description,
                        tags: tags
                    },
                    status: {
                        privacyStatus: "private"
                    },
                },
    
                part: "snippet,status",
    
                media: {
                    body: fs.createReadStream(path)
                }
            },
            (err, data) => {
                if (err)
                    reject({ code: 'YoutubeError', err })
                resolve(data)
            }
        )
    })
}

module.exports = {uploadVideo}