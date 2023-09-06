import styled from '@emotion/styled'

export const ConfirmButton = styled.button`
  width: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.4rem;
  border: 1px solid
    ${(props: { types: string }) =>
      props.types === 'confirm'
        ? 'var(--color-green-700)'
        : 'var(--color-red-400)'};
  border-radius: var(--border-radius-md);
  font-size: 1.6rem;
  background-color: ${(props: { types: string }) =>
    props.types === 'confirm'
      ? 'var(--color-green-700)'
      : 'var(--color-red-400)'};
  color: #fff;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 11px
      ${(props: { types: string }) =>
        props.types === 'confirm'
          ? 'var(--color-green-700)'
          : 'var(--color-red-400)'};
  }

  @media (max-width: 1000px) {
    font-size: 2rem;
    width: 12rem;
  }
`
