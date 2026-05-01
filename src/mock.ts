interface HttpRequestConfig {
  method: string
  url: string
  headers?: Record<string, string>
  body?: unknown
}

const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

const mockUsers = [
  { id: 1, name: '张伟', email: 'zhangwei@example.com', role: '管理员', status: '启用', createdAt: '2025-01-15' },
  { id: 2, name: '李娜', email: 'lina@example.com', role: '编辑', status: '启用', createdAt: '2025-02-03' },
  { id: 3, name: '王强', email: 'wangqiang@example.com', role: '访客', status: '禁用', createdAt: '2025-02-18' },
  { id: 4, name: '赵敏', email: 'zhaomin@example.com', role: '编辑', status: '启用', createdAt: '2025-03-01' },
  { id: 5, name: '孙磊', email: 'sunlei@example.com', role: '管理员', status: '启用', createdAt: '2025-03-12' },
  { id: 6, name: '周婷', email: 'zhouting@example.com', role: '访客', status: '启用', createdAt: '2025-03-20' },
  { id: 7, name: '吴昊', email: 'wuhao@example.com', role: '编辑', status: '禁用', createdAt: '2025-04-05' },
  { id: 8, name: '郑雪', email: 'zhengxue@example.com', role: '访客', status: '启用', createdAt: '2025-04-11' },
  { id: 9, name: '冯刚', email: 'fenggang@example.com', role: '管理员', status: '启用', createdAt: '2025-04-22' },
  { id: 10, name: '陈静', email: 'chenjing@example.com', role: '编辑', status: '启用', createdAt: '2025-05-01' },
  { id: 11, name: '杨帆', email: 'yangfan@example.com', role: '访客', status: '禁用', createdAt: '2025-05-10' },
  { id: 12, name: '朱丽', email: 'zhuli@example.com', role: '编辑', status: '启用', createdAt: '2025-05-18' },
  { id: 13, name: '秦峰', email: 'qinfeng@example.com', role: '管理员', status: '启用', createdAt: '2025-06-02' },
  { id: 14, name: '许瑶', email: 'xuyao@example.com', role: '访客', status: '启用', createdAt: '2025-06-15' },
  { id: 15, name: '韩超', email: 'hanchao@example.com', role: '编辑', status: '禁用', createdAt: '2025-06-28' },
  { id: 16, name: '唐薇', email: 'tangwei@example.com', role: '访客', status: '启用', createdAt: '2025-07-05' },
  { id: 17, name: '曹明', email: 'caoming@example.com', role: '管理员', status: '启用', createdAt: '2025-07-19' },
  { id: 18, name: '邓芳', email: 'dengfang@example.com', role: '编辑', status: '启用', createdAt: '2025-08-01' },
  { id: 19, name: '萧然', email: 'xiaoran@example.com', role: '访客', status: '禁用', createdAt: '2025-08-14' },
  { id: 20, name: '彭洁', email: 'pengjie@example.com', role: '编辑', status: '启用', createdAt: '2025-08-25' }
]

const mockOrders = [
  { id: 'ORD-20250101', product: 'MacBook Pro 14"', amount: 14999, status: '已完成', createdAt: '2025-01-08' },
  { id: 'ORD-20250102', product: 'iPhone 16 Pro', amount: 8999, status: '已完成', createdAt: '2025-01-15' },
  { id: 'ORD-20250103', product: 'AirPods Pro 2', amount: 1899, status: '已发货', createdAt: '2025-02-03' },
  { id: 'ORD-20250104', product: 'iPad Air M2', amount: 4799, status: '已付款', createdAt: '2025-02-14' },
  { id: 'ORD-20250105', product: 'Apple Watch Ultra 2', amount: 5999, status: '待付款', createdAt: '2025-02-28' },
  { id: 'ORD-20250106', product: 'Mac Mini M4', amount: 3999, status: '已完成', createdAt: '2025-03-05' },
  { id: 'ORD-20250107', product: 'Studio Display', amount: 11499, status: '已发货', createdAt: '2025-03-18' },
  { id: 'ORD-20250108', product: 'Magic Keyboard', amount: 999, status: '已完成', createdAt: '2025-03-25' },
  { id: 'ORD-20250109', product: 'HomePod 2', amount: 2299, status: '已付款', createdAt: '2025-04-02' },
  { id: 'ORD-20250110', product: 'Apple TV 4K', amount: 1499, status: '待付款', createdAt: '2025-04-10' },
  { id: 'ORD-20250111', product: 'MacBook Air 15"', amount: 10499, status: '已完成', createdAt: '2025-04-22' },
  { id: 'ORD-20250112', product: 'iPad Pro M4', amount: 8999, status: '已发货', createdAt: '2025-05-01' },
  { id: 'ORD-20250113', product: 'AirTag 4件装', amount: 779, status: '已完成', createdAt: '2025-05-12' },
  { id: 'ORD-20250114', product: 'Apple Pencil Pro', amount: 999, status: '已付款', createdAt: '2025-05-20' },
  { id: 'ORD-20250115', product: 'Vision Pro', amount: 29999, status: '待付款', createdAt: '2025-06-01' },
  { id: 'ORD-20250116', product: 'iMac 24"', amount: 10999, status: '已完成', createdAt: '2025-06-15' },
  { id: 'ORD-20250117', product: 'Mac Studio M4 Ultra', amount: 29999, status: '已发货', createdAt: '2025-07-01' },
  { id: 'ORD-20250118', product: 'MagSafe 充电器', amount: 399, status: '已完成', createdAt: '2025-07-10' },
  { id: 'ORD-20250119', product: 'Beats Studio Pro', amount: 2499, status: '已付款', createdAt: '2025-07-22' },
  { id: 'ORD-20250120', product: 'Magic Mouse', amount: 699, status: '待付款', createdAt: '2025-08-01' }
]

