---
type: card
created: 2026-02-01
status: draft
category: 算法与数据结构
---
```cpp
queue<State> q;
dist[start]=0;
q.push(start);

while(!q.empty()){
    cur=q.front(); q.pop();
    for(所有下一步){
        if(没访问){
            dist[next]=dist[cur]+1;
            q.push(next);
        }
    }
}
```
