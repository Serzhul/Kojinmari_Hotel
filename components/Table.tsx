'use client'
import { createContext, useContext, ReactNode } from 'react'
import styled from '@emotion/styled'

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props: { columns: string }) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`

const StyledHeader = styled(CommonRow)`
  padding: 1.8rem 2.4rem;
  background-color: ${(props) => `var(${props.color})`};
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: var(--color-grey-600);
  font-size: 1.4rem;
  font-weight: 600;
`

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:hover {
    cursor: pointer;
    background: var(--color-grey-100);
  }
`

const StyledBody = styled.section`
  margin: 0.4rem 0;
`

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`

interface ITable {
  columns: string
  children?: ReactNode
}

const TableContext = createContext<ITable | null>(null)

function Table({ columns, children }: ITable) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  )
}

function Header({
  color = '--color-grey-50',
  children,
}: {
  color?: string
  children: ReactNode
}) {
  const tableContext = useContext(TableContext)

  return (
    <StyledHeader
      color={color}
      role="row"
      columns={tableContext?.columns ?? ''}
      as="header"
    >
      {children}
    </StyledHeader>
  )
}

function Row({
  onClick,
  children,
}: {
  onClick?: () => void
  children: ReactNode
}) {
  const tableContext = useContext(TableContext)
  return (
    <StyledRow
      onClick={onClick}
      role="row"
      columns={tableContext?.columns ?? ''}
    >
      {children}
    </StyledRow>
  )
}

function Body<T>({
  data,
  render,
}: {
  data: T[]
  render: (room: T) => ReactNode
}) {
  if (!data.length) return <Empty>No data to show at the moment</Empty>

  return <StyledBody>{data?.map(render)}</StyledBody>
}

Table.Header = Header
Table.Row = Row
Table.Body = Body
Table.Footer = Footer

export default Table
