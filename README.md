多页面脚手架

- 运行方式 bash
    - ./run.sh dev 开发
    - ./run.sh test 测试
    - ./run.sh product 生产

- 配置项
    - src/config/scriptConfig.js    应用配置
    - scripts/config.js             打包配置

- 多页面
    - entry/页面/main.js

- 单页面
    - 根目录main.js入口


### eslint
    默认开启eslint
    跳过eslint检查，git commit --no-verify -m "commit"