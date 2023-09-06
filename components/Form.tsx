import styled from '@emotion/styled'

const Form = styled.form`
  ${(props: { type?: string }) =>
    props.type === 'regular' &&
    `
      padding: 2.4rem 4rem;
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-brand-200);
      border-radius: var(--border-radius-md);
    `}

  overflow: hidden;
  font-size: 1.4rem;
  margin-top: 10rem;

  @media (max-width: 1000px) {
    font-size: 2rem;
  }

  @media (max-width: 700px) {
    font-size: 2rem;
    padding: 2rem;
  }
`

Form.defaultProps = {
  type: 'regular',
}

export default Form
