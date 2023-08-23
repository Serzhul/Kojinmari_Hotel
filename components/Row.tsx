import styled from '@emotion/styled'

const Row = styled.div`
  display: flex;
  ${(props: { type: string }) =>
    props.type === 'horizontal' &&
    `
      justify-content: space-between;
      align-items: center;
    `}

  ${(props: { type: string }) =>
    props.type === 'vertical' &&
    `
      flex-direction: column;
      gap: 1.6rem;
    `}
`

Row.defaultProps = {
  type: 'vertical',
}

export default Row
