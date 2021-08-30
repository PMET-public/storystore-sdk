import { ToastContainer as ToasttifyContainer, ToastContainerProps } from 'react-toastify'
import style from './Toast.module.css'

export { toast } from 'react-toastify'

export const ToastContainer = (options: ToastContainerProps) => {
  return (
    <div className={style.root}>
      <ToasttifyContainer {...options} />
    </div>
  )
}
