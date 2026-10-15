import title from './assets/achievements/title.png';
import rings from './assets/achievements/rings.png';
import allstar from './assets/achievements/allstar.png';
import allstar3 from './assets/achievements/allstar3.png';
import mvp from './assets/achievements/mvp.png';
import hof from './assets/achievements/hof.png';
import jersey from './assets/achievements/jersey.png';
import scorer from './assets/achievements/scorer.png';
import night from './assets/achievements/night.png';
import passer from './assets/achievements/passer.png';
import double from './assets/achievements/double.png';
import titleheart from './assets/achievements/titleheart.png';
import loyal from './assets/achievements/loyal.png';
import rich from './assets/achievements/rich.png';
import iron from './assets/achievements/iron.png';
import rebirth from './assets/achievements/rebirth.png';
import clutch from './assets/achievements/clutch.png';
import onecity from './assets/achievements/onecity.png';

const text = h => `${h.value||''}${h.choice||''}`;
const champions = h => h.filter(r => /总冠军|再夺一冠|冠军拼图/.test(text(r))).length;
const allstars = h => h.filter(r => /全明星/.test(text(r))).length;
const totalSalary = h => h.reduce((s,r)=>s+Number(r.salary||0),0);
const someStat = (h,key,fn) => h.some(r => Number.isFinite(Number(r.stats?.[key])) && fn(Number(r.stats[key])));
const anyText = (h,re) => h.some(r => re.test(text(r)));

export const ACHIEVEMENTS = [
  { id:'title',      name:'首冠',        desc:'生涯拿到过 1 次总冠军',      rarity:'稀有', icon:title,      check:h=>champions(h)>=1 },
  { id:'rings',      name:'指环王',      desc:'总冠军次数 ≥ 3',            rarity:'传说', icon:rings,      check:h=>champions(h)>=3 },
  { id:'allstar',    name:'全明星之夜',  desc:'入选全明星 ≥ 1 次',          rarity:'常见', icon:allstar,    check:h=>allstars(h)>=1 },
  { id:'allstar3',   name:'星光闪耀',    desc:'全明星次数 ≥ 3',            rarity:'传说', icon:allstar3,   check:h=>allstars(h)>=3 },
  { id:'mvp',        name:'最有价值球员', desc:'拿过常规赛 MVP',            rarity:'稀有', icon:mvp,        check:h=>anyText(h,/MVP/) },
  { id:'hof',        name:'篮球名人',    desc:'退役时进入名人堂',           rarity:'传说', icon:hof,        check:h=>anyText(h,/名人堂/) },
  { id:'jersey',     name:'球队传奇',    desc:'退役时球队退役你的球衣',     rarity:'稀有', icon:jersey,     check:h=>anyText(h,/退役球衣/) },
  { id:'scorer',     name:'得分机器',    desc:'任意单章场均 ≥ 30 分',      rarity:'稀有', icon:scorer,     check:h=>someStat(h,'ppg',v=>v>=30) },
  { id:'night',      name:'单场之夜',    desc:'抽到过生涯之夜',             rarity:'稀有', icon:night,      check:h=>anyText(h,/生涯之夜/) },
  { id:'passer',     name:'组织大师',    desc:'任意单章场均助攻 ≥ 8',      rarity:'常见', icon:passer,     check:h=>someStat(h,'apg',v=>v>=8) },
  { id:'double',     name:'两双机器',    desc:'单章得分≥20 且篮板≥10',     rarity:'常见', icon:double,     check:h=>someStat(h,'ppg',v=>v>=20)&&someStat(h,'rpg',v=>v>=10) },
  { id:'titleheart', name:'冠军之心',    desc:'≥3 个阶段选争冠路线',       rarity:'稀有', icon:titleheart, check:h=>h.filter(r=>r.decision?.focus==='championship').length>=3 },
  { id:'loyal',      name:'忠诚基石',    desc:'≥2 个阶段选留守/发展路线',  rarity:'稀有', icon:loyal,      check:h=>h.filter(r=>['loyalty','development','mentor'].includes(r.decision?.focus)).length>=2 },
  { id:'rich',       name:'吸金之王',    desc:'生涯累计收入 ≥ 3 亿',       rarity:'传说', icon:rich,       check:h=>totalSalary(h)>=30000 },
  { id:'iron',       name:'铁人体质',    desc:'整局从未抽到伤病/报销',     rarity:'传说', icon:iron,       check:h=>!anyText(h,/伤病|报销/) },
  { id:'rebirth',    name:'浴火重生',    desc:'伤病后又拿到第二春或总冠军', rarity:'传说', icon:rebirth,    check:h=>anyText(h,/伤病|报销/)&&anyText(h,/第二春|总冠军/) },
  { id:'clutch',     name:'末节之王',    desc:'抽到过季后赛绝杀',          rarity:'稀有', icon:clutch,     check:h=>anyText(h,/绝杀/) },
  { id:'onecity',    name:'一人一城',    desc:'生涯从未换队',              rarity:'稀有', icon:onecity,    check:h=>!anyText(h,/交易/)&&!h.some(r=>r.choice==='转会重建') }
];

const KEY = 'dc_achievements';
export const loadUnlocked = () => { try { return JSON.parse(localStorage.getItem(KEY)||'[]'); } catch { return []; } };
export const saveUnlocked = ids => { try { localStorage.setItem(KEY, JSON.stringify([...new Set(ids)])); } catch {} };
export const evaluateAchievements = history => ACHIEVEMENTS.filter(a => a.check(history)).map(a => a.id);
