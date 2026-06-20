export const getMediaUrl = (url) => {
    if (!url) return url

    return url.replace(
        'https://storage.googleapis.com/website-clement-dubois/',
        'https://apicldub.bengibert.com/uploads/'
    )
}