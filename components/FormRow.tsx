import styled from '@emotion/styled'
import { ReactElement } from 'react'
import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form'

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 1rem;
  align-items: center;
  padding: 1.2rem 0;
  position: relative;

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

  &:not(:last-child) {
    border-bottom: none;
  }
`

const StyledErrorRow = styled.div`
  display: flex;
  align-items: center;

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
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  -ms-transition: all 0.2s ease-out;
  -o-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
  position: absolute;
  left: 0;
`

const Error = styled.span`
  display: flex;
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
        {children}
        {label && <Label htmlFor={children?.props?.id}>{label}</Label>}
      </StyledFormRow>
      <StyledErrorRow>
        {error && <Error>{error as string}</Error>}
      </StyledErrorRow>
    </>
  )
}

export default FormRow
