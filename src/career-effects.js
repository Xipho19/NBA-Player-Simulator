// Each decision changes the next chapter's odds, not its guaranteed outcome.
const effect = (growth, risk, opportunity, focus, description) => ({growth, risk, opportunity, focus, description});
export const choiceEffects = {
  // 成长与薪资反相关：高薪→成长少+风险高；低薪→成长多+风险低，钱与成长不可兼得
  prime1: [
    effect(1,1.8,1.9,'scoring','成长 +1 · 球权与数据上涨 · 长期死凿伤病风险提高 · 争冠窗口关闭'),
    effect(2,0.7,2.0,'championship','成长 +2 · 季后赛历练 · 争冠机会大幅上升 · 伤病风险降低'),
    effect(3,0.5,1.8,'development','成长 +3 · 技术打磨扎实 · 转正机会增加 · 全明星窗口后延')
  ],
  prime2: [
    effect(1,1.9,1.8,'scoring','成长 +1 · 得分与荣誉上限打开 · 伤病与交易风险提高 · 争冠机会下降'),
    effect(2,0.6,2.0,'championship','成长 +2 · 争冠机会大增 · 个人数据略降 · 健康优先'),
    effect(3,1.3,1.6,'development','成长 +3 · 重建期球权充足 · 全明星窗口波动 · 战绩垫底')
  ],
  prime3: [
    effect(1,1.9,1.7,'scoring','成长 +1 · 得分王与 MVP 窗口 · 磨损与重建风险高 · 争冠机会低'),
    effect(2,0.5,2.0,'championship','成长 +2 · 总冠军与 FMVP 机会大增 · 数据与收入让步'),
    effect(3,0.8,1.8,'loyalty','成长 +3 · 队史地位与退役球衣机会 · 争冠看球队配置')
  ],
  prime4: [
    effect(1,1.8,1.6,'scoring','成长 +1 · 保持核心数据 · 磨损与交易风险高 · 争冠机会低'),
    effect(2,0.5,1.9,'championship','成长 +2 · 最后一冠机会大增 · 收入大幅让步'),
    effect(3,0.4,1.8,'mentor','成长 +3 · 传帮带 · 退役后教练/管理层机会 · 数据让位')
  ],
  prime5: [
    effect(1,1.4,1.6,'loyalty','成长 +1 · 球迷爱戴 · 球衣退役机会 · 数据下滑 · 争冠离开'),
    effect(2,0.6,2.0,'championship','成长 +2 · 名人堂与冠军收尾机会 · 收入让步'),
    effect(3,0.4,1.9,'mentor','成长 +3 · 教练与管理层路径打开 · 告别赛场')
  ],
  retire: [
    effect(1,1,1,'loyalty','传奇 +1 · 结局：球队传奇'),
    effect(3,1,1,'legacy','传奇 +3 · 结局：篮球历史名人'),
    effect(2,1,1,'mentor','传奇 +2 · 结局：球队决策者')
  ]
};

const focusPatterns = {
  development:/进步|新秀|第二春|全明星|最佳阵容/,
  scoring:/得分|最高分|生涯之夜|全明星|MVP|最佳阵容/,
  championship:/冠军|FMVP|季后赛|分区决赛|名人堂/,
  defense:/防守|领袖|传帮带|退役球衣/,
  mentor:/教练|管理|前台|总经理|传帮带|老板/,
  loyalty:/母队|退役球衣|告别|巡演/,
  legacy:/名人堂/
};

export function outcomeWeights(pool, decision){
  return pool.map(([title, detail]) => {
    if(!decision)return 1;
    let weight=1;
    if(/伤病|报销|下滑|退役$/.test(title))weight*=decision.risk;
    if(focusPatterns[decision.focus]?.test(title))weight*=decision.opportunity;
    if(decision.focus==='development' && /冠军|FMVP/.test(title))weight*=.6;
    if(decision.focus==='defense' && /冠军|FMVP/.test(title))weight*=1.4;
    if(Number((detail.match(/[+\-]\d+/)||['0'])[0])>=7)weight*=1+decision.growth*.08;
    return weight;
  });
}

export function pickOutcomeIndex(pool, decision, random=Math.random){
  const weights=outcomeWeights(pool,decision);
  let ticket=random()*weights.reduce((sum,w)=>sum+w,0);
  for(let i=0;i<weights.length;i++){ticket-=weights[i];if(ticket<0)return i;}
  return weights.length-1;
}
