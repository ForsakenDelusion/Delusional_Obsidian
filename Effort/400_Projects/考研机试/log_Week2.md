---
type: project-file
role: log
related: "[[考研机试]]"
created: 2026-02-07
---

# log_Week2

## Week2 1/26-2/1

### Day8
- [x] 集合求交  [completion:: 2026-01-26]
- [ ] 5SumZero
	- 初见写不出来
	- 思路：暴力前两个集合的所有元素，然后暴力遍历后三个集合
```cpp
#include <iostream>
#include <vector>

using namespace std;

// 三个数相加范围在 [-300, 300]，加上偏移量使其映射到 [0, 600]
const int OFFSET = 300;
int counts[601]; 

int main() {
    int Na, Nb, Nc, Nd, Ne;
    if (!(cin >> Na >> Nb >> Nc >> Nd >> Ne)) return 0;

    vector<int> A(Na), B(Nb), C(Nc), D(Nd), E(Ne);
    for (int &x : A) cin >> x;
    for (int &x : B) cin >> x;
    for (int &x : C) cin >> x;
    for (int &x : D) cin >> x;
    for (int &x : E) cin >> x;

    // 1. 统计 A + B + C 的所有可能结果
    for (int i = 0; i < Na; ++i) {
        for (int j = 0; j < Nb; ++j) {
            for (int k = 0; k < Nc; ++k) {
                int s = A[i] + B[j] + C[k];
                counts[s + OFFSET]++;
            }
        }
    }

    long long total_count = 0;

    // 2. 匹配 -(D + E)
    for (int x = 0; x < Nd; ++x) {
        for (int y = 0; y < Ne; ++y) {
            int target = -(D[x] + E[y]);
            // 检查 target 是否在合法的和范围 [-300, 300] 内
            if (target >= -300 && target <= 300) {
                total_count += counts[target + OFFSET];
            }
        }
    }

    cout << total_count << endl;

    return 0;
}
```
- [x] 吓得我抱起了我的小鲤鱼  [completion:: 2026-01-26]
- [x] 阶乘  [completion:: 2026-01-26]
- [x] 斐波拉契数列  [completion:: 2026-01-26]
- [ ] 数塔
	主要是不知道类似树的结构是如何存储，就是数据结构不知道
	数塔虽然画出来像金字塔（树形），但它本质上是一个 **下三角矩阵**。
	
	**存储方式**： 使用简单的二维数组 `int a[N][N]` 即可。
	
	- 第 1 层有 1 个数：存放在 `a[1][1]`
	- 第 2 层有 2 个数：存放在 `a[2][1], a[2][2]`
	- 第 i 层有 i 个数：存放在 `a[i][1] ... a[i][i]`
```cpp
const int MAXN = 21;
int n;
vector<vector<int>> a(MAXN, vector<int>(MAXN));

// 计算以第i行第j列作为塔顶时到达塔底的路径最大值
int getMax(int i, int j) {
	if (i == n) { // 如果是最下面一排
		return a[n][j]; // 那么这个数塔只有一个元素a[n][j]，该元素就是最大值
	} else { // 如果不是最下面一排
		// 分别计算以左下角和右下角元素作为塔顶时的结果，较大的加上塔顶元素即为结果
		return max(getMax(i + 1, j), getMax(i + 1, j + 1)) + a[i][j];
	}
}

int main() {
	cin >> n;
	for (int i = 1; i <= n; i++) { // 输入数塔
		for (int j = 1; j <= i; j++) {
			cin >> a[i][j];
		}
	}
	cout << getMax(1, 1) << "\n"; // 以第1行第1列的元素作为塔顶时为最终结果
	return 0;
}
```
    

**递归逻辑**： 数塔问题的核心是：`max_sum(i, j) = a[i][j] + max(max_sum(i+1, j), max_sum(i+1, j+1))`。即：当前位置的值 + 下一层两个分支中较大的那个。
- [x] 回文字符串  [completion:: 2026-01-26]
	不知道怎么利用递归
	每次都要穿入递归且不变的值，可以写成全局变量
- [x] 相信「相信」的力量！  [completion:: 2026-01-26]
### Day9

重写昨天的数塔和回文字符串

- [x] 递归深度  [completion:: 2026-01-27]
```cpp
//下面过不了
int solve(int n,int cnt){
    cout << cnt <<endl;
    cnt++;
    if(n == 1 || n == 2){
        return 1;
    } else {
        return solve(n-1,cnt++) + solve(n-2,cnt++);
    }
}
//下面能过
int solve(int n,int cnt){
    cout << cnt <<endl;
    cnt++;
    if(n == 1 || n == 2){
        return 1;
    } else {
        return solve(n-1,cnt) + solve(n-2,cnt);
    }
}

// 写成这样应该也能过
return solve(n-1,cnt+1) + solve(n-2,cnt+1);
```

>**能过的版本**：先 cnt++，再把“确定的 cnt 值”传给两个递归。
>**过不了的版本**：两个solve里面都传了cnt++，可能导致cnt加两遍，并且这个顺序可能还不可靠，由于 + 两侧求值顺序不保证（可能触发未定义/不稳定行为），输出和结果不可控。

- [x] 递归调试  [completion:: 2026-01-27]
- [x] 最优装箱  [completion:: 2026-01-27]
	- 边界条件卡了一会
```cpp
 for(int i =0;i<w.size();i++){
        if(sum >= W || sum + w[i] > W){
            break;
        }
        sum += w[i];
        cnt++;
}

// 实际上if写成这样就能过
if(sum + w[i] > W){
            break;
}
```
- [x] 最大组合整数  [completion:: 2026-01-27]
	有个0的情况，会重复输出0，得弄个flag看是否除了0没其他值了
```cpp
#include<bits/stdc++.h>
#define int long long
using namespace std;
signed main(){

int bitnum = 0;
map<int,int> mp;
for(int i = 0;i<=9;i++){
    int tmp;
    cin >> tmp;
    bitnum+=tmp;
    if(tmp != 0){
        mp[i] = tmp;
    }
}
int res=0;
for(int i = 0;i<bitnum;i++){
    for(int i = 9;i>=0;i--){
        //cout<< "i is "<<i << "mp is " << mp[i] << endl;
        while(mp[i] != 0){
            cout<<i;
            mp[i]--;
        }
    }
}

return 0;
}
```
#### 二分查找
[[板子_二分查找]]
- [x] 寻找指定元素  [completion:: 2026-01-27]
- [x] 寻找指定元素III  [completion:: 2026-01-27]
- [x] 寻找指定元素IV  [completion:: 2026-01-27]
- [x] 寻找第一个1  [completion:: 2026-01-27]
写了上面几题稍微有点感觉了，感觉二分的问题是最大化查找还是最小化查找（就是最终结果落在可行范围的左端点还是右端点是由落入区间时，哪边收缩来决定的）

### Day10
- [x] 单峰序列  [completion:: 2026-01-28]
	- 思路问题，一开始不能立马将问题套进二分法做
```cpp
int solve(int *a,int n){
    int l = -1;
    int r = n;
    while(l+1<r){
        int mid = (r + l) >> 1;
        if(a[mid] < a[mid-1]){
            r = mid;
        }else{
            l = mid;
        }
    }
    return r-1;
}
```
- [x] 装水问题  [completion:: 2026-01-28]
	- 浮点数二分
	- 面积不会算，数学库不熟悉的问题
