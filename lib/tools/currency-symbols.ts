// 名称: 货币符号工具函数
// 描述: 提供全球货币符号数据和格式化函数
// 路径: seedtool/lib/tools/currency-symbols.ts
// 作者: Jensfrank
// 更新时间: 2025-07-20

// 定义Currency类型
export interface Currency {
  code: string
  name: string
  nameEn: string
  symbol: string
  country: string
  countryEn: string
  region: string
  decimals: number
  popular?: boolean
  trading?: boolean
}

// 货币地区分类
export const CURRENCY_REGIONS: Record<string, string> = {
  asia: '亚洲',
  europe: '欧洲',
  americas: '美洲',
  africa: '非洲',
  oceania: '大洋洲',
  middle_east: '中东'
}

// 全球货币数据
const CURRENCIES: Currency[] = [
  // 亚洲货币
  { code: 'CNY', name: '人民币', nameEn: 'Chinese Yuan', symbol: '¥', country: '中国', countryEn: 'China', region: 'asia', decimals: 2, popular: true, trading: true },
  { code: 'JPY', name: '日元', nameEn: 'Japanese Yen', symbol: '¥', country: '日本', countryEn: 'Japan', region: 'asia', decimals: 0, popular: true, trading: true },
  { code: 'KRW', name: '韩元', nameEn: 'South Korean Won', symbol: '₩', country: '韩国', countryEn: 'South Korea', region: 'asia', decimals: 0, popular: true },
  { code: 'HKD', name: '港元', nameEn: 'Hong Kong Dollar', symbol: 'HK$', country: '中国香港', countryEn: 'Hong Kong', region: 'asia', decimals: 2, popular: true },
  { code: 'TWD', name: '新台币', nameEn: 'New Taiwan Dollar', symbol: 'NT$', country: '中国台湾', countryEn: 'Taiwan', region: 'asia', decimals: 2 },
  { code: 'SGD', name: '新加坡元', nameEn: 'Singapore Dollar', symbol: 'S$', country: '新加坡', countryEn: 'Singapore', region: 'asia', decimals: 2, popular: true },
  { code: 'MYR', name: '马来西亚林吉特', nameEn: 'Malaysian Ringgit', symbol: 'RM', country: '马来西亚', countryEn: 'Malaysia', region: 'asia', decimals: 2 },
  { code: 'THB', name: '泰铢', nameEn: 'Thai Baht', symbol: '฿', country: '泰国', countryEn: 'Thailand', region: 'asia', decimals: 2 },
  { code: 'IDR', name: '印尼盾', nameEn: 'Indonesian Rupiah', symbol: 'Rp', country: '印度尼西亚', countryEn: 'Indonesia', region: 'asia', decimals: 2 },
  { code: 'PHP', name: '菲律宾比索', nameEn: 'Philippine Peso', symbol: '₱', country: '菲律宾', countryEn: 'Philippines', region: 'asia', decimals: 2 },
  { code: 'VND', name: '越南盾', nameEn: 'Vietnamese Dong', symbol: '₫', country: '越南', countryEn: 'Vietnam', region: 'asia', decimals: 0 },
  { code: 'INR', name: '印度卢比', nameEn: 'Indian Rupee', symbol: '₹', country: '印度', countryEn: 'India', region: 'asia', decimals: 2, popular: true },
  { code: 'PKR', name: '巴基斯坦卢比', nameEn: 'Pakistani Rupee', symbol: '₨', country: '巴基斯坦', countryEn: 'Pakistan', region: 'asia', decimals: 2 },
  { code: 'BDT', name: '孟加拉塔卡', nameEn: 'Bangladeshi Taka', symbol: '৳', country: '孟加拉国', countryEn: 'Bangladesh', region: 'asia', decimals: 2 },
  { code: 'LKR', name: '斯里兰卡卢比', nameEn: 'Sri Lankan Rupee', symbol: 'Rs', country: '斯里兰卡', countryEn: 'Sri Lanka', region: 'asia', decimals: 2 },
  { code: 'NPR', name: '尼泊尔卢比', nameEn: 'Nepalese Rupee', symbol: 'रू', country: '尼泊尔', countryEn: 'Nepal', region: 'asia', decimals: 2 },
  { code: 'MMK', name: '缅甸元', nameEn: 'Myanmar Kyat', symbol: 'K', country: '缅甸', countryEn: 'Myanmar', region: 'asia', decimals: 2 },
  { code: 'BND', name: '文莱元', nameEn: 'Brunei Dollar', symbol: 'B$', country: '文莱', countryEn: 'Brunei', region: 'asia', decimals: 2 },
  { code: 'MOP', name: '澳门元', nameEn: 'Macanese Pataca', symbol: 'MOP$', country: '中国澳门', countryEn: 'Macau', region: 'asia', decimals: 2 },
  
  // 欧洲货币
  { code: 'EUR', name: '欧元', nameEn: 'Euro', symbol: '€', country: '欧元区', countryEn: 'Eurozone', region: 'europe', decimals: 2, popular: true, trading: true },
  { code: 'GBP', name: '英镑', nameEn: 'British Pound', symbol: '£', country: '英国', countryEn: 'United Kingdom', region: 'europe', decimals: 2, popular: true, trading: true },
  { code: 'CHF', name: '瑞士法郎', nameEn: 'Swiss Franc', symbol: 'Fr', country: '瑞士', countryEn: 'Switzerland', region: 'europe', decimals: 2, popular: true, trading: true },
  { code: 'SEK', name: '瑞典克朗', nameEn: 'Swedish Krona', symbol: 'kr', country: '瑞典', countryEn: 'Sweden', region: 'europe', decimals: 2 },
  { code: 'NOK', name: '挪威克朗', nameEn: 'Norwegian Krone', symbol: 'kr', country: '挪威', countryEn: 'Norway', region: 'europe', decimals: 2 },
  { code: 'DKK', name: '丹麦克朗', nameEn: 'Danish Krone', symbol: 'kr', country: '丹麦', countryEn: 'Denmark', region: 'europe', decimals: 2 },
  { code: 'PLN', name: '波兰兹罗提', nameEn: 'Polish Zloty', symbol: 'zł', country: '波兰', countryEn: 'Poland', region: 'europe', decimals: 2 },
  { code: 'CZK', name: '捷克克朗', nameEn: 'Czech Koruna', symbol: 'Kč', country: '捷克', countryEn: 'Czech Republic', region: 'europe', decimals: 2 },
  { code: 'HUF', name: '匈牙利福林', nameEn: 'Hungarian Forint', symbol: 'Ft', country: '匈牙利', countryEn: 'Hungary', region: 'europe', decimals: 2 },
  { code: 'RON', name: '罗马尼亚列伊', nameEn: 'Romanian Leu', symbol: 'lei', country: '罗马尼亚', countryEn: 'Romania', region: 'europe', decimals: 2 },
  { code: 'BGN', name: '保加利亚列弗', nameEn: 'Bulgarian Lev', symbol: 'лв', country: '保加利亚', countryEn: 'Bulgaria', region: 'europe', decimals: 2 },
  { code: 'RUB', name: '俄罗斯卢布', nameEn: 'Russian Ruble', symbol: '₽', country: '俄罗斯', countryEn: 'Russia', region: 'europe', decimals: 2, popular: true },
  { code: 'UAH', name: '乌克兰格里夫纳', nameEn: 'Ukrainian Hryvnia', symbol: '₴', country: '乌克兰', countryEn: 'Ukraine', region: 'europe', decimals: 2 },
  { code: 'TRY', name: '土耳其里拉', nameEn: 'Turkish Lira', symbol: '₺', country: '土耳其', countryEn: 'Turkey', region: 'europe', decimals: 2 },
  { code: 'ISK', name: '冰岛克朗', nameEn: 'Icelandic Króna', symbol: 'kr', country: '冰岛', countryEn: 'Iceland', region: 'europe', decimals: 0 },
  
  // 美洲货币
  { code: 'USD', name: '美元', nameEn: 'US Dollar', symbol: '$', country: '美国', countryEn: 'United States', region: 'americas', decimals: 2, popular: true, trading: true },
  { code: 'CAD', name: '加拿大元', nameEn: 'Canadian Dollar', symbol: 'C$', country: '加拿大', countryEn: 'Canada', region: 'americas', decimals: 2, popular: true, trading: true },
  { code: 'MXN', name: '墨西哥比索', nameEn: 'Mexican Peso', symbol: '$', country: '墨西哥', countryEn: 'Mexico', region: 'americas', decimals: 2, popular: true },
  { code: 'BRL', name: '巴西雷亚尔', nameEn: 'Brazilian Real', symbol: 'R$', country: '巴西', countryEn: 'Brazil', region: 'americas', decimals: 2, popular: true },
  { code: 'ARS', name: '阿根廷比索', nameEn: 'Argentine Peso', symbol: '$', country: '阿根廷', countryEn: 'Argentina', region: 'americas', decimals: 2 },
  { code: 'CLP', name: '智利比索', nameEn: 'Chilean Peso', symbol: '$', country: '智利', countryEn: 'Chile', region: 'americas', decimals: 0 },
  { code: 'COP', name: '哥伦比亚比索', nameEn: 'Colombian Peso', symbol: '$', country: '哥伦比亚', countryEn: 'Colombia', region: 'americas', decimals: 2 },
  { code: 'PEN', name: '秘鲁索尔', nameEn: 'Peruvian Sol', symbol: 'S/', country: '秘鲁', countryEn: 'Peru', region: 'americas', decimals: 2 },
  { code: 'UYU', name: '乌拉圭比索', nameEn: 'Uruguayan Peso', symbol: '$U', country: '乌拉圭', countryEn: 'Uruguay', region: 'americas', decimals: 2 },
  { code: 'PYG', name: '巴拉圭瓜拉尼', nameEn: 'Paraguayan Guarani', symbol: '₲', country: '巴拉圭', countryEn: 'Paraguay', region: 'americas', decimals: 0 },
  { code: 'BOB', name: '玻利维亚诺', nameEn: 'Bolivian Boliviano', symbol: 'Bs', country: '玻利维亚', countryEn: 'Bolivia', region: 'americas', decimals: 2 },
  { code: 'VES', name: '委内瑞拉玻利瓦尔', nameEn: 'Venezuelan Bolívar', symbol: 'Bs', country: '委内瑞拉', countryEn: 'Venezuela', region: 'americas', decimals: 2 },
  { code: 'GTQ', name: '危地马拉格查尔', nameEn: 'Guatemalan Quetzal', symbol: 'Q', country: '危地马拉', countryEn: 'Guatemala', region: 'americas', decimals: 2 },
  { code: 'CRC', name: '哥斯达黎加科朗', nameEn: 'Costa Rican Colón', symbol: '₡', country: '哥斯达黎加', countryEn: 'Costa Rica', region: 'americas', decimals: 2 },
  { code: 'PAB', name: '巴拿马巴波亚', nameEn: 'Panamanian Balboa', symbol: 'B/', country: '巴拿马', countryEn: 'Panama', region: 'americas', decimals: 2 },
  { code: 'DOP', name: '多米尼加比索', nameEn: 'Dominican Peso', symbol: 'RD$', country: '多米尼加', countryEn: 'Dominican Republic', region: 'americas', decimals: 2 },
  { code: 'CUP', name: '古巴比索', nameEn: 'Cuban Peso', symbol: '₱', country: '古巴', countryEn: 'Cuba', region: 'americas', decimals: 2 },
  { code: 'JMD', name: '牙买加元', nameEn: 'Jamaican Dollar', symbol: 'J$', country: '牙买加', countryEn: 'Jamaica', region: 'americas', decimals: 2 },
  { code: 'TTD', name: '特立尼达和多巴哥元', nameEn: 'Trinidad and Tobago Dollar', symbol: 'TT$', country: '特立尼达和多巴哥', countryEn: 'Trinidad and Tobago', region: 'americas', decimals: 2 },
  
  // 中东货币
  { code: 'AED', name: '阿联酋迪拉姆', nameEn: 'UAE Dirham', symbol: 'د.إ', country: '阿联酋', countryEn: 'UAE', region: 'middle_east', decimals: 2, popular: true },
  { code: 'SAR', name: '沙特里亚尔', nameEn: 'Saudi Riyal', symbol: 'ر.س', country: '沙特阿拉伯', countryEn: 'Saudi Arabia', region: 'middle_east', decimals: 2, popular: true },
  { code: 'QAR', name: '卡塔尔里亚尔', nameEn: 'Qatari Riyal', symbol: 'ر.ق', country: '卡塔尔', countryEn: 'Qatar', region: 'middle_east', decimals: 2 },
  { code: 'KWD', name: '科威特第纳尔', nameEn: 'Kuwaiti Dinar', symbol: 'د.ك', country: '科威特', countryEn: 'Kuwait', region: 'middle_east', decimals: 3 },
  { code: 'BHD', name: '巴林第纳尔', nameEn: 'Bahraini Dinar', symbol: '.د.ب', country: '巴林', countryEn: 'Bahrain', region: 'middle_east', decimals: 3 },
  { code: 'OMR', name: '阿曼里亚尔', nameEn: 'Omani Rial', symbol: 'ر.ع.', country: '阿曼', countryEn: 'Oman', region: 'middle_east', decimals: 3 },
  { code: 'ILS', name: '以色列新谢克尔', nameEn: 'Israeli New Shekel', symbol: '₪', country: '以色列', countryEn: 'Israel', region: 'middle_east', decimals: 2 },
  { code: 'JOD', name: '约旦第纳尔', nameEn: 'Jordanian Dinar', symbol: 'د.ا', country: '约旦', countryEn: 'Jordan', region: 'middle_east', decimals: 3 },
  { code: 'LBP', name: '黎巴嫩镑', nameEn: 'Lebanese Pound', symbol: 'ل.ل', country: '黎巴嫩', countryEn: 'Lebanon', region: 'middle_east', decimals: 2 },
  { code: 'SYP', name: '叙利亚镑', nameEn: 'Syrian Pound', symbol: '£', country: '叙利亚', countryEn: 'Syria', region: 'middle_east', decimals: 2 },
  { code: 'IQD', name: '伊拉克第纳尔', nameEn: 'Iraqi Dinar', symbol: 'ع.د', country: '伊拉克', countryEn: 'Iraq', region: 'middle_east', decimals: 3 },
  { code: 'IRR', name: '伊朗里亚尔', nameEn: 'Iranian Rial', symbol: '﷼', country: '伊朗', countryEn: 'Iran', region: 'middle_east', decimals: 2 },
  { code: 'YER', name: '也门里亚尔', nameEn: 'Yemeni Rial', symbol: '﷼', country: '也门', countryEn: 'Yemen', region: 'middle_east', decimals: 2 },
  
  // 非洲货币
  { code: 'ZAR', name: '南非兰特', nameEn: 'South African Rand', symbol: 'R', country: '南非', countryEn: 'South Africa', region: 'africa', decimals: 2, popular: true },
  { code: 'EGP', name: '埃及镑', nameEn: 'Egyptian Pound', symbol: '£', country: '埃及', countryEn: 'Egypt', region: 'africa', decimals: 2 },
  { code: 'NGN', name: '尼日利亚奈拉', nameEn: 'Nigerian Naira', symbol: '₦', country: '尼日利亚', countryEn: 'Nigeria', region: 'africa', decimals: 2 },
  { code: 'KES', name: '肯尼亚先令', nameEn: 'Kenyan Shilling', symbol: 'KSh', country: '肯尼亚', countryEn: 'Kenya', region: 'africa', decimals: 2 },
  { code: 'GHS', name: '加纳塞地', nameEn: 'Ghanaian Cedi', symbol: '₵', country: '加纳', countryEn: 'Ghana', region: 'africa', decimals: 2 },
  { code: 'MAD', name: '摩洛哥迪拉姆', nameEn: 'Moroccan Dirham', symbol: 'د.م.', country: '摩洛哥', countryEn: 'Morocco', region: 'africa', decimals: 2 },
  { code: 'DZD', name: '阿尔及利亚第纳尔', nameEn: 'Algerian Dinar', symbol: 'د.ج', country: '阿尔及利亚', countryEn: 'Algeria', region: 'africa', decimals: 2 },
  { code: 'TND', name: '突尼斯第纳尔', nameEn: 'Tunisian Dinar', symbol: 'د.ت', country: '突尼斯', countryEn: 'Tunisia', region: 'africa', decimals: 3 },
  { code: 'ETB', name: '埃塞俄比亚比尔', nameEn: 'Ethiopian Birr', symbol: 'Br', country: '埃塞俄比亚', countryEn: 'Ethiopia', region: 'africa', decimals: 2 },
  { code: 'UGX', name: '乌干达先令', nameEn: 'Ugandan Shilling', symbol: 'USh', country: '乌干达', countryEn: 'Uganda', region: 'africa', decimals: 0 },
  { code: 'TZS', name: '坦桑尼亚先令', nameEn: 'Tanzanian Shilling', symbol: 'TSh', country: '坦桑尼亚', countryEn: 'Tanzania', region: 'africa', decimals: 2 },
  { code: 'XOF', name: '西非法郎', nameEn: 'West African CFA Franc', symbol: 'Fr', country: '西非经济货币联盟', countryEn: 'WAEMU', region: 'africa', decimals: 0 },
  { code: 'XAF', name: '中非法郎', nameEn: 'Central African CFA Franc', symbol: 'Fr', country: '中非经济货币共同体', countryEn: 'CEMAC', region: 'africa', decimals: 0 },
  
  // 大洋洲货币
  { code: 'AUD', name: '澳大利亚元', nameEn: 'Australian Dollar', symbol: 'A$', country: '澳大利亚', countryEn: 'Australia', region: 'oceania', decimals: 2, popular: true, trading: true },
  { code: 'NZD', name: '新西兰元', nameEn: 'New Zealand Dollar', symbol: 'NZ$', country: '新西兰', countryEn: 'New Zealand', region: 'oceania', decimals: 2, popular: true },
  { code: 'FJD', name: '斐济元', nameEn: 'Fijian Dollar', symbol: 'FJ$', country: '斐济', countryEn: 'Fiji', region: 'oceania', decimals: 2 },
  { code: 'PGK', name: '巴布亚新几内亚基那', nameEn: 'Papua New Guinean Kina', symbol: 'K', country: '巴布亚新几内亚', countryEn: 'Papua New Guinea', region: 'oceania', decimals: 2 },
  { code: 'WST', name: '萨摩亚塔拉', nameEn: 'Samoan Tala', symbol: 'T', country: '萨摩亚', countryEn: 'Samoa', region: 'oceania', decimals: 2 },
  { code: 'XPF', name: '太平洋法郎', nameEn: 'CFP Franc', symbol: '₣', country: '法属波利尼西亚', countryEn: 'French Polynesia', region: 'oceania', decimals: 0 }
]

/**
 * 获取货币数据
 */
export function getCurrencyData(): Currency[] {
  return CURRENCIES
}

/**
 * 格式化货币示例
 */
export function formatCurrencyExample(symbol: string, decimals: number): string {
  const amount = decimals > 0 ? '1,234.56' : '1,234'
  return `${symbol}${amount}`
}

/**
 * 按地区过滤货币
 */
export function filterByRegion(currencies: Currency[], region: string): Currency[] {
  if (region === 'all') return currencies
  return currencies.filter(c => c.region === region)
}

/**
 * 搜索货币
 */
export function searchCurrencies(currencies: Currency[], searchTerm: string): Currency[] {
  const term = searchTerm.toLowerCase()
  return currencies.filter(currency => 
    currency.code.toLowerCase().includes(term) ||
    currency.name.toLowerCase().includes(term) ||
    currency.nameEn.toLowerCase().includes(term) ||
    currency.country.toLowerCase().includes(term) ||
    currency.countryEn.toLowerCase().includes(term) ||
    currency.symbol.includes(searchTerm)
  )
}
