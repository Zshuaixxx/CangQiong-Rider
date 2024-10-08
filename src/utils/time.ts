/**
 * 时间处理工具
 */

/**
 * 将"2024-10-07 14:10"转化为"14:10"
 */
export const getHourMinute = (timeString: string): string => {
  // 创建一个 Date 对象
  const date = new Date(timeString)

  // 提取小时和分钟
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  // 返回格式化后的时间字符串
  return `${hours}:${minutes}`
}

/**
 * 计算"2024-10-07 14:10"类型时间到当前时间的分钟差
 */
export const calculateMinutesDifference = (timeString: string): number => {
  // 创建一个 Date 对象表示特定时间
  const specificTime = new Date(timeString)

  // 获取当前时间
  const currentTime = new Date()

  // 计算时间差（毫秒）
  const timeDifferenceInMilliseconds = specificTime.getTime() - currentTime.getTime()

  // 将时间差转换为分钟
  const timeDifferenceInMinutes = timeDifferenceInMilliseconds / (1000 * 60)

  // 返回分钟差
  return Math.floor(timeDifferenceInMinutes)
}
