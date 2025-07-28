import * as React from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

export default function LinearBuffer() {
  const [progress, setProgress] = React.useState(0)
  const [buffer, setBuffer] = React.useState(10)

  const progressRef = React.useRef(() => {})
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress === 100) {
        setProgress(0)
        setBuffer(30)
      } else {
        setProgress(progress + 1)
        if (buffer < 3000 && progress % 40 === 0) {
          const newBuffer = buffer + 5 + Math.random() * 70
          setBuffer(newBuffer > 100 ? 100 : newBuffer)
        }
      }
    }
  })

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current()
    }, 100)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress color='success' variant='buffer' value={progress} valueBuffer={buffer} />
    </Box>
  )
}
