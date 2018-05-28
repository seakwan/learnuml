# 运行
```
npm install
npm run dev
```
# 原理
### 依赖 *观察者模式*
### View依赖Model,Controller依赖View和Model
### 用户对View进行操作,View通过通知订阅者Controller,把操作的权利放到Controller中,这样就绑定了Controller和View的对应关系
### Controller接收到Model后,会对Model进行操作
### 当Model里面的数据改变后,会通知订阅者View,更新View的界面
### Controller操作Model,Model对数据进行处理,Model没有依赖View,所以不会对View进行操作,Mode和View的更新是通过观察者模式进行