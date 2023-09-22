import { useOutsideClick } from '@/hooks/useOutsideClick'
import styled from '@emotion/styled'
import { IconX } from '@tabler/icons-react'
import React, {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  cloneElement,
  ReactElement,
} from 'react'
import { createPortal } from 'react-dom'

const ModalContext = createContext<IModal | null>(null)

interface IModal {
  openName: string
  close: () => void
  open: Dispatch<SetStateAction<string>>
  children?: ReactNode
}

function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState('')

  const close = () => setOpenName('')
  const open = setOpenName

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  )
}

function Open({
  children,
  opens: opensWindowName,
}: {
  children: ReactElement
  opens: string
}) {
  const ctx = useContext(ModalContext)

  return cloneElement(children, {
    onClick: () => ctx?.open(opensWindowName),
  })
}

function Window({ children, name }: { children: ReactElement; name: string }) {
  const ctx = useContext(ModalContext)
  const ref = useOutsideClick(ctx?.close)

  if (name !== ctx?.openName) return null

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={ctx?.close}>
          <IconX />
        </Button>
        <div>
          {cloneElement(children, {
            onCloseModal: ctx?.close,
          })}
        </div>
      </StyledModal>
    </Overlay>,
    document.body,
  )
}

Modal.Open = Open
Modal.Window = Window

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`

export default Modal
