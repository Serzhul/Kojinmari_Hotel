import styled from '@emotion/styled'

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`

function HeaderMenu() {
  return (
    <StyledHeaderMenu>
      <li>
        {/* <ButtonIcon
          onClick={() => {
            navigate('/account')
          }}
        >
          <HiOutlineUser />
        </ButtonIcon> */}
      </li>
      <li>{/* <DarkModeToggle /> */}</li>
      <li>{/* <Logout /> */}</li>
    </StyledHeaderMenu>
  )
}

export default HeaderMenu
