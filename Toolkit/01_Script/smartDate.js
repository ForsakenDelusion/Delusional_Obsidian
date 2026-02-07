module.exports = (params) => {
    // 这里设置你的“午夜分界线”
    // 比如写 4，意味着凌晨 4 点之前都算作昨天
    const thresholdHour = 4; 
    
    const moment = window.moment;
    const now = moment();
    
    // 如果当前小时数小于分界线（比如现在是凌晨1点，1 < 4）
    if (now.hour() < thresholdHour) {
        // 返回昨天的日期
        return now.subtract(1, 'days').format("YYYY-MM-DD");
    }
    
    // 否则返回正常今天日期
    return now.format("YYYY-MM-DD");
}
