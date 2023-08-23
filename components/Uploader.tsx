'use client'
import Button from './Button'
import { useMutation } from '@tanstack/react-query'

function Uploader() {
  const { mutate, isLoading } = useMutation(() =>
    fetch('/api/create-rooms')
      .then((res) => res.json())
      .then((data) => data),
  )
  return (
    <div
      style={{
        marginTop: 'auto',
        backgroundColor: '#e0e7ff',
        padding: '8px',
        borderRadius: '5px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={() => mutate()} disabled={false}>
        Upload ALL
      </Button>
    </div>
  )
}

export default Uploader
