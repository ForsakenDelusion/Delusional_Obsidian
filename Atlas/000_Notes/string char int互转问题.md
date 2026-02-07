---
type: card
created: 2026-01-20
status: draft
category: 编程技术
tags:
  - Algorithm
---

## char

char转int
```cpp
char c = '7';
int x = c - '0';   // 7
```

## string

string和int互转
```cpp
int x = stoi(s);

string s = to_string(x);
```

## string和char互转

```cpp
char c = s[i];

string s(1, c);      // 推荐
string s = string() + c;
```