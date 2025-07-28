export const dataset = [
  {
    london: 5_000_000,
    paris: 5_000_000,
    newYork: 5_000_000,
    seoul: 50_000_000,
    month: '2013'
  },
  {
    london: 5_000_000,
    paris: 5_200_000,
    newYork: 7_800_000,
    seoul: 28_000_000,
    month: '2014'
  },
  {
    london: 4_700_000,
    paris: 5_300_000,
    newYork: 10_600_000,
    seoul: 41_000_000,
    month: '2015'
  },
  {
    london: 5_400_000,
    paris: 5_600_000,
    newYork: 9_200_000,
    seoul: 73_000_000,
    month: '2016'
  },
  {
    london: 5_700_000,
    paris: 6_900_000,
    newYork: 9_200_000,
    seoul: 99_000_000,
    month: '2017'
  },
  {
    london: 6_000_000,
    paris: 6_300_000,
    newYork: 10_300_000,
    seoul: 144_000_000,
    month: '2018'
  },
  {
    london: 5_900_000,
    paris: 6_000_000,
    newYork: 10_500_000,
    seoul: 319_000_000,
    month: '2019'
  },
  {
    london: 6_500_000,
    paris: 6_000_000,
    newYork: 10_600_000,
    seoul: 249_000_000,
    month: '2020'
  },
  {
    london: 5_100_000,
    paris: 5_100_000,
    newYork: 9_500_000,
    seoul: 131_000_000,
    month: '2021'
  },
  {
    london: 6_000_000,
    paris: 6_500_000,
    newYork: 9_700_000,
    seoul: 55_000_000,
    month: '2022'
  },
  {
    london: 6_700_000,
    paris: 6_400_000,
    newYork: 7_600_000,
    seoul: 48_000_000,
    month: '2023'
  },
  {
    london: 6_100_000,
    paris: 7_000_000,
    newYork: 10_300_000,
    seoul: 25_000_000,
    month: '2024'
  }
]

export function valueFormatter(value: number | null) {
  if (value === null || value === undefined) return ''
  return `${(value / 1_000_000).toFixed(2)} Tr VNĐ`
}
