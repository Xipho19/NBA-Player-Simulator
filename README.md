# NBA 球员生涯模拟器
试玩链接：https://xipho19.github.io/NBA-Player-Simulator/

使用 React 和 Vite 构建的中文篮球生涯模拟游戏，包含九章节生涯流程、纵向老虎机抽取、阶段选择、生涯记录和最终评分。

## 本地运行

安装 Node.js 后，在项目目录执行：

```sh
npm ci
npm run dev -- --port 4173
```

打开 http://localhost:4173/ 查看 390 × 844 手机竖屏预览。
打开 http://localhost:4173/?view=game 直接进入游戏页面。

## 构建

```sh
npm run build
npm run preview -- --port 4173
```

构建产物位于 `dist/`。

## 广告接入

每段九章节生涯提供一次免费重新抽取。之后通过宿主提供的激励广告接口获取重新抽取机会：

```js
window.__draftChallengeRewardedAd = async () => {
  // 接入广告 SDK，仅在玩家完成广告并获得奖励后返回 true。
  return false;
};
```

广告接口返回 `true` 才允许重新抽取。
