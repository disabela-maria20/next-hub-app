import { CSSProperties } from 'react'
import ReactLoading from 'react-loading'

import s from './loading.module.scss'

const Video = ({ style }: { style?: CSSProperties | undefined }) => {
  return (
    <div className={s.loading} style={style}>
      <ReactLoading type="bubbles" color="#000" />
    </div>
  )
}

export default Video
