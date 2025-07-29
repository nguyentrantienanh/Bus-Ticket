export const ExpiredTickets = () => {
  const now = new Date()
  const UserList = JSON.parse(localStorage.getItem('userList') || '[]')
  const ticketuserlist = UserList.map((u: any) => u.ticket).flat()
  const Guestuser = JSON.parse(localStorage.getItem('guestUserInfo') || '[]')
  const ticketguestuser = Guestuser.map((u: any) => u.ticket).flat()
  const ve = [...ticketuserlist, ...ticketguestuser]

  const expiredTickets = ve.filter((ticket: any) => {
    if (!ticket.timestamp) return false // nếu không có timestamp thì bỏ qua
    const timestamp = new Date(ticket.timestamp)
    const diffTime = Math.abs(now.getTime() - timestamp.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    // giây là hết hạn
    // const diffGiay = Math.ceil(diffTime / 1000)
    // console.log(`Ticket ${ticket.id}: ${diffGiay} giây `)
    return diffDays > 15
  })

  if (expiredTickets.length > 0) {
    const expiredIds = expiredTickets.map((ticket) => ticket.id)

    // lưu mới lại cả 2
    const updatedUserList = UserList.map((u: any) => ({
      ...u,
      ticket: (u.ticket || []).filter((t: any) => !expiredIds.includes(t.id))
    }))

    const updatedGuestList = Guestuser.map((u: any) => ({
      ...u,
      ticket: (u.ticket || []).filter((t: any) => !expiredIds.includes(t.id))
    }))

    // Lưu CẢ HAI
    localStorage.setItem('userList', JSON.stringify(updatedUserList))
    localStorage.setItem('guestUserInfo', JSON.stringify(updatedGuestList))

    console.log('✅ Vé hết hạn đã được xóa:', expiredTickets)
  } else {
    console.log('Không có vé hết hạn.')
  }

  return expiredTickets
}
