//默认打开网页为点击全部课程
sidebarLi[INDEX.sidebarINDEX].className="this_select";
sidebarLi[INDEX.sidebarINDEX].firstChild.setAttribute("class", "this_selectA_pre");
//修改后----每个li循环注册注册点击事件
for (var i = 0; i < sidebarLi.length; i++) {
    //记录每个侧边栏的索引
    sidebarLi[i].index=i;
    sidebarLi[i].onclick = function () {
        console.log(this.index);
        //JQ
        $(".sidebar li").removeClass("this_select").children("a").attr("class","this_selectA_nor");
        ///JS:每次点击后先清除点击样式
        for (var j = 0; j < sidebarLi.length; j++) {
            // li标签
            // sidebarLi[j].classList.remove("this_select");
            //a标签
            // sidebarLi[j].firstChild.setAttribute("class", "this_selectA_nor");
        }
        //点击后添加选中样式li和a
        this.classList.add("this_select");
        this.firstChild.setAttribute("class", "this_selectA_pre");

    //    点击sidebar后刷新作品项
        ShowItem();
    }
}

// 每个li循环注册注册点击事件
// for (var i = 0; i < sidebarLi.length; i++) {
//     sidebarLi[i].onclick = function () {
//         //每次点击后先清除点击样式
//         for (var j = 0; j < sidebarLi.length; j++) {
//             // li标签
//             sidebarLi[j].classList.remove("this_select");
//             //a标签
//             sidebarLi[j].firstChild.setAttribute("class", "this_selectA_nor");
//         }
//         //点击后添加选中样式li和a
//         this.classList.add("this_select");
//         this.firstChild.setAttribute("class", "this_selectA_pre");
//     }
// }


