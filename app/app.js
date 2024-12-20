const 识字生字 = [
    "处园桥群队旗铜号领巾",
    "杨壮桐枫松柏棉杉化桂",
    "歌写丛深六熊猫九朋友",
    "季吹肥农事忙归戴辛苦",
];
const 课文生字 = [
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
];

const 生字表 = {}
for (let i = 0; i < 识字生字.length; i++) {
    for (let j = 0; j < 识字生字[i].length; j++) {
        生字表[识字生字[i][j]] = '识字 ' + (i + 1);
    }
}
for (let i = 0; i < 课文生字.length; i++) {
    for (let j = 0; j < 课文生字[i].length; j++) {
        生字表[课文生字[i][j]] = '课文 ' + (i + 1);
    }
}

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
                result.push(`<p>❌ "${字}" 不是本册书的一类字</p>`);
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