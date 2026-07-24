export const navItems = ['Hakkımda', 'Projelerim', 'Tecrübeler', 'Haberler-Blog', 'İletişim'];

export const skillGroups = [
  {
    title: 'Frontend',
    items: [
      { name: 'React', icon: 'react' },
      { name: 'TypeScript', icon: 'typescript' },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Laravel', icon: 'laravel' },
      { name: 'PHP', icon: 'php' },
      { name: 'Python', icon: 'python' },
    ],
  },
  {
    title: 'Araçlar ve Yapay Zekâ',
    items: [
      { name: 'OpenAI', icon: 'openai' },
      { name: 'Claude', icon: 'claude' },
    ],
  },
]

export const experiences = [
  {
    focus: 'Ağ',
    company: 'Gönüllü Staj / Radius Bilgisayar',
    role: 'Ağ ve Sistem Destek Stajyeri',
    description:
      'Router, sunucu ve ağ altyapılarının kurulum, konfigürasyon ve sorun giderme süreçlerinde çalıştım.',
  },
  {
    focus: 'Veritabanı',
    company: 'HALKBANK',
    role: 'Veritabanı Yönetim Sistemi Stajyeri',
    description:
      'Günlük veritabanı yönetimi, bakım, performans optimizasyonu ve SQL tabanlı raporlama süreçlerinde görev aldım.',
  },
  {
    focus: 'Dijital Kanal',
    company: 'HALKBANK',
    role: 'Kurumsal Uygulama ve Dijital Kanal Geliştirme Stajyeri',
    description:
      'ATM yazılım ve donanım süreçlerine destek verdim; kullanım verilerini analiz ederek performans raporları hazırladım.',
  },
]

export const blogNewsDetail = {
  title: 'Türk Dünyası Projeleri',
  category: 'Kültür',
  date: '28 Haz 2026',
  readTime: '6 dk',
  image: '/blog-culture.png',
  summary:
    "Türk Dünyası'nın zengin kültürel mirasını ve tarihsel derinliğini detaylıca işleyen belgesel projemizin yapım süreci devam ederken, tamamlanan bölümler yayınlanarak geniş kitlelerle buluşmaya devam ediyor.",
  about:
    "Türk Dünyası Projeleri, Orta Asya'dan Balkanlar'a uzanan geniş coğrafyada Türk kültürünün izlerini sürmeyi hedefliyor. Geleneksel el sanatlarından modern teknoloji entegrasyonuna kadar birçok farklı konuyu ele alıyoruz. Belgesel serimizin yeni bölümleri, tarihi yapılar, folklorik öğeler ve günümüzdeki etkilerini derinlemesine inceliyor.",
  processText:
    "Türk Dünyası'nın zengin kültürel mirasını ve tarihsel derinliğini detaylıca işleyen belgesel projemizin yapım süreci; araştırma, saha çekimi ve hikaye kurgusunu birlikte ilerleten kapsamlı bir üretim akışıyla devam ediyor.",
  processItems: [
    {
      title: 'Araştırma ve Arşiv Tarama',
      text: 'Kapsamlı kaynak taraması ve uzman görüşleriyle içerik omurgası oluşturuluyor.',
    },
    {
      title: 'Saha Çekimleri',
      text: 'Orijinal mekanlarda yüksek kaliteli görüntüleme ve röportaj çalışmaları yapılıyor.',
    },
    {
      title: 'Post-Prodüksiyon ve Kurgu',
      text: 'Hikaye anlatımı odaklı modern kurgu teknikleriyle bölümler yayına hazırlanıyor.',
    },
  ],
  categories: ['Kültür', 'Tech News', 'Tarih', 'Program', 'Web', 'Hikaye Anlatımı', 'Dijital Arşivler'],
  relatedPosts: ['Dijital Kültür Arşivleri', 'Web ve Hikaye Anlatımı'],
}

export const projectDetailImages = Array.from({ length: 13 }, (_, index) => (
  `/project-detail/project-detail-${index + 1}.jpg`
))

export const projectDetailTags = ['React', 'Tailwind CSS', 'REST API', 'Laravel', 'MySQL', 'TypeScript']

export const projectDetailFeatures = [
  {
    icon: 'chart',
    title: 'Real-time Analytics',
    text: 'Advanced charting and live data streaming for instantaneous insight into business metrics.',
  },
  {
    icon: 'users',
    title: 'User Management',
    text: 'Comprehensive RBAC system with granular permissions and audit logging for all activities.',
  },
  {
    icon: 'cpu',
    title: 'API Integration',
    text: 'Seamlessly connect with third-party ERP and CRM systems via our extensible API layer.',
  },
  {
    icon: 'shield',
    title: 'Secure Auth',
    text: 'Multi-factor authentication and JWT-based session management for top-tier security.',
  },
]

export const relatedProjects = [
  {
    image: projectDetailImages[10],
    title: 'Personal Portfolio',
    text: 'High-performance personal portfolio built with React and Laravel.',
    tags: ['React', 'Lucene'],
    tone: 'indigo',
    icon: 'code',
  },
  {
    image: projectDetailImages[11],
    title: 'E-Commerce Platform',
    text: 'Modern UI for a complete e-commerce shopping experience.',
    tags: ['Next.js', 'TypeScript'],
    tone: 'green',
    icon: 'cart',
  },
  {
    image: projectDetailImages[12],
    title: 'Blog CMS',
    text: 'Simple CMS architecture for category, content, and media management.',
    tags: ['PHP', 'Laravel', 'Blade'],
    tone: 'blue',
    icon: 'file',
  },
]
