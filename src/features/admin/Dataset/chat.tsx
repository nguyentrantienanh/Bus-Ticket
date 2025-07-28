// dữ liệu chat mẫu

export const chatData = [
  {
    id: 1,
    name: 'Chat with Admin',
    description: 'Hỗ trợ đặt vé xe',
    lastMessage: 'Cảm ơn bạn đã sử dụng dịch vụ.',
    timestamp: '2023-10-01T12:00:00Z',
    participants: ['admin', 'customer'],
    messages: [
      { id: 2, sender: 'customer', text: 'Chào admin, tôi muốn đặt vé xe.', timestamp: '12:00' },
      { id: 1, sender: 'admin', text: 'Chào bạn, bạn muốn đi tuyến nào ạ?', timestamp: '12:01' },
      { id: 2, sender: 'customer', text: 'Tôi muốn đi từ Hà Nội đến Đà Nẵng.', timestamp: '12:02' },
      { id: 1, sender: 'admin', text: 'Bạn muốn đi ngày nào và mấy giờ?', timestamp: '12:03' },
      { id: 2, sender: 'customer', text: 'Tôi muốn đi vào ngày mai lúc 8h sáng.', timestamp: '12:04' },
      { id: 1, sender: 'admin', text: 'Cảm ơn bạn, tôi sẽ kiểm tra vé còn trống.', timestamp: '12:05' },
      { id: 2, sender: 'customer', text: 'Cảm ơn admin.' }
    ]
  },
  {
    id: 2,
    name: 'Chat with Admin',
    description: 'Hỗ trợ thông tin chuyến đi',
    lastMessage: 'Cảm ơn admin rất nhiều.',
    timestamp: '2023-10-02T14:30:00Z',
    participants: ['admin', 'customer'],
    messages: [
      { id: 2, sender: 'customer', text: 'Xe có wifi không admin?', timestamp: '14:30' },
      { id: 1, sender: 'admin', text: 'Dạ, xe có wifi miễn phí bạn nhé.', timestamp: '14:31' },
      { id: 2, sender: 'customer', text: 'Có hỗ trợ nước uống không?', timestamp: '14:32' },
      { id: 1, sender: 'admin', text: 'Có, mỗi khách sẽ được tặng 1 chai nước.', timestamp: '14:33' },
      { id: 2, sender: 'customer', text: 'Cảm ơn admin.', timestamp: '14:34' }
    ]
  },
  {
    id: 3,
    name: 'Chat with Admin',
    description: 'Hỗ trợ đổi vé',
    lastMessage: 'Đúng rồi bạn, tôi sẽ tiến hành đổi vé.',
    timestamp: '2023-10-03T09:15:00Z',
    participants: ['admin', 'customer'],
    messages: [
      { id: 2, sender: 'customer', text: 'Tôi muốn đổi vé sang ngày khác được không?', timestamp: '09:15' },
      { id: 1, sender: 'admin', text: 'Bạn muốn đổi sang ngày nào ạ?', timestamp: '09:16' },
      { id: 2, sender: 'customer', text: 'Tôi muốn đổi sang ngày 20/06.', timestamp: '09:17' },
      { id: 1, sender: 'admin', text: 'Được bạn nhé, tôi sẽ hỗ trợ đổi vé cho bạn.', timestamp: '09:18' },
      { id: 2, sender: 'customer', text: 'Có mất phí không admin?', timestamp: '09:19' },
      { id: 1, sender: 'admin', text: 'Nếu đổi trước 24h sẽ không mất phí.', timestamp: '09:20' },
      { id: 2, sender: 'customer', text: 'Tôi đổi ngay bây giờ thì được đúng không?', timestamp: '09:21' },
      { id: 1, sender: 'admin', text: 'Đúng rồi bạn, tôi sẽ tiến hành đổi vé.', timestamp: '09:22' },
      { id: 2, sender: 'customer', text: 'Cảm ơn admin rất nhiều.', timestamp: '09:23' },
      { id: 1, sender: 'admin', text: 'Không có gì ạ, cảm ơn bạn đã sử dụng dịch vụ.', timestamp: '09:24' }
    ]
  }
]
