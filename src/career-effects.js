// Each decision changes the next chapter's odds, not its guaranteed outcome.
const effect = (growth, risk, opportunity, focus, description) => ({growth, risk, opportunity, focus, description});
export const choiceEffects = {
  prime1: [
    effect(2,.65,1.2,'development','成长 +2 · 伤病风险降低 · 更易进步'),
    effect(3,1.5,1.6,'development','成长 +3 · 突破机会增加 · 伤病风险提高'),
    effect(1,.85,1.35,'scoring','成长 +1 · 得分发展 · 伤病风险略降')
  ],
  prime2: [
    effect(3,1.4,1.5,'scoring','成长 +3 · 核心得分机会增加 · 伤病风险提高'),
    effect(1,.8,2,'championship','成长 +1 · 争冠机会增加 · 伤病风险降低'),
    effect(2,.65,1.7,'development','成长 +2 · 重建成长机会增加 · 争冠机会降低')
  ],
  prime3: [
    effect(2,1.4,2,'championship','成长 +2 · 争冠机会大幅增加 · 伤病风险提高'),
    effect(1,.6,1.7,'defense','成长 +1 · 防守发展 · 争冠机会增加 · 风险降低'),
    effect(3,1.65,1.6,'scoring','成长 +3 · 个人表现机会增加 · 伤病风险较高')
  ],
  prime4: [
    effect(1,.65,1.8,'championship','成长 +1 · 老将争冠 · 伤病风险降低'),
    effect(2,.45,1.8,'mentor','成长 +2 · 导师发展 · 伤病风险大幅降低'),
    effect(3,1.8,1.65,'scoring','成长 +3 · 核心出场增加 · 衰退与伤病风险提高')
  ],
  prime5: [
    effect(1,.8,1.8,'loyalty','成长 +1 · 母队荣誉与退役球衣机会增加'),
    effect(2,1.5,1.6,'championship','成长 +2 · 名人堂机会增加 · 最后一舞风险提高'),
    effect(3,.45,2,'mentor','成长 +3 · 教练与管理层机会大幅增加')
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
