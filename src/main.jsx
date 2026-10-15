import React, { useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { RotateCw, Trophy, Activity, ChevronRight, Lock, Sparkles, RefreshCcw, Info } from 'lucide-react';
import './styles.css';
import './reel.css';
import './exact.css';
import './result.css';
import './choice.css';
import './mobile.css';
import './ledger.css';
import './choice-lock.css';
import './summary.css';
import './choice-actions.css';
import './modal-actions.css';
import './school-confirm.css';
import './school-modal.css';
import './home-achieve.css';
import './comic-theme.css';
import {choiceEffects, pickOutcomeIndex} from './career-effects.js';
import {schoolRecords} from './school-records.js';
import {ACHIEVEMENTS, evaluateAchievements, loadUnlocked, saveUnlocked} from './achievements.js';

const universities = [
  { name:'杜克大学', conf:'ACC', city:'北卡罗来纳州·达勒姆', rating:88, tagline:'老牌篮球豪门 · 冠军标准', note:'传统豪门。高压比赛会塑造你的关键球能力。' },
  { name:'肯塔基大学', conf:'SEC', city:'肯塔基州·列克星敦', rating:90, tagline:'篮球名校 · 冠军血统', note:'NBA 输送线。每一场比赛都有球探在看。' },
  { name:'冈萨加大学', conf:'WCC', city:'华盛顿州·斯波坎', rating:84, tagline:'成熟体系 · 稳定成长', note:'成熟体系。稳定的出场时间换来成长。' },
  { name:'堪萨斯大学', conf:'Big 12', city:'堪萨斯州·劳伦斯', rating:87, tagline:'篮球圣地 · 领袖摇篮', note:'篮球圣地。你会在喧嚣中学会领导球队。' },
  { name:'UCLA', conf:'Big Ten', city:'加利福尼亚州·洛杉矶', rating:88, tagline:'豪门底蕴 · 冠军光环', note:'聚光灯下的大学篮球，天赋与名气并存。' },
  { name:'北卡大学', conf:'ACC', city:'北卡罗来纳州·教堂山', rating:88, tagline:'传切血统 · 后卫孵化器', note:'快节奏传切。这里的控卫总有下一档进化。' },
  { name:'普渡大学', conf:'Big Ten', city:'印第安纳州·西拉法叶', rating:80, tagline:'内外兼修 · 职业摇篮', note:'成熟的内外线体系，稳定产出职业球员。' },
  { name:'康涅狄格大学', conf:'Big East', city:'康涅狄格州·斯托斯', rating:86, tagline:'冠军文化 · 铁血标准', note:'冠军标准贯穿每一天的训练。' },
  { name:'亚利桑那大学', conf:'Big 12', city:'亚利桑那州·图森', rating:83, tagline:'速度体系 · 运动天赋', note:'快速攻防转换最适合释放运动能力。' },
  { name:'休斯顿大学', conf:'Big 12', city:'得克萨斯州·休斯顿', rating:82, tagline:'强硬对抗 · 防守标签', note:'强硬防守和对抗是这里的身份。' },
  { name:'密歇根大学', conf:'Big Ten', city:'密歇根州·安娜堡', rating:82, tagline:'全面体系 · 高球商', note:'全面体系会检验你的篮球智商。' },
  { name:'田纳西大学', conf:'SEC', city:'田纳西州·诺克斯维尔', rating:81, tagline:'铁血防守 · 球探雷达', note:'高强度防守为你赢得球探注意。' },
  { name:'印第安纳大学', conf:'Big Ten', city:'印第安纳州·布卢明顿', rating:82, tagline:'传统篮球 · 放大表现', note:'传统篮球文化会放大每一次表现。' },
  { name:'维拉诺瓦大学', conf:'Big East', city:'宾夕法尼亚州·维拉诺瓦', rating:83, tagline:'后卫体系 · 决策投射', note:'后卫培养体系强调决策和投射。' },
  { name:'贝勒大学', conf:'Big 12', city:'得克萨斯州·韦科', rating:82, tagline:'对抗与空间并重', note:'身体对抗和空间进攻并重。' },
  { name:'奥本大学', conf:'SEC', city:'阿拉巴马州·奥本', rating:79, tagline:'活力体系 · 奖励大胆', note:'活力十足的体系奖励大胆的球员。' }
];

const chapters = [
  { key:'school', label:'大学项目', age:'18–21', icon:'01', title:'大学选择', desc:'转动下一章。' },
  { key:'position', label:'选择位置', age:'大学阶段', icon:'02', title:'你是谁？', desc:'选择你要成为的球员，这会决定整条生涯的数据线。' },
  { key:'draft', label:'选秀', age:'22', icon:'03', title:'选秀夜', desc:'转动选秀转盘，看看哪支球队会选择你。' },
  { key:'prime1', label:'22–24 岁', age:'22–24', icon:'04', title:'你的新秀岁月', desc:'第一份合同，第一批记录，第一场季后赛。' },
  { key:'prime2', label:'25–27 岁', age:'25–27', icon:'05', title:'成为全明星', desc:'你的名字已经进入联盟最重要的讨论。' },
  { key:'prime3', label:'28–30 岁', age:'28–30', icon:'06', title:'你的巅峰期', desc:'最好的几年，最重的期待。' },
  { key:'prime4', label:'31–33 岁', age:'31–33', icon:'07', title:'经验与领导力', desc:'比赛阅读，让你继续影响每一场比赛。' },
  { key:'prime5', label:'34–35 岁', age:'34–35', icon:'08', title:'最后一舞', desc:'把最后一章写成你自己的方式。' },
  { key:'retire', label:'退役 / 管理层', age:'退役', icon:'09', title:'退役之后', desc:'结束球员生涯，决定你与篮球的下一种关系。' }
];

const outcomes = {
  school:[['杜克大学','ACC'],['肯塔基大学','SEC'],['UCLA','Big Ten'],['堪萨斯大学','Big 12'],['冈萨加大学','WCC'],['北卡大学','ACC'],['普渡大学','Big Ten'],['康涅狄格大学','Big East'],['亚利桑那大学','Big 12'],['休斯顿大学','Big 12'],['密歇根大学','Big Ten'],['田纳西大学','SEC'],['印第安纳大学','Big Ten'],['维拉诺瓦大学','Big East'],['贝勒大学','Big 12'],['奥本大学','SEC']],
  draft:[['亚特兰大老鹰','东部'],['波士顿凯尔特人','东部'],['布鲁克林篮网','东部'],['夏洛特黄蜂','东部'],['芝加哥公牛','东部'],['克利夫兰骑士','东部'],['达拉斯独行侠','西部'],['丹佛掘金','西部'],['底特律活塞','东部'],['金州勇士','西部'],['休斯顿火箭','西部'],['印第安纳步行者','东部'],['洛杉矶快船','西部'],['洛杉矶湖人','西部'],['孟菲斯灰熊','西部'],['迈阿密热火','东部'],['密尔沃基雄鹿','东部'],['明尼苏达森林狼','西部'],['新奥尔良鹈鹕','西部'],['纽约尼克斯','东部'],['俄克拉荷马雷霆','西部'],['奥兰多魔术','东部'],['费城76人','东部'],['菲尼克斯太阳','西部'],['波特兰开拓者','西部'],['萨克拉门托国王','西部'],['圣安东尼奥马刺','西部'],['多伦多猛龙','东部'],['犹他爵士','西部'],['华盛顿奇才','东部']],
  prime1:[['最佳新秀','评分 +9'],['最佳新秀候选','评分 +4'],['新秀一阵','评分 +7'],['新秀二阵','评分 +5'],['稳定首发','评分 +6'],['稳定轮换','评分 +2'],['季后赛初体验','评分 +3'],['发展联盟历练','评分 +1'],['伤病考验','评分 -2'],['惊艳替补','评分 +4']],
  prime2:[['首次入选全明星','评分 +8'],['全明星首发','评分 +10'],['最佳第六人','评分 +5'],['最快进步球员','评分 +7'],['季后赛突破','评分 +6'],['分区决赛','评分 +8'],['闯入总决赛','评分 +8'],['最佳阵容三阵','评分 +9'],['球队重建','评分 +1'],['交易新东家','评分 +3'],['赛季报销','评分 -4']],
  prime3:[['常规赛MVP','评分 +13'],['总冠军 + FMVP','评分 +14'],['总冠军核心','评分 +11'],['最佳阵容一阵','评分 +10'],['得分王','评分 +9'],['助攻王','评分 +8'],['最佳防守球员','评分 +10'],['分区决赛惜败','评分 +4'],['首轮出局','评分 +1'],['伤病赛季','评分 -3'],['生涯最高分','评分 +7']],
  prime4:[['最佳防守阵容','评分 +6'],['老将领袖','评分 +5'],['再次入选全明星','评分 +7'],['替补核心','评分 +3'],['交易换队','评分 +3'],['伤病恢复','评分 -1'],['季后赛关键先生','评分 +6'],['冠军拼图','评分 +7'],['降薪争冠','评分 +4'],['数据下滑','评分 -2'],['焕发第二春','评分 +8']],
  prime5:[['再夺一冠','评分 +10'],['生涯之夜','评分 +7'],['告别巡演','评分 +2'],['传帮带','评分 +4'],['最后一次全明星','评分 +6'],['老将底薪争冠','评分 +3'],['回归母队','评分 +5'],['赛季中退役','评分 +1'],['季后赛绝杀','评分 +7'],['球队退役球衣承诺','评分 +8']],
  retire:[['进入名人堂','传奇 +18'],['首轮进入名人堂','传奇 +22'],['球队退役球衣','传奇 +14'],['成为主教练','传奇 +11'],['成为助理教练','传奇 +7'],['进入球队前台','传奇 +11'],['担任总经理','传奇 +15'],['成为球队老板','传奇 +20'],['篮球评论员','传奇 +6'],['国家队教练','传奇 +10']]
};

const choiceSets = {
  prime1:[['核心养成','当家核心','球队重建核心 · 无限开火权',5200,'高薪'],['争冠拼图','即战力拼图','降薪加盟季后赛强队 · 冲击首冠',3500,'争冠'],['双向历练','发展联盟练级','主动下放 · 打磨技术短板',2300,'发展']],
  prime2:[['亿元顶薪','球队门面','队史级顶薪 · 个人数据巅峰',6200,'高薪'],['降薪留强队','冠军拼图','接受降薪 · 留守争冠梯队',4300,'争冠'],['转会重建','新家老大','交易至重建队 · 独享球权',4700,'重建']],
  prime3:[['超级顶薪','个人巅峰','生涯最大合同 · 数据冲顶',7200,'高薪'],['降薪冲冠','终极追求','接受降薪 · 冲击总冠军',4800,'争冠'],['留守核心','忠诚基石','留队做核心 · 冲击队史地位',5600,'忠诚']],
  prime4:[['最后大合同','生涯最后顶薪','老将大合同 · 保持主力身份',5200,'高薪'],['底薪争冠','最后一搏','底薪加盟强队 · 冲最后一冠',3000,'争冠'],['导师传承','球员兼导师','留队带新人 · 传承比赛智慧',3600,'传承']],
  prime5:[['告别巡演','最后一舞','把最后一季交给球迷 · 谢幕巡演',2800,'谢幕'],['再夺一冠','冠军收尾','底薪拼最后一枚戒指',2000,'争冠'],['转型教练','薪火相传','提前退役 · 进入教练组',1500,'传承']],
  retire:[['退役球衣','球队传奇','球队为你举办荣誉之夜',0,'传奇'],['进入名人堂','历史地位','成为篮球历史的一部分',0,'名人'],['加入管理层','前台生涯','从球员转为球队决策者',0,'管理']]
};
let rerollCareer=()=>{};
let continueCareer=()=>{};

// Rewarded-ad integration point. The host app can provide this function and
// resolve true after a completed ad; the local build keeps the interface
// available without pretending an ad was watched.
const requestRewardedAd=async()=>{
  if(typeof window!=='undefined' && typeof window.__draftChallengeRewardedAd==='function'){
    return Boolean(await window.__draftChallengeRewardedAd());
  }
  return false;
};

function Reel({pool, spinning, result, reelStep, reelDuration}){
  const rows=Array.from({length:18},()=>pool).flat();
  return <div className={`reel-window ${spinning?'reel-running':''}`}><div className="reel-track" style={{'--reel-step':reelStep,'--reel-duration':`${reelDuration}ms`}}>{rows.map((item,i)=><div key={`${item[0]}-${i}`} className={`reel-row ${i===reelStep?'is-active':''}`}><strong>{item[0]}</strong><span>{item[1]}</span></div>)}</div><div className="reel-selection"/><div className="reel-marker left">▶</div><div className="reel-marker right">◀</div><div className="reel-fade top"/><div className="reel-fade bottom"/><div className="reel-status">{spinning?'正在抽取…':result?'中央结果已锁定':'所有结果均可能抽中'}</div></div>;
}

const outcomePoints = detail => Number((detail?.match(/[+\-]\d+/) || ['0'])[0]);
const careerPoints = history => history.reduce((sum, record) => sum + outcomePoints(record.detail) + (record.decision?.growth || 0), 0);
const maxCareerPoints = Object.values(outcomes).reduce((sum, pool) => sum + Math.max(0, ...pool.map(item => outcomePoints(item[1]))), 0);
const maxDecisionPoints = Object.values(choiceEffects).reduce((sum, choices) => sum + Math.max(...choices.map(c=>c.growth)), 0);
const finalCareerRating = score => Math.min(100, Math.max(70, Math.round(70 + score / (maxCareerPoints + maxDecisionPoints) * 30)));

function makeStageRecord(current,picked,position,score,decision){
  const stage=Math.max(0,chapters.findIndex(c=>c.key===current.key));
  const role=position==='中锋'?{p:22.4,r:10.8,a:3.1,x:'BPG'}:position==='前锋'?{p:25.2,r:7.9,a:5.2,x:'抢断'}:{p:26.8,r:5.1,a:8.4,x:'助攻'};
  const variance=()=>Number((Math.random()*4-1).toFixed(1));
  const growth=decision?.growth||0;
  role.p+=growth*.5+(decision?.focus==='scoring'?2:0);
  role.r+=growth*.2+(decision?.focus==='defense'?1.2:0);
  role.a+=growth*.2+(decision?.focus==='mentor'?1.2:0);
  if(/伤病|报销|下滑/.test(picked[0])){role.p*=.7;role.r*=.8;role.a*=.8;}
  const school=current.key==='school'?(universities.find(x=>x.name===picked[0])||universities[0]):null;
  const rating=school?school.rating:Math.min(99,Math.max(40,68+Math.round(score*.4)+stage*2));
  const value=/总冠军/.test(picked[0])&&Math.random()<0.75?`${picked[0]} · 入选全明星`:picked[0];
  return {key:current.key,label:current.label,value,detail:picked[1],rating,school,salary:stage<2?0:Math.round((2200+stage*680+Math.random()*1800)/100)*100,stats:{ppg:Math.max(5,role.p+variance()).toFixed(1),rpg:Math.max(2,role.r+variance()).toFixed(1),apg:Math.max(1,role.a+variance()).toFixed(1),fg:(45+Math.random()*12).toFixed(1)+'%',extra:Math.round(20+Math.random()*55),extraLabel:role.x}};
}

function StageModal({record,onContinue,onReroll=()=>rerollCareer(),freeRerollUsed=false,rerollMessage='',onRestart=()=>{}}){
  const [menuOpen,setMenuOpen]=useState(false);
  onContinue=()=>continueCareer();
  if(!record)return null;
  if(record.school){
    const s=record.school;
    const rec=schoolRecords[s.name]||{};
    const sc=rec.scoring, as=rec.assists;
    const stats=record.stats||{};
    const archiveRow=(kind)=>{
      const isScore=kind==='scoring';
      const data=isScore?sc:as;
      const label=isScore?'队史单季最高得分纪录（分）':'队史单季最高助攻纪录（次）';
      if(data){
        const value=isScore?data.pts:data.ast;
        const unit=isScore?'分':'次';
        return <div className="sv-archive-row"><b>{value}<i>{unit}</i></b><div className="sv-archive-label"><em>{label}</em></div><small>{data.player_zh} · {data.year}</small></div>;
      }
      return <div className="sv-archive-row is-pending"><b>—</b><div className="sv-archive-label"><em>{label}</em></div><small>纪录待核实</small></div>;
    };
    return <div className="modal-backdrop"><div className="stage-modal sv-modal">
      <div className="sv-top">
        <div className="sv-top-left"><span className="sv-badge">阶段</span><em>你的大学项目 · 01 / 09</em></div>
        <div className="sv-set-wrap">
          <button className="sv-set" onClick={()=>setMenuOpen(v=>!v)}>设置</button>
          {menuOpen&&<div className="sv-menu"><button onClick={()=>{setMenuOpen(false);onRestart();}}>重新开始生涯</button></div>}
        </div>
      </div>
      <h2 className="sv-name">{s.name}</h2>
      <div className="sv-tagrow"><span className="sv-capsule">大学项目</span></div>
      <p className="sv-subtitle">老牌大学项目</p>
      <div className="sv-meta">
        <div className="sv-meta-cell"><small>所属联盟</small><b>{s.conf}</b></div>
        <div className="sv-meta-cell"><small>主场</small><b>{s.city}</b></div>
      </div>
      <div className="sv-scout"><span>球探报告</span><p>{s.note}</p></div>
      <div className="sv-archive">
        <span className="sv-archive-title">{s.name} · 球队档案</span>
        {archiveRow('scoring')}
        {archiveRow('assists')}
      </div>
      <div className="sv-strip">
        <span>分级 {record.rating}</span><i/>
        <span>{stats.ppg} 分</span><span>{stats.rpg} 板</span><span>{stats.apg} 助</span><span>{stats.fg} 命中</span>
      </div>
      <button className="sv-reroll" onClick={onReroll}>↻ {freeRerollUsed?'观看广告后重新转动':'免费重新转动'}</button>
      <button className="modal-continue sv-continue" onClick={onContinue}>开启篮球生涯<small>下一步：选择位置</small></button>
      {rerollMessage&&<p className="reroll-message">{rerollMessage}</p>}
    </div></div>;
  }
  return <div className="modal-backdrop"><div className="stage-modal"><div className="modal-top"><span>章节结果</span><em>{record.label}</em></div><h2>{record.label}完成</h2><p>已经播出了这一阶段。以下是球员的内容。</p><div className="modal-team"><div><small>你的结果</small><strong>{record.value}</strong><span>{record.detail}</span>{record.influence&&<span className="stage-influence">上一份选择：{record.influence}</span>}</div>{record.salary>0&&<div className="modal-pay"><small>支付</small><b>{record.salary}万美金</b></div>}<div className="modal-rating"><small>分级</small><b>{record.rating}</b></div></div><div className="modal-stat-title"><span>章节属性线</span><em>最佳场均 {record.stats.ppg} 分</em></div><div className="modal-primary"><div><b>{record.stats.ppg}</b><span>场均得分</span></div><div><b>{record.stats.rpg}</b><span>场均篮板</span></div><div><b>{record.stats.apg}</b><span>场均助攻</span></div></div><div className="modal-secondary"><div><b>{record.stats.fg}</b><span>投篮命中率</span></div><div><b>{record.stats.extra}</b><span>{record.stats.extraLabel}</span></div><div><b>{Math.max(1,Number(record.stats.apg)-1).toFixed(1)}</b><span>失误</span></div></div><div className="modal-actions"><button className="modal-reroll" onClick={onReroll}><span>↻ {freeRerollUsed?'观看广告后重新转动':'免费重新转动'}</span>{!freeRerollUsed&&<small>（本生涯仅一次）</small>}</button><button className="modal-continue" onClick={onContinue}>继续职业生涯</button></div>{rerollMessage&&<p className="reroll-message">{rerollMessage}</p>}</div></div>;
}

function CareerSummary({history,score,stat,onRestart}){
  const totalSalary=history.reduce((sum,h)=>sum+Number(h.salary||0),0);
  const rating=finalCareerRating(score);
  const rank=rating>=96?'SSS':rating>=90?'SS':rating>=82?'S':rating>=75?'A':'B';
  const honors=history.filter(h=>/冠军|MVP|全明星|名人堂|退役球衣/.test(`${h.value}${h.choice||''}`)).length;
  return <div className="summary-backdrop"><section className="career-summary"><div className="summary-top"><span>选择挑战者 · NBA 生涯</span><b>生涯总结</b></div><div className="summary-hero"><div><small>你的球员</small><h2>{history.find(h=>h.key==='school')?.value||'传奇球员'}</h2><p>{history.find(h=>h.key==='draft')?.value||'NBA 球员'} · {history.find(h=>h.key==='position')?.value||'全能球员'}</p></div><div className="summary-rank"><strong>{rank}</strong><span>传奇评级</span></div></div><div className="summary-progress"><span>职业故事</span><div>{history.map((h,i)=><i key={i} className="filled"/>)}{Array.from({length:Math.max(0,9-history.length)}).map((_,i)=><i key={`e${i}`}/>)}</div><div className="summary-ages"><span>选秀</span><span>21</span><span>24</span><span>27</span><span>30</span><span>33</span><span>退役</span></div></div><div className="summary-stats"><div><b>{stat.ppg}</b><span>PPG</span></div><div><b>{stat.apg}</b><span>APG</span></div><div><b>{stat.rpg}</b><span>RPG</span></div></div><div className="summary-honors"><div><b>{honors}</b><span>荣誉</span></div><div><b>{totalSalary?totalSalary.toLocaleString():'—'}</b><span>累计收入（万）</span></div><div><b>{history.filter(h=>/全明星/.test(`${h.value}${h.choice||''}`)).length}</b><span>全明星</span></div><div><b>{history.filter(h=>/冠军/.test(`${h.value}${h.choice||''}`)).length}</b><span>冠军</span></div></div><div className="summary-timeline"><div className="timeline-title"><span>职业生涯历程</span><em>最终评分 {rating}</em></div>{history.map((h,i)=><div className="timeline-row" key={`${h.key}-${i}`}><b>{h.label}</b><span>{h.choice||h.value}{h.decision&&<small className="timeline-decision">{h.decision.description}</small>}</span><strong>{h.rating||'—'}</strong><em>{h.stats?.ppg?`场均 ${h.stats.ppg} 分`:'已完成'}</em></div>)}</div><div className="summary-footer"><span>传奇编号 · NBA-{String(rating).padStart(3,'0')}-{String(history.length).padStart(2,'0')}</span><button onClick={onRestart}>重新开始一段生涯</button></div></section></div>;
}

function HomeScreen({onStart,onAchievements}){
  return <div className="home-screen"><div className="home-glow"/><div className="home-inner">
    <div className="home-brand"><span className="home-mark">DC</span><span>DRAFT CHALLENGE</span></div>
    <h1 className="home-title">NBA 生涯模拟器</h1>
    <p className="home-sub">从大学转盘到名人堂，转动属于你的整段篮球生涯。</p>
    <button className="home-start" onClick={onStart}><Trophy size={20}/> 开始游戏</button>
    <button className="home-achieve" onClick={onAchievements}><Sparkles size={18}/> 成就</button>
    <p className="home-hint">九次抉择，决定你与冠军的距离。</p>
  </div></div>;
}

function AchievementsScreen({unlocked,onBack}){
  const set=new Set(unlocked||[]);
  const done=ACHIEVEMENTS.filter(a=>set.has(a.id)).length;
  return <div className="achieve-screen"><div className="achieve-inner">
    <div className="achieve-head"><button className="achieve-back" onClick={onBack}>← 返回</button><div><span className="achieve-kicker">成就殿堂</span><h1>生涯成就</h1><p>已解锁 {done} / {ACHIEVEMENTS.length}</p></div></div>
    <div className="achieve-grid">{ACHIEVEMENTS.map(a=>{const on=set.has(a.id);return <div key={a.id} className={`achieve-card ${on?'unlocked':'locked'}`}><div className="achieve-icon">{on?<img src={a.icon} alt={a.name}/>:<div className="achieve-icon-lock"><Lock size={22}/></div>}</div><div className="achieve-copy"><b>{a.name}</b><span className={`rarity r-${a.rarity}`}>{a.rarity}</span><small>{on?a.desc:'尚未解锁'}</small></div></div>})}</div>
  </div></div>;
}

function App(){
  const [chapter,setChapter]=useState(0), [spinning,setSpinning]=useState(false), [revealPending,setRevealPending]=useState(false), [stageReviewed,setStageReviewed]=useState(false), [result,setResult]=useState(null), [reelStep,setReelStep]=useState(outcomes.school.length*5), [reelDuration,setReelDuration]=useState(0), [stageChoice,setStageChoice]=useState(null), [stageModal,setStageModal]=useState(null), [completed,setCompleted]=useState(false), [university,setUniversity]=useState(null), [position,setPosition]=useState(null), [history,setHistory]=useState([]), [freeRerollUsed,setFreeRerollUsed]=useState(false), [rerollMessage,setRerollMessage]=useState(''), [view,setView]=useState('home'), [unlocked,setUnlocked]=useState(()=>loadUnlocked());
  const revealTimer=useRef(null);
  const rerollBusy=useRef(false);
  const current=chapters[chapter];
  const score=careerPoints(history);
  const goat=0;
  const stat=useMemo(()=>{
    const played=history.filter(h=>h.stats&&Number.isFinite(Number(h.stats.ppg)));
    const average=key=>played.length?Number((played.reduce((sum,h)=>sum+Number(h.stats[key]),0)/played.length).toFixed(1)):'—';
    const ratings=history.filter(h=>Number.isFinite(Number(h.rating)));
    const ovr=ratings.length?Math.round(ratings.reduce((sum,h)=>sum+Number(h.rating),0)/ratings.length):68;
    return {ovr,ppg:average('ppg'),rpg:average('rpg'),apg:average('apg'),games:played.length};
  },[history]);
  const spin=(isReroll=false)=>{
    if(result && isReroll!==true){rerollCareer();return;}
    if(spinning||revealPending) return; clearTimeout(revealTimer.current); setSpinning(true); setRevealPending(false); setStageReviewed(false); setResult(null); setStageChoice(null);
    const pool=outcomes[current.key]||outcomes.school;
    const previousDecision=history.find(h=>h.key===chapters[chapter-1]?.key)?.decision;
    const targetIndex=pickOutcomeIndex(pool,previousDecision);
    const finalStep=pool.length*5+targetIndex;
    const startStep=finalStep+44;
    setReelDuration(0); setReelStep(startStep); setStageModal(null);
    let tick=0;
    const advance=()=>{ const progress=tick/44; const delay=progress<.5?38:Math.round(38+220*Math.pow((progress-.5)*2,2.4)); const next=startStep-tick-1; setReelDuration(delay); setReelStep(next); tick++; if(tick<44){setTimeout(advance,delay)}else{const picked=pool[targetIndex]; if(current.key==='school'){const u=universities.find(x=>x.name===picked[0])||universities[0];setUniversity(u)} const stageScore=careerPoints(history.filter(h=>h.key!==current.key))+outcomePoints(picked[1]);const record=makeStageRecord(current,picked,position,stageScore,previousDecision);record.influence=previousDecision?.description;setResult(picked);setHistory(h=>[...h.filter(x=>x.key!==current.key),record]);setSpinning(false);setRevealPending(true);revealTimer.current=setTimeout(()=>{setRevealPending(false);setStageModal(record)},2000)}};
    setTimeout(advance,60);
  };
  const choosePosition=(p)=>{ setPosition(p); setStageReviewed(true); setResult([p,'你的比赛方式已确定']); setHistory(h=>[...h.filter(x=>x.key!=='position'),{key:'position',label:'选择位置',value:p,detail:'球员定位',rating:73,salary:0,stats:{ppg:'—',rpg:'—',apg:'—',fg:'—',extra:'—',extraLabel:'—'}}]); };
  const chooseStage=(choice)=>{ if(stageChoice)return; setStageChoice(choice); const decision=choiceEffects[current.key][choiceSets[current.key].indexOf(choice)]; setHistory(h=>h.map(x=>x.key===current.key?{...x,choice:choice[0],decision,baseSalary:x.baseSalary??x.salary,salary:choice[3]||x.salary}:x)); };
  const reselectStage=()=>{ if(!stageChoice)return; setHistory(h=>h.map(x=>x.key===current.key?{...x,choice:undefined,decision:undefined,salary:x.baseSalary??x.salary}:x)); setStageChoice(null); };
  const next=()=>{ if(chapter===8 && stageChoice){const ids=evaluateAchievements(history);setUnlocked(u=>{const m=[...new Set([...u,...ids])];saveUnlocked(m);return m});setCompleted(true);return;} if(chapter<chapters.length-1 && (!choiceSets[current.key] || stageChoice)){clearTimeout(revealTimer.current);const nextPool=outcomes[chapters[chapter+1].key]||outcomes.school;setReelDuration(0);setReelStep(nextPool.length*5);setChapter(c=>c+1);setResult(null);setStageChoice(null);setStageReviewed(false);} };
  const restart=()=>{setView('home');clearTimeout(revealTimer.current);setChapter(0);setResult(null);setRevealPending(false);setStageReviewed(false);setReelDuration(0);setReelStep(outcomes.school.length*5);setStageChoice(null);setStageModal(null);setCompleted(false);setUniversity(null);setPosition(null);setHistory([]);setFreeRerollUsed(false);setRerollMessage('')};
  rerollCareer=async()=>{
    if(rerollBusy.current||spinning||revealPending)return;
    rerollBusy.current=true;setRerollMessage('');
    try{
      const allowed=!freeRerollUsed || await requestRewardedAd();
      if(allowed){setFreeRerollUsed(true);spin(true);}
      else setRerollMessage('暂时无法观看广告，请稍后再试。');
    }catch{setRerollMessage('广告未完成，请稍后再试。');}
    finally{rerollBusy.current=false;}
  };
  continueCareer=()=>{setStageModal(null);if(choiceSets[current.key])setStageReviewed(true);else next()};
  const done=chapter===chapters.length-1 && result;
  if(view==='home') return <HomeScreen onStart={()=>setView('game')} onAchievements={()=>setView('achievements')}/>;
  if(view==='achievements') return <AchievementsScreen unlocked={unlocked} onBack={()=>setView('home')}/>;
  return <div className="app"><header className="topbar"><div className="brand"><span className="brand-mark">DC</span><span>DRAFT CHALLENGE</span></div><div className="top-context">篮球 · 生涯模拟 <span className="live-dot"/> 本地记录</div><button className="restart" onClick={restart}><RefreshCcw size={15}/> 重新开始</button></header>
    <main className="shell"><aside className="rail"><div className="rail-kicker">你的生涯</div><div className="progress-title"><b>{chapter+1}</b><span>/ 09 章节</span></div><div className="progress-track"><div style={{height:`${((chapter+1)/9)*100}%`}}/></div><div className="rail-footer"><div className="record-label">当前传奇值</div><div className="record-value">{goat+score}<span>/ 100</span></div><div className="mini-bar"><i style={{width:`${Math.min(100,goat+score)}%`}}/></div></div></aside>
    <section className="main"><div className="eyebrow">第 {String(chapter+1).padStart(2,'0')} 章 / {current.age}</div><h1>{current.title}</h1><p className="subtitle">{current.desc}</p>
      {current.key==='position'?<div className="position-grid">{['后卫','前锋','中锋'].map((p,i)=><button key={p} className={`position-card ${position===p?'chosen':''}`} onClick={()=>choosePosition(p)}><span className="pos-num">0{i+1}</span><strong>{p}</strong><small>{i===0?'持球创造 · 得分 · 助攻':i===1?'错位进攻 · 全能防守':'禁区支点 · 篮板 · 护框'}</small><ChevronRight size={18}/></button>)}</div>:<div className="wheel-card"><div className="wheel-meta"><span><Activity size={16}/> {current.key==='school'?'大学项目':'生涯转盘'}</span><span className="spin-count">{spinning?'筛选候选结果…':revealPending?'请查看中央结果':result?'结果已锁定':'等待你的选择'}</span></div><Reel pool={outcomes[current.key]||outcomes.school} spinning={spinning} result={result} reelStep={reelStep} reelDuration={reelDuration}/><button className="spin-btn" onClick={spin} disabled={spinning||revealPending}>{spinning?<><RotateCw className="spin-icon" size={19}/> 正在减速…</>:revealPending?<>结果已停下 · 即将显示详情</>:<><RotateCw size={19}/> {result?'再次转动':'转动转盘'}</>}</button></div>}
      {result&&<div className="result-panel"><div>{current.key==='school'&&university?<><span className="result-kicker">你的大学项目 · 01 / 09</span><strong>{university.name}</strong><p>{university.conf} · {university.city}</p><small className="scouting">球探报告 · {university.note}</small></>:<><span className="result-kicker">章节结果</span><strong>{result[0]}</strong><p>{result[1]}</p></>}</div></div>}
      {result&&stageReviewed&&choiceSets[current.key]&&<div className="choice-modal-backdrop"><div className="choice-panel choice-modal"><div className="choice-heading"><span className="result-kicker">职业选择</span><h2>{current.key==='prime5'?'桌面上的三条路径':current.key==='retire'?'你想如何离开比赛？':'下一段生涯，你如何选择？'}</h2><p>{stageChoice?'选择已锁定，继续职业生涯。':'选择一条路线，继续你的职业生涯。'}</p></div><div className="choice-list">{choiceSets[current.key].map((choice,i)=><button key={choice[0]} className={`choice-card ${stageChoice?.[0]===choice[0]?'selected':''}`} disabled={Boolean(stageChoice)} onClick={()=>chooseStage(choice)}><div className="choice-main"><span className="choice-tag">{choice[4]||(i===0?'精选':i===1?'新报价':'别动')}</span><strong>{choice[0]}</strong><small>{choice[1]} · {choice[2]}</small><small className="choice-effect">{choiceEffects[current.key][i].description}</small></div><div className="choice-side"><span>支付</span><b>{choice[3]?`${choice[3]}万美金`:'—'}</b><em>{stageChoice?.[0]===choice[0]?'已选择':'选择'}</em></div></button>)}</div><div className="choice-actions"><button className="reselect-btn" disabled={!stageChoice} onClick={reselectStage}>↶ 重新选择</button><button className="next-btn career-next" disabled={!stageChoice} onClick={next}>{chapter===8?'完成我的生涯':'继续职业生涯'} <ChevronRight size={17}/></button></div></div></div>}
      {completed&&<div className="career-complete"><span className="result-kicker">生涯完成</span><h2>你的 NBA 生涯已经结束</h2><p>最终传奇值 {goat+score} · {history.length} 个章节结果</p><button className="next-btn" onClick={restart}>重新开始一段生涯</button></div>}
      {result&&stageReviewed&&!choiceSets[current.key]&&<button className="next-btn standalone-next" onClick={next}>{chapter===8?'完成我的生涯':'继续职业生涯'} <ChevronRight size={17}/></button>}
      <div className="footnote"><Info size={14}/> 每次转动都会生成新的生涯路线；关闭页面后数据不会上传。</div>
    </section><aside className="stats"><div className="stats-head"><span>实时数据</span><span className="status-pill">LIVE</span></div><div className="player-card"><div className="avatar">{position?position[0]:'?'}</div><div><b>{university?.name||'你的球员'}</b><span>{position||'未选择位置'} · {current.age}</span></div></div><div className="rating"><span>综合评分</span><strong>{stat.ovr}</strong><small>OVR</small></div><div className="stat-grid"><div><b>{stat.ppg}</b><span>生涯场均得分</span></div><div><b>{stat.rpg}</b><span>生涯场均篮板</span></div><div><b>{stat.apg}</b><span>生涯场均助攻</span></div><div><b>{stat.games}</b><span>计入阶段</span></div></div><div className="history"><div className="history-title">生涯记录簿 · {history.length}/9</div><div className="career-ledger">{chapters.map(c=>{const h=history.find(x=>x.key===c.key);return <div className={`ledger-row ${h?'filled':''}`} key={c.key}><div className="ledger-copy"><span>{c.label}</span><b>{h?.choice||h?.value||'· · ·'}</b>{h&&<small>{h.value}{h.salary?` · ${h.salary}万美金`:''}</small>}</div><div className="ledger-numbers"><b>{h?.stats?.ppg||'·'}</b><b>{h?.stats?.rpg||'·'}</b><b>{h?.stats?.apg||'·'}</b></div></div>})}</div></div><div className="quote">“伟大的生涯，不是一次选择决定的，而是九次坚持。”<small>— Draft Challenger</small></div></aside></main><footer className="footer">DRAFT CHALLENGE <span>·</span> NBA 生涯模拟器 <span>·</span> v1.0</footer><StageModal record={stageModal} freeRerollUsed={freeRerollUsed} rerollMessage={rerollMessage} onRestart={restart} onContinue={()=>{setStageModal(null);setStageReviewed(true)}}/>{completed&&<CareerSummary history={history} score={score} stat={stat} onRestart={restart}/>}</div>
}
createRoot(document.getElementById('root')).render(<App/>);
