const isImage = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
};

const isVideo = (url) => {
    return url.match(/\.(mp4|webm|ogg)$/) != null;
};
export { isImage, isVideo }
