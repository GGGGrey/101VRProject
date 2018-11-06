//用于声明全局变量

//当前课程
var now;
//保存记录侧边栏和主体部分tab页的索引
var INDEX = {
    tabINDEX : "myWork",     /*tab页对应的json索引*/
    sidebarINDEX: 0,           /*侧边栏对应的索引*/
    myWorkCount:0,              /*我的作品---计数*/
    classWorkCount:0             /*班级作品---计数*/
};
//json文件---我的作品项
var countAll = 0;

//tab页
var tab = document.getElementsByClassName("tab");

//siderbar
var sidebarLi = document.getElementsByTagName("li");