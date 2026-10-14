// 各所大学的队史单季纪录档案（真实数据，2026-10 采集，来源见各 source_url）。
// 键名与 main.jsx 中 universities 数组的 name 完全一致。
export const schoolRecords = {
  "杜克大学": {
    name_en: "Duke", conf: "ACC", city: "北卡罗来纳州·达勒姆",
    scoring: { pts: 941, player: "J.J. Redick", player_zh: "JJ·雷迪克", year: "2005-06", source_url: "https://goduke.com/news/2019/4/10/211799193.aspx" },
    assists: { ast: 289, player: "Bobby Hurley", player_zh: "鲍比·赫尔利", year: "1990-91", source_url: "https://www.sports-reference.com/cbb/schools/duke/men/leaders-and-records.html" }
  },
  "北卡大学": {
    name_en: "North Carolina", conf: "ACC", city: "北卡罗来纳州·教堂山",
    scoring: { pts: 897, player: "Lennie Rosenbluth", player_zh: "伦尼·罗森布鲁斯", year: "1956-57", source_url: "https://goheels.com/news/2024/12/31/mens-basketball-rosenbluth-posthumously-elected-to-collegiate-basketball-hof" },
    assists: { ast: 351, player: "Kendall Marshall", player_zh: "肯德尔·马绍尔", year: "2011-12", source_url: "https://goheels.com/sports/mens-basketball/roster/coaches/kendall-marshall/3648" }
  },
  "肯塔基大学": {
    name_en: "Kentucky", conf: "SEC", city: "肯塔基州·列克星敦",
    scoring: { pts: 948, player: "Dan Issel", player_zh: "丹·伊塞尔", year: "1969-70", source_url: "https://www.sports-reference.com/cbb/schools/kentucky/men/leaders-and-records.html" },
    assists: { ast: 246, player: "Tyler Ulis", player_zh: "泰勒·尤利斯", year: "2015-16", source_url: "https://global.nba.com/news/draft-profile-tyler-ulis/" }
  },
  "田纳西大学": {
    name_en: "Tennessee", conf: "SEC", city: "田纳西州·诺克斯维尔",
    scoring: { pts: 806, player: "Allan Houston", player_zh: "阿兰·休斯顿", year: "1990-91", source_url: "https://utsports.com/sports/mens-basketball/roster/allan-houston/8259" },
    assists: { ast: 275, player: "Zakai Zeigler", player_zh: "扎凯·齐格勒", year: "2024-25", source_url: "https://utsports.com/sports/mens-basketball/roster/vescovi-santiago/20403" }
  },
  "冈萨加大学": {
    name_en: "Gonzaga", conf: "WCC", city: "华盛顿州·斯波坎",
    scoring: { pts: 926, player: "Adam Morrison", player_zh: "亚当·莫里森", year: "2005-06", source_url: "https://gozags.com/news/2006/4/19/Morrison_To_Take_Game_To_Next_Level" },
    assists: { ast: 344, player: "Ryan Nembhard", player_zh: "瑞安·内姆哈德", year: "2024-25", source_url: "https://www.sports-reference.com/cbb/schools/gonzaga/men/leaders-and-records-season.html" }
  },
  "堪萨斯大学": {
    name_en: "Kansas", conf: "Big 12", city: "堪萨斯州·劳伦斯",
    scoring: { pts: 942, player: "Danny Manning", player_zh: "丹尼·曼宁", year: "1987-88", source_url: "https://www.sports-reference.com/cbb/schools/kansas/men/leaders-and-records-season.html" },
    assists: { ast: 282, player: "Devonte' Graham", player_zh: "德文特·格雷厄姆", year: "2017-18", source_url: "https://www.sports-reference.com/cbb/schools/kansas/men/leaders-and-records-season.html" }
  },
  "贝勒大学": {
    name_en: "Baylor", conf: "Big 12", city: "得克萨斯州·韦科",
    scoring: { pts: 712, player: "Pierre Jackson", player_zh: "皮埃尔·杰克逊", year: "2012-13", source_url: "https://www.sports-reference.com/cbb/schools/baylor/men/leaders-and-records.html" },
    assists: { ast: 284, player: "Nelson Haggerty", player_zh: "纳尔逊·哈格蒂", year: "1994-95", source_url: "https://www.sports-reference.com/cbb/schools/baylor/men/leaders-and-records.html" }
  },
  "休斯顿大学": {
    name_en: "Houston", conf: "Big 12", city: "得克萨斯州·休斯顿",
    scoring: { pts: 1214, player: "Elvin Hayes", player_zh: "埃尔文·海耶斯", year: "1967-68", source_url: "https://www.sports-reference.com/cbb/schools/houston/men/leaders-and-records-season.html" },
    assists: { ast: 309, player: "Reid Gettys", player_zh: "里德·格蒂斯", year: "1983-84", source_url: "https://www.sports-reference.com/cbb/schools/houston/men/leaders-and-records-season.html" }
  },
  "UCLA": {
    name_en: "UCLA", conf: "Big Ten", city: "加利福尼亚州·洛杉矶",
    scoring: { pts: 870, player: "Lew Alcindor (Kareem Abdul-Jabbar)", player_zh: "卢·阿尔辛多", year: "1966-67", source_url: "https://www.sports-reference.com/cbb/schools/ucla/men/leaders-and-records-season.html" },
    assists: { ast: 274, player: "Lonzo Ball", player_zh: "朗佐·鲍尔", year: "2016-17", source_url: "https://www.sports-reference.com/cbb/schools/ucla/men/leaders-and-records-season.html" }
  },
  "普渡大学": {
    name_en: "Purdue", conf: "Big Ten", city: "印第安纳州·西拉法叶",
    scoring: { pts: 1030, player: "Glenn Robinson", player_zh: "格伦·罗宾逊", year: "1993-94", source_url: "https://purduesports.com/news/2014/2/17/Robinson_to_be_Honored_at_Purdue_Michigan_State_Game" },
    assists: { ast: 345, player: "Braden Smith", player_zh: "布雷登·史密斯", year: "2025-26", source_url: "https://purduesports.com/sports/mens-basketball/roster/player/braden-smith" }
  },
  "密歇根大学": {
    name_en: "Michigan", conf: "Big Ten", city: "密歇根州·安娜堡",
    scoring: { pts: 949, player: "Glen Rice", player_zh: "格伦·莱斯", year: "1988-89", source_url: "https://mgoblue.com/news/2013/2/17/michigan_greats_return_to_crisler_center_for_dedication.aspx" },
    assists: { ast: 260, player: "Trey Burke", player_zh: "特雷·伯克", year: "2012-13", source_url: "https://mgoblue.com/news/2013/4/16/Burke_Garners_Second_Team_MVP_Award_at_End_of_Season_Banquet.aspx" }
  },
  "印第安纳大学": {
    name_en: "Indiana", conf: "Big Ten", city: "印第安纳州·布卢明顿",
    scoring: { pts: 785, player: "Calbert Cheaney", player_zh: "卡尔伯特·奇尼", year: "1992-93", source_url: "https://iuhoosiers.com/sports/mens-basketball/roster/calbert-cheaney/9878" },
    assists: { ast: 197, player: "Isiah Thomas", player_zh: "伊塞亚·托马斯", year: "1980-81", source_url: "https://iuhoosiers.com/news/2016/3/28/mens-basketball-ferrell-earns-3rd-team-nabc-all-american-honors" }
  },
  "康涅狄格大学": {
    name_en: "Connecticut", conf: "Big East", city: "康涅狄格州·斯托斯",
    scoring: { pts: 965, player: "Kemba Walker", player_zh: "肯巴·沃克", year: "2010-11", source_url: "https://uconnhuskies.com/news/2018/2/9/Walker_Joins_Drummond_in_NBA_All_Star_Game" },
    assists: { ast: 253, player: "Taliek Brown", player_zh: "塔利克·布朗", year: "2003-04", source_url: "https://en.wikipedia.org/wiki/UConn_Huskies_men%27s_basketball_statistical_leaders" }
  },
  "维拉诺瓦大学": {
    name_en: "Villanova", conf: "Big East", city: "宾夕法尼亚州·维拉诺瓦",
    scoring: { pts: 836, player: "Bob Schafer", player_zh: "鲍勃·谢弗", year: "1953-54", source_url: "https://www.sports-reference.com/cbb/schools/villanova/men/leaders-and-records-season.html" },
    assists: { ast: 238, player: "Chris Ford", player_zh: "克里斯·福特", year: "1970-71", source_url: "https://www.sports-reference.com/cbb/schools/villanova/men/leaders-and-records-season.html" }
  },
  "亚利桑那大学": {
    name_en: "Arizona", conf: "Big 12", city: "亚利桑那州·图森",
    scoring: { pts: 848, player: "Khalid Reeves", player_zh: "哈立德·里夫斯", year: "1993-94", source_url: "https://arizonawildcats.com/news/2020/6/25/mens-basketball-throwbackthursday-1993-94-pac-10-champions.aspx" },
    assists: { ast: 247, player: "Russell Brown", player_zh: "拉塞尔·布朗", year: "1978-79", source_url: "https://www.sports-reference.com/cbb/schools/arizona/men/leaders-and-records-season.html" }
  },
  "奥本大学": {
    name_en: "Auburn", conf: "SEC", city: "阿拉巴马州·奥本",
    scoring: { pts: 747, player: "Chuck Person", player_zh: "查克·珀森", year: "1984-85", source_url: "https://www.sports-reference.com/cbb/schools/auburn/men/leaders-and-records-season.html" },
    assists: { ast: 231, player: "Jared Harper", player_zh: "贾里德·哈珀", year: "2018-19", source_url: "https://www.sports-reference.com/cbb/schools/auburn/men/leaders-and-records-season.html" }
  },
};