const mockDashboard = {
  kpi: { revenue: 2847600, orders: 1247, users: 8532, conversion: 23.6 },
  monthly: [
    { month: '1月', revenue: 186, cost: 124, profit: 62 },
    { month: '2月', revenue: 205, cost: 131, profit: 74 },
    { month: '3月', revenue: 237, cost: 142, profit: 95 },
    { month: '4月', revenue: 218, cost: 138, profit: 80 },
    { month: '5月', revenue: 252, cost: 149, profit: 103 },
    { month: '6月', revenue: 241, cost: 145, profit: 96 },
    { month: '7月', revenue: 268, cost: 155, profit: 113 },
    { month: '8月', revenue: 289, cost: 162, profit: 127 },
    { month: '9月', revenue: 275, cost: 158, profit: 117 },
    { month: '10月', revenue: 312, cost: 171, profit: 141 },
    { month: '11月', revenue: 298, cost: 165, profit: 133 },
    { month: '12月', revenue: 335, cost: 178, profit: 157 }
  ],
  categories: [
    { name: '电子产品', value: 4200 },
    { name: '服装配饰', value: 3100 },
    { name: '食品饮料', value: 2800 },
    { name: '家居用品', value: 2200 },
    { name: '运动户外', value: 1800 },
    { name: '图书文具', value: 1100 }
  ],
  quarterly: [
    { quarter: 'Q1', online: 520, offline: 380, wholesale: 210 },
    { quarter: 'Q2', online: 610, offline: 350, wholesale: 245 },
    { quarter: 'Q3', online: 720, offline: 410, wholesale: 280 },
    { quarter: 'Q4', online: 850, offline: 460, wholesale: 320 }
  ],
  channels: {
    indicator: [
      { name: '品牌知名度', max: 100 },
      { name: '用户活跃度', max: 100 },
      { name: '转化效率', max: 100 },
      { name: '客户满意度', max: 100 },
      { name: '复购率', max: 100 }
    ],
    online: [85, 78, 72, 88, 65],
    offline: [60, 55, 68, 82, 70],
    social: [90, 82, 58, 75, 48]
  },
  gauges: { completion: 87.5, satisfaction: 92.3, growth: 34.8 }
}

export async function mockHttpRequest(config: HttpRequestConfig): Promise<unknown> {
  await delay(300 + Math.random() * 500)
  const url = new URL(config.url, 'http://localhost')

  if (url.pathname === '/api/dashboard') {
    return mockDashboard
  }

  if (url.pathname === '/api/users') {
    const keyword = (url.searchParams.get('keyword') || '').toLowerCase()
    const filtered = keyword
      ? mockUsers.filter(u => u.name.toLowerCase().includes(keyword) || u.email.toLowerCase().includes(keyword))
      : mockUsers
    return { data: filtered, total: filtered.length }
  }

  if (url.pathname === '/api/orders') {
    const status = url.searchParams.get('status') || ''
    const filtered = status
      ? mockOrders.filter(o => o.status === status)
      : mockOrders
    const withText = filtered.map(o => ({ ...o, amountText: `¥${o.amount.toLocaleString()}` }))
    return { data: withText, total: withText.length }
  }

  return { data: [], total: 0 }
}
