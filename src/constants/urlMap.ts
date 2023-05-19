// OSS静态资源路径
export const OSS_URL = 'https://huike-nova.oss-cn-beijing.aliyuncs.com/nova-customer-h5/images/'

function getImageUrl(name) {
  return new URL(`../assets/images/${name}`, import.meta.url).href
}

export const LOGICAL_IMAGE = {
  imgEmptyVideo: getImageUrl('img_empty_video.png'),
  imgEmptyDouyin: getImageUrl('img_empty_douyin.png'),
  imgReleaseVideo: getImageUrl('img_release_video.png'),
}
/**
 * @constant 图片
 */
export const COMMON_IMG_URL = {
  wxLandingBackPage: `${OSS_URL}wx_landing_back.png`
}