import { ChangeEvent, useId, useState } from "react"
import { Language } from "../../types"
import { faClipboard, faFile } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeadphonesSimple } from "@fortawesome/free-solid-svg-icons"
import { TextBoxType, ToastClass } from "../../constants"
import "./TextBox.css"
import { useToast } from "../../hooks/useToast"

type Props = {
  type: TextBoxType,
  value: string,
  placeholder: string,
  language?: Language,
  setText?: (text: string) => void
}

export default function TextBox({ type, value, placeholder, language, setText }: Props) {
  const [dragging, setDragging] = useState(false)
  const textBox = useId()
  const { openToast } = useToast()

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (typeof setText !== 'undefined') {
      setText(e.target.value)
    }
  }

  const handleClipboard = () => {
    navigator.clipboard.writeText(value)
  }

  const handleSpeech = () => {
    if (language !== undefined) {
      const utterance = new SpeechSynthesisUtterance(value)
      utterance.lang = language
      speechSynthesis.speak(utterance)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragging(true)
    } else if (e.type === 'dragleave') {
      setDragging(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)
    if (typeof setText !== 'undefined') {
      if (e.dataTransfer.files) {
        const file = e.dataTransfer.files[0];

        if (typeof file !== 'undefined') {
          if (file.type === "text/plain") {
            const reader = new FileReader();

            reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
              const result = readerEvent.target?.result

              if (typeof result === "string") {
                setText(result);
              }
            };

            reader.readAsText(file);
          } else {
            openToast("Please drop a txt file", ToastClass.Warning)
          }
        }
      }
    }
  }

  return (
    <div
      className={`textBox ${type}`}
      id={textBox}
      onDragEnter={handleDrag}
    >
      {
        type === TextBoxType.Write && dragging
          ?
          <>
            <div className="dropzoneBackground">
              <FontAwesomeIcon className="icon" icon={faFile} />
              <p>Drop the .txt file you want tranlate</p>
            </div>
            <div className="dropzone"
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            />
          </>
          :
          <textarea
            className='text'
            id=""
            placeholder={placeholder}
            autoFocus={type === TextBoxType.Write}
            onChange={handleChange}
            disabled={type === TextBoxType.Read}
            value={value}
          />
      }

      {
        type === TextBoxType.Read &&
        <div className="buttons">
          <button
            onClick={handleSpeech}>
            <FontAwesomeIcon icon={faHeadphonesSimple} />
          </button>
          <button
            onClick={handleClipboard}>
            <FontAwesomeIcon icon={faClipboard} />
          </button>
        </div>
      }
    </div>
  )
}