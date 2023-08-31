import styled from '@emotion/styled'
import { ReactElement } from 'react'
import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form'

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2rem;
  padding: 1.2rem 0;

  &:first-of-type {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`

const StyledErrorRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2rem;

  &:first-of-type {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`

const Label = styled.label`
  font-weight: 500;
`

const Error = styled.span`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2rem;
  font-size: 1.4rem;
  color: var(--color-red-700);
`

function FormRow({
  label,
  error,
  children,
}: {
  label?: string
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined
  children: ReactElement
}) {
  return (
    <>
      <StyledFormRow>
        {label && <Label htmlFor={children?.props?.id}>{label}</Label>}
        {children}
      </StyledFormRow>
      <StyledErrorRow>
        <div />
        {error && <Error>{error as string}</Error>}
      </StyledErrorRow>
    </>
  )
}

export default FormRow
