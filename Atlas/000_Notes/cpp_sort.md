---
type: card
created: 2026-01-25
status: draft
category: 编程技术
---
## sort基础用法

 `algorithm` 头文件下的 `sort` 函数，默认情况下为升序。使用方式为：

```cpp
sort(首地址, 尾地址的下一个地址)
```

### 两个sort的例子

```cpp
const int MAXN = 10;
int a[MAXN];
sort(a, a + n);
```

```cpp
vector<int> res;

for(int i = 0;i<n;i++){
    int tmp;
    cin >> tmp;
    res.push_back(tmp);
}

sort(&res[0],&res[n]);
```

## 自定义cmp函数的sort

```cpp
bool cmp(int a, int b) {
    return a > b;
}
sort(a, a + n, cmp);
```

