import styled from '@emotion/styled'

const Form = styled.form`
  ${(props: { type?: string }) =>
    props.type === 'regular' &&
    `
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-brand-200);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === 'modal' &&
    `
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`

Form.defaultProps = {
  type: 'regular',
}

export default Form
