import './Toasts.css'
import { useEffect } from "react"
import { ToastClass } from "../../constants"
import { useToast } from "../../hooks/useToast"
import { ToastType } from "../../types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircleExclamation, faInfo, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'

type Props = {
  toasts: ToastType[]
}

type ChildProps = {
  id: number,
  text: string,
  toastClass: ToastClass,
  cancelable: boolean
  delay: number
}

export default function Toasts({ toasts }: Props) {
  if (toasts && toasts.length === 0) return null

  return (
    <div className="toastsList">
      {
        toasts.map(toast => (
          <Toast
            key={toast.id}
            id={toast.id}
            text={toast.text}
            toastClass={toast.toastClass}
            cancelable={toast.cancelable}
            delay={toast.delay} />
        ))
      }
    </div>
  )
}

function Toast({ id, text, toastClass, cancelable, delay }: ChildProps) {
  const { closeToast } = useToast()
  let title;
  let icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      closeToast(id)
    }, delay)

    return () => { clearTimeout(timer) }
  }, [])

  if (toastClass === ToastClass.Info) {
    title = "Info"
    icon = faInfo
  } else if (toastClass === ToastClass.Success) {
    title = "Success"
    icon = faCheck
  } else if (toastClass === ToastClass.Warning) {
    title = "Warning"
    icon = faTriangleExclamation
  } else {
    title = "Error"
    icon = faCircleExclamation
  }

  return (
    <div key={id} className={`toast ${toastClass}`}>
      <div className='icon'>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className='content'>
        <h2 className='title'>{title}</h2>
        <p className='description'>{text}</p>
      </div>
      {
        cancelable &&
        <button className='close' onClick={() => closeToast(id)}><FontAwesomeIcon icon={faCircleXmark} /></button>
      }
    </div>
  )
}