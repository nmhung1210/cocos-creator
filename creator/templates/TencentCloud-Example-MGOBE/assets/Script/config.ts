/**
 * 随机产生 openId
 */
const mockOpenId = (): string => {
    let str = Date.now().toString(36);

    for (let i = 0; i < 7; i++) {
        str += Math.ceil(Math.random() * (10 ** 4)).toString(36);
    }

    return str;
};

export default {
    // MGOBE 游戏信息
    gameId: "obg-bq3n2v8a",
    secretKey: "9d08a4a8f7edd8c6025e6ca63a6e9b0cd9878aeb",
    url: "bq3n2v8a.wxlagame.com",
    // 玩家 ID，建议使用真实的 openId
    openId: mockOpenId(),
    // 默认匹配 Code
    matchCode: "match-ofvr1fjj",
};