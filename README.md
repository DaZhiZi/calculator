# calculator
> 明日的程序员是未来的魔法师


## 界面
![计算器界面](../UI-screenshot/%E8%AE%A1%E7%AE%97%E5%99%A8%E6%88%AA%E5%9B%BE.PNG)

## 介绍

通过 JS 实现，交互仿 win10 计算器。

- 支持 比较运算
- 支持 算术运算

## 思路
- html
    - container
        - calculator
            - 显示框 显示运算结果
                - small number
                - big number
            - 按键
                - number 0123456789
                - else tab
                    - 比较 > <
                    - 算术 +-*/
            - delete
- js
    -  events
        - click key_number
            - start 
                - key_number lock deblock 解锁状态
                - arithmetic lock block   上锁 
            - end
        - click block
            - small_number
            - big_number clear
        - click dot
        - backspace
        - minus
 
