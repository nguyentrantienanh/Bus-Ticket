import * as React from 'react'
import Stack from '@mui/material/Stack'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import { BarChart } from '@mui/x-charts/BarChart'
import { dataset, valueFormatter } from '../../Dataset/weather'

type TickParamsSelectorProps = {
  tickPlacement: 'end' | 'start' | 'middle' | 'extremities'
  tickLabelPlacement: 'tick' | 'middle'
  setTickPlacement: React.Dispatch<React.SetStateAction<'end' | 'start' | 'middle' | 'extremities'>>
}

function TickParamsSelector({
  tickPlacement,

  setTickPlacement
}: TickParamsSelectorProps) {
  return (
    <Stack direction='row' spacing={2} alignItems='center' justifyContent='center' sx={{ mb: 2 }}>
      <FormControl>
        <div className='hidden md:table-cell'>
          <FormLabel id='tick-placement-radio-buttons-group-label'>Vị trí tick</FormLabel>
        </div>

        <RadioGroup
          row
          aria-labelledby='tick-placement-radio-buttons-group-label'
          name='tick-placement'
          value={tickPlacement}
          onChange={(event) => setTickPlacement(event.target.value as 'start' | 'end' | 'middle' | 'extremities')}
        >
          <div className=' hidden md:table-cell  gap-2   '>
            <FormControlLabel value='start' control={<Radio />} label='start' />
            <FormControlLabel value='end' control={<Radio />} label='end' />
            <FormControlLabel value='middle' control={<Radio />} label='middle' />
            <FormControlLabel value='extremities' control={<Radio />} label='extremities' />
          </div>
        </RadioGroup>
      </FormControl>
    </Stack>
  )
}

const chartSetting = {
  yAxis: [
    {
      label: 'Triệu VNĐ',
      width: 80
    }
  ],
  series: [{ dataKey: 'seoul', label: 'Doanh thu', valueFormatter }],
  height: 300,
  margin: { left: 0 }
}

// ...existing code...
export default function TickPlacementBars() {
  const [tickPlacement, setTickPlacement] = React.useState<'start' | 'end' | 'middle' | 'extremities'>('middle')

  return (
    <div style={{ width: '100%', height: '100%' }} className='overflow-x-auto'>
      <TickParamsSelector
        tickPlacement={tickPlacement}
        tickLabelPlacement={'tick'}
        setTickPlacement={setTickPlacement}
      />
      {/* giao diện mobile thu gọn */}
      <div style={{ minWidth: 400 }}>
        <BarChart
          dataset={dataset}
          xAxis={[{ dataKey: 'month', tickPlacement }]}
          {...chartSetting}
          height={220} // giảm chiều cao cho mobile nếu muốn
        />
      </div>
    </div>
  )
}
