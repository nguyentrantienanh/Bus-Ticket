export const ExpiredTickets = () => {
  const now = new Date()
  const ve = JSON.parse(localStorage.getItem('vedadat') || '[]')

  const expiredTickets = ve.filter((ticket: any) => {
    if (!ticket.timestamp) return false // nếu không có timestamp thì bỏ qua
    const timestamp = new Date(ticket.timestamp)
    const diffTime = Math.abs(now.getTime() - timestamp.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 15
  })

  if (expiredTickets.length > 0) {
    const updatedTickets = ve.filter((ticket: any) => !expiredTickets.includes(ticket))
    localStorage.setItem('vedadat', JSON.stringify(updatedTickets))
    console.log('Vé hết hạn đã được xóa:', expiredTickets)
  } else {
    console.log('Không có vé hết hạn.')
  }

  return expiredTickets
}
