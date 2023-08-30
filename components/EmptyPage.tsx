import styled from '@emotion/styled'
import { rem } from '@mantine/core'
import { IconMoodSad2 } from '@tabler/icons-react'
import { ReactNode } from 'react'

function EmptyPage({ children }: { children: ReactNode }) {
  return (
    <EmptyContentsContainer>
      <IconMoodSad2 size={rem(100)} />
      {children}
    </EmptyContentsContainer>
  )
}

export default EmptyPage

const EmptyContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  font-size: 1.8rem;
  margin: auto;
  background-color: var(--color-grey-100);
`
