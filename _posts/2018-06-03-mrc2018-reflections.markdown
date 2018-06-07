---
layout: post
title:  "MRC2018 赛后随想"
date:   2018-06-02 21:20:22
tags: nlp ai
---

上个月抱着“玩耍”的心态参加了[2018机器阅读理解技术竞赛][mrc2018]，得分很一般，
在线评估 ROUGE-L 得分比官方基准高 0.3，可以忽略不计，但也有一点值得写下来的感想。

![a persion riding a bike](img/tw1_bike.PNG)

百度为这次竞赛提供了官方基准程序 [DuReader](https://github.com/baidu/DuReader)。
我使用的电脑配置有点寒碜，内存 8G，显卡为 GFX1060 6GB，马上就遇到了瓶颈，所以必
须简化模型。[BiDAF](https://arxiv.org/abs/1611.01603) 模型，看起
来挺“合理”的，于是选择从词嵌入的方向进行简化。

### 1. 嵌入

DuReader 里词向量长度为 300，每个元素的值在训练过程中动态调整。Facebook 的 
[fastText](https://github.com/facebookresearch/fastText) 为包括中文在内的
157 种语言提供了训练好的词向量，同样也是300维。但是 fastText 中文词库跟 MRC2018 词库交集很
小，价值不大。

300 维太长，减为 150，MRC2018 词库太大，将出现次数低于 100 的全去掉。观察问题可
以发现，问题中包含的关键词在词库中词频往往较低，都会被替换成 `<UNK>`。这么处理存在问题，
所以增加了一个 `<KEYWORD>` 向量，也不理想，但总比全部采用 `<UNK>` 好一些。

除了词可以嵌入之外，对于英语，字母也可以嵌入，汉语就更多了，字、词性、
[字形](https://arxiv.org/pdf/1508.06669)等都可以考虑。
最后借助[Jieba](https://github.com/fxsjy/jieba) 做了词性的嵌入。

候选段落里的词是否在问题中出现也被当作一个维度做了嵌入。

### 2. 胡思乱想

#### 炼金术？

Ali Rahimi 在 NIPS 2017 “时间检验奖” [获奖感言](http://www.argmin.net/2017/12/05/kitchen-sinks/)中指出
当前的深度学习是炼金术。以我对深度学习的浅显认识，确实像炼金术，
也[像中医](http://www.stat.ucla.edu/~sczhu/research_blog.html#Chinese_herb_medicine)。

为什么是 300 维，而不是 299 或者 301？对于模型里每一个参数是否取得了最佳值，还是
全靠拍脑袋，美其名曰经验值？

比如用泰勒级数近似计算函数值，要求误差小于某值，那么我们可以计算出一个值 `$n_0$`。只
要项数大于 `$n_0$`，则误差必满足要求。这个过程体现出数学不可置否的强大力量。深度学习
的套路则基本上“堆砌模块、调整参数、效果不错、发论文”这样一个路子。

最可怕的是判断效果时的方法也不严格。
比如吴恩达领导的斯坦福机器学习团队的[CheXNet](https://arxiv.org/abs/1711.05225)在肺炎诊断
上号称已超过专业的影像诊断医师。Luke Oakden-Rayner [详细分析](https://lukeoakdenrayner.wordpress.com/2018/01/24/chexnet-an-in-depth-review/)了此论文。
Luke 最终的结论倒是正面的，认为深度学习似乎具备从含
有噪声的数据中提炼“知识”的泛化能力—— CheXNet 训练用的 ground truth 来自
4 位人类师傅，其有 1 位是胸椎专业，CheXNet 的表现虽不及这位师傅，但是“似乎”超过
了另位 3 位。

#### 富人游戏？资本游戏？

炼金术是富人的游戏。深度学习需要不停地试错，对运算能力需求极大，无法在黑板上
进行演示：

![teaching computing on blackboard](https://static.independent.co.uk/s3fs-public/styles/story_large/public/thumbnails/image/2018/02/26/12/ghana-2.jpg)

游戏总有玩儿腻的时候，[寒冬](https://blog.piekniewski.info/2018/05/28/ai-winter-is-well-on-its-way/)
可能真的已在路上。待到 AI 的下一个春天，回首往事，但不知大家是否还在讨论
Pooling、Dropout、Batchnorm、ADAM ……

[mrc2018]: https://mrc2018.cipsc.org.cn/



