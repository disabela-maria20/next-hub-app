import s from './video.module.scss'

const Video = ({ url }: { url: string | undefined }) => {
  return (
    <div className={s.videoContainer}>
      <iframe
        width="560"
        height="315"
        src={url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default Video
