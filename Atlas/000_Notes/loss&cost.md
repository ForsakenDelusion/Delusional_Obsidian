---
type: card
created: 2026-01-26
status: draft
category: 学术研究
tags:
---
Loss函数就相当于模型训练的鞭子，推动着模型训练，所以有一种可能，Loss函数选的不够好，导致loss函数已经到了最低点，但是模型的训练上限还没达到就停止训练了，没有完全激发出模型的潜能。

## Loss与Cost

其差异仅是作用范围不同

Loss是针对单个样本的预测结果的误差

- 回归常用：MSE
	$\ell(\hat y, y)= (\hat y-y)^2$

- 分类常用：交叉熵
	$\ell(\hat y, y)= -\sum_{k} y_k \log(\hat y_k)$

Cost是所有样本Loss的聚合（求和/求平均）