```cpp
const double EPS = 1e-6;                                     // 精度控制常量
const double PI = acos(-1.0);                                // 圆周率
// 计算当前高度 h 对应的面积比例
double f(double R, double h) {
    double alpha = 2 * acos((R - h) / R);                    // 计算水面对应的圆心角
    double L = 2 * sqrt(R * R - (R - h) * (R - h));          // 计算水面宽度（弦长）
    double S1 = alpha * R * R / 2 - L * (R - h) / 2;         // 水面下的弓形面积
    double S2 = PI * R * R / 2;                              // 半圆总面积
    return S1 / S2;                                          // 返回当前面积比例
}
```
- [x] 快速幂  [completion:: 2026-01-28]
	- 模板题[[板子_快速幂]]
- [x] 快速幂II  [completion:: 2026-01-28]
#### 双指针
- [x] 2-SUM-双指针  [completion:: 2026-01-28]
- [x] 序列合并  [completion:: 2026-01-28]
	- 不是第一次做这题了，依旧用类似归并排序的思想。

#### 晴问模拟赛

晚上依旧晴问基础赛，A和B题不算难，但是写起来也费劲，就是感觉没有一个固定的思考流程和套路

##### **A. 字母串的平均长度**

小问有一段文本，其中只包含大小写英文字母、数字、空格以及以下五种标点符号：

- 逗号 ,
- 句号 .
- 问号 ?
- 感叹号 !
- 连字符 -

他想知道这段文本中所有“字母串”的平均长度。
一个 **字母串** 是指由英文字母（a-z 和 A-Z）组成的、尽可能长的连续子串。
字母串之间会被数字、空格或上述标点符号分隔。
请计算所有字母串长度的平均值。
如果文本中不存在任何字母串，则平均长度定义为 0.0。

>这一题的输入数据可能带有空格，所以用cin的话可能会导致读入不全，最后用getline才能处理好，然后写这一题的时候思路很乱，可能是题目写的太少的关系，不能一眼看出思路
```cpp
bool isChar(char c){
    return ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'));
}

signed main(){
    string str;
    getline(std::cin, str);
    int len = str.size();
    vector<char> copy(len+2);
    copy[0] = ',';
    copy[len+1] = ',';
    int idx = 1;
    for(int i = 0;i<len;i++){
        copy[idx++] = str[i];
    }

    stack<char> st;
    vector<int> v;
    for(auto &it:copy){
        if(isChar(it) && (st.empty()||isChar(st.top()))){
            // cout << "push " << it <<endl;
            st.push(it);
        } else if(!isChar(it) && !st.empty()){
            // cout << "cur it is " << it << "st size is "<< st.size()<< endl;
            v.push_back(st.size());
            while (!st.empty()) {
                    st.pop();
                }
        }
    }

    double sum = 0;
    for(auto &it : v){
        sum+=it;
    }
    double fres = 0;
    if(v.size() != 0){
     fres=sum/v.size();
    }
    printf("%.1lf",fres);


return 0;
}
```

---
##### **B. 创建最大矩阵**

小问想要创建一个二维矩阵，矩阵的行数和列数都必须是正整数，并且需要同时满足以下限制：

- 行数不能超过 W
- 列数不能超过 H
- 矩阵中元素的总个数（行数 × 列数）不能超过 M

请问在同时满足这些限制的条件下，矩阵最多可以包含多少个元素？

>这一题其实很明显是那种有小trick的题目，用暴力便利所有可能性再用二分只能过35%左右的数据。最后ac的代码没想出来，暴力加骗分能过50%

```cpp
signed main() {
    int n,m,s;
    cin>>n>>m>>s;
    int ans=0;
    for(int i=1;i<=n;i++){
        int mm=min(s/i,m);
        ans=max(ans,mm*i);
    }
    cout<<ans;
}
```
---
##### **C. 最小代价选择序列**

给定 n 个阶段，每个阶段有 m 个选项，每个选项用一个正整数表示。
你需要从每个阶段中恰好选择一个选项，形成一个长度为 n 的序列。
设第 i 个阶段选择的选项为 a_i，则总代价定义为：
$\sum_{i=2}^{n} |a_i - a_{i-1}|$
也就是说，从第二个阶段开始，每个阶段选择的选项与前一个阶段选项的差的绝对值之和。
你的目标是找到一种选择方案，使总代价最小，并输出这个最小总代价。

>这个dp没学，dfs暴力也不会

---


### Day11
- [x] 集合求交II  [completion:: 2026-01-29]
- [x] 集合求并II  [completion:: 2026-01-29]
```cpp
 while(idx1 < n && idx2 < m){
       if(a[idx1] == b[idx2]){
           res.push_back(a[idx1]);
           idx1++;
           idx2++;
       }else if(a[idx1]<b[idx2]){
           res.push_back(a[idx1]);
            idx1++;
       } else if(a[idx1]>b[idx2]){
            res.push_back(b[idx2]);
            idx2++;
       }
    }
```

>注意上面的else if是必须写的，不写会导致，第一个if判断让idx1和idx2++之后，又回进入下面的判断语句，但是此时访问就越界了。

[[板子_归并排序]]
[[板子_快速排序]]
- [x] 归并排序  [completion:: 2026-01-29]
- [x] 快速排序  [completion:: 2026-01-29]
[[板子_前缀和]]
- [x] 前缀和  [completion:: 2026-01-29]
- [x] 区间和  [completion:: 2026-01-29]
- [x] 01对  [completion:: 2026-01-29]
- [x] 左小数  [completion:: 2026-01-29]
- [x] 最大公约数  [completion:: 2026-01-29]
[[数学_辗转相除法]]
- [x] 最小公倍数  [completion:: 2026-01-29]
依旧gcd模板题
### Day12
今天没学
### Day13
今天主攻dfs

**DFS 的金科玉律：**

1. **到了终点再输出**：只有当 `idx == n`（所有格子都填完了），才执行打印操作。
2. **中间过程只管填空**：在 `idx < n` 的时候，只负责填值和递归，不要输出。

下面有一段错误的代码示例
```cpp
void dfs(int idx,int num,int n){

    if(idx == n){
        return;
    }

    if(idx >= 0){
        tmp[idx] = num;
        for(auto&it:tmp){
        cout << it ;
     }
         cout << "\n";
    }
     // 选0
    dfs(idx+1,0,n);
    // 选1
    dfs(idx+1,1,n);
}
```

```markdown
让我们模拟一下 $n=2$ 的情况，看看你的代码实际上做了什么：

**你的逻辑是**：只要进函数，先赋值，**然后立刻打印**，然后再递归。

- **第一步**：`main` 调用 `dfs(-1, 0, 2)`。
    
- **第二步**：`dfs(-1)` 内部调用 `dfs(0, 0, 2)`。
    
    - `idx=0`，把 `tmp[0]` 设为 0。
        
    - **立刻打印**：`00` (假设 `tmp` 初始全是0)。 **<-- 错误点！这里只填了第一位，还没填第二位，你就打印了。**
        
    - 接着递归 `dfs(1, 0)`...
        
        - `idx=1`，把 `tmp[1]` 设为 0。
            
        - **立刻打印**：`00`。 **<-- 这里才是应该打印的时候，但你之前已经打印了一次错的。**
            
    - 接着递归 `dfs(1, 1)`...
        
        - `idx=1`，把 `tmp[1]` 设为 1。
        - **立刻打印**：`01`。
            

**结论**：

你的代码会在**每一次填空**的时候都打印一次，而不是等**所有空填满**了再打印。对于 $n=2$，正确输出应该只有 4 行，但你的代码会输出 6 行甚至更多，而且包含很多中间状态。
```

[[板子_DFS]]

- [x] 01串  [completion:: 2026-01-31]
- [x] 子集I  [completion:: 2026-01-31]
- [x] 子集II  [completion:: 2026-01-31]
- [x] 全排列I  [completion:: 2026-01-31]
- [x] 全排列II  [completion:: 2026-01-31]
- [x] 组合I  [completion:: 2026-01-31]
- [x] 组合II  [completion:: 2026-01-31]
- [x] 栈的操作序列  [completion:: 2026-01-31]
- [x] 二叉树的先序遍历  [completion:: 2026-01-31]
- [x] 二叉树的中序遍历  [completion:: 2026-01-31]
- [x] 二叉树的后序遍历  [completion:: 2026-01-31]

### Day14
- [x] 有限制的选数  [completion:: 2026-02-01]
- [x] 有限制的选数II  [completion:: 2026-02-01]
	- 不仅要添加sum == k的通过方案，还要进行sum > k就return的剪枝操作
```cpp
void dfs(int start){
    if( sum == k){
        res++;
        //for(int i = 0;i<path.size();i++){
        //   cout << path[i];
        //  }
        //  cout << endl;
        return;
    }else if(sum > k){
        return;
    }

    for(int i = start-1;i<n;i++){
        path.push_back(a[i]);
        sum+=a[i];
        dfs(i+1);
        sum-=a[i];
        path.pop_back();
    }

}
```

但是很遗憾，这个数据跑不过
```cpp
8 128
1 2 4 8 16 32 64 128

你的输出
27936

期望输出
27338
```

```markdown
在 `dfs` 函数的循环中：

// 错误写法
for(int i = start-1; i < n; i++) { ... }

当 `main` 函数调用 `dfs(0)` 时，`start` 为 0。循环从 `i = -1` 开始。所以改成下面
即可

for(int i = start;i<n;i++){
        path.push_back(a[i]);
        sum+=a[i];
        dfs(i);
        sum-=a[i];
        path.pop_back();
    }

```

- [x] 八皇后问题  [completion:: 2026-02-01]
	- 初见做不出来，听得题解再去写的
```cpp
// 对角的下标 (i+j):因为对角线上i+j的值始终是相等的
// 反对🦶的下标 (i-j+n):反对角线上i-j+n的值始终是相等的
// 存储皇后实际上不用开二维数组，因为每一行只能有一个皇后，所以
int q[N+10]; // +10冗余,代表q[i] = j;代表（i，j）位置上有皇后，天然的遵守了一行只能有一个皇后的原则
int col[N+10]; // 如果j列上有一个皇后，那么这一列就都不能选
int dig[2N+10];
int anti_dig[2N+10];
// 对角开2N是因为上三角和下三角，各有N（N-1）个
```

- [x] 迷宫可行路径数  [completion:: 2026-02-01]
	- 初见做不出来，听得题解再去写的
- [x] 指定步数的迷宫问题  [completion:: 2026-02-01]
- [x] 矩阵最大权值  [completion:: 2026-02-01]
[[板子_BFS]]
- [x] 数字操作  [completion:: 2026-02-01]
- [x] 互质  [completion:: 2026-02-01]
- [x] 素数判断  [completion:: 2026-02-01]




---

## Week2 总结 (1/26-2/1)

### 完成情况
| 指标 | 数值 |
|------|------|
| **计划题数** | 52 题 |
| **已完成** | **50 题** |
| **未完成** | 2 题 |
| **完成率** | **96.2%** |

### 遗留任务 (移至 Week3)
- [ ] 5SumZero (Day8)
- [ ] 数塔 (Day8)

### 本周亮点
- **Day13 爆发**: 单日完成 9 题 (DFS 专题)
- **DFS/BFS 基础**: 完成搜索算法入门
- **递归/二分/双指针**: 算法思维基础打牢

### 已掌握技能
- ✅ 递归与回溯
- ✅ 二分查找 (整数+浮点)
- ✅ 双指针
- ✅ 基础排序 (归并、快排)
- ✅ 前缀和
- ✅ GCD/LCM
- ✅ DFS 基础 (子集、排列、组合)
- ✅ BFS 入门


