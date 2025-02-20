const 一上生字 = {
    识字生字 : [
        "",
        "一二三上",
        "口目耳手",
        "日田禾火",
        "虫云山",
        "水去来不",
        "小少牛果鸟",
        "早书刀尺本",
        "木林土力心",
        "中五立正",
    ],
    课文生字: [
        "了子人大",
        "月儿头里",
        "可东西",
        "天四是",
        "在后我好",
        "长比巴把",
        "下个雨们",
        "问有半从你",
        "才明同学",
        "自己门衣",
        "白的又和",
        "竹牙马用几",
        "只石出见",
        "对妈全回",
    ],
    语文园地: [
        "八十",
        "",
        "",
        "女开",
        "",
        "",
        "",
        "工厂"
    ]
};

const 一下生字 = {
    识字生字 : [
        "春冬风雪花飞入",
        "姓什么双国王方",
        "青清气晴情请生",
        "字左右红时动万",
        "间迷造运池欢网",
        "古凉细夕李语香",
        "打拍跑足声身体",
        "之相近习远玉义",
    ],
    课文生字: [
        "吃叫主江住没以",
        "多会走北京广公",
        "太阳校金秋因为",
        "他地河说也听哥",
        "单种居招呼快乐",
        "玩很当音讲行许",
        "思床前光低故乡",
        "色外看爸晚笑再",
        "午节叶米分样豆",
        "那着到高兴千成",
        "首采无树爱尖角",
        "亮机台放鱼朵美",
        "过这呀边吗吧加",
        "文平办让包伙伴",
        "钟丁元面车共坐",
        "要连百今还舌点",
        "块非常往片瓜进空",
        "病她医别干奇七星",
        "吓怕跟起家羊象都",
        "捉条向爬姐您草房"
    ]
};

const 二上生字 = {
    识字生字 : [
        "处园桥群队旗铜号领巾",
        "杨壮桐枫松柏棉杉化桂",
        "歌写丛深六熊猫九朋友",
        "季吹肥农事忙归戴辛苦",
    ],
    课文生字: [
        "找两哪宽顶眼睛肚皮跳",
        "变极傍海洋作坏给带",
        "法如已经它娃毛更知识",
        "称柱底杆秤做岁站船然",
        "画幅评奖纸报另及拿并",
        "封信支圆珠笔灯句电影",
        "哄先闭脸沉发窗沙",
        "依尽黄层照炉烟挂川直",
        "南部些巨真位每升闪狗",
        "湾名胜迹央丽展现",
        "产份坡枝客老收城市",
        "井观沿答渴喝话际",
        "脚道阵朗枯却第将难纷",
        "棵谢次想盯言呢邻治怪",
        "楼年夜披轻利",
        "扁担志伍师军战士",
        "忘泼度龙炮穿始令",
        "刘胡兰反村被关",
        "危敢惊阴似野苍茫",
        "孩于论岸屋切久散步",
        "唱赶旺旁浑候谁汽",
        "食物爷就爪神活猪",
        "折张祝扎抓吵但哭",
        "得秧苗汗急场伤路",
    ]
};

const 二下生字 = {
    识字生字 : [
        "州华岛各民族谊齐奋",
        "贴街舟艾敬转团热闹",
        "贝壳甲骨钱币与财购",
        "烧茄烤鸭肉鸡蛋炒饭",
    ],
    课文生字: [
        "诗童趁碧妆绿丝剪",
        "冲寻姑娘仔吐柳荡桃杏",
        "鲜邮递员原叔局堆认礼",
        "邓植格引注满休息",
        "锋昨冒留弯背洒温暖",
        "能桌味买具甘甜菜劳",
        "匹妹波纹像景恋舍求",
        "彩梦森拉结苹般精灵",
        "伞姨弟便教游戏母",
        "周围补充药合死记",
        "屁股净总幸婶使劲",
        "亡牢钻劝丢告筋疲",
        "图课摆座室交哈页抢嘻",
        "愿意麦该伯刻突掉",
        "湖莲穷荷绝含岭吴",
        "雷乌黑压垂户新迎扑",
        "指针帮助导永碰特积",
        "杯失洗澡容易浴桶",
        "扇慢遇兔安根痛最",
        "店决定商夫终完换期",
        "蛙卖搬倒籽泉破应",
        "整抽纺织编怎布消",
        "祖啊浓望蓝摘掏赛忆",
        "觉值类艰弓炎害此",
        "帝传忽启由理段通",
    ]
};

var 生字表 = {}

function add_to_dict(prefix, arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            生字表[arr[i][j]] = prefix + ' ' + (i + 1);
        }
    }
}

add_to_dict('《一上》识字', 一上生字.识字生字);
add_to_dict('《一上》课文', 一上生字.课文生字);
add_to_dict('《一上》语文园地', 一上生字.语文园地);

add_to_dict('《一下》识字', 一下生字.识字生字);
add_to_dict('《一下》课文', 一下生字.课文生字);

add_to_dict('《二上》识字', 二上生字.识字生字);
add_to_dict('《二上》课文', 二上生字.课文生字);

add_to_dict('《二下》识字', 二下生字.识字生字);
add_to_dict('《二下》课文', 二下生字.课文生字);

console.log('共' + Object.keys(生字表).length + ' 个字');

document.addEventListener('DOMContentLoaded', () => {
    const wordInput = document.getElementById('inputText');
    const processButton = document.getElementById('submitButton');
    const clearButton = document.getElementById('clearButton');
    const resultArea = document.getElementById('resultArea');

    const processInput = () => {
        const word = wordInput.value.trim();
        let result = [];

        resultArea.innerHTML = '';

        if (word == '') {
            alert('请输入一个字，然后点击按钮');
            return;
        }

        for (let 字 of word) {
            if (!生字表[字]) {
                result.push(`<p>❌ "${字}" 不是各册书的一类字</p>`);
            }
            else {
                result.push(`<p>✅"${字}" 是一类字，出自 "${生字表[字]}"</p>`);
            }
        }
        resultArea.innerHTML = result.join('');
    };

    processButton.addEventListener('click', processInput);
    wordInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            processInput();
        }
    });

    clearButton.addEventListener('click', () => {
        wordInput.value = '';
        resultArea.innerHTML = '';
    });
});