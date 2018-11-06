query();
function query() {
    var queryBtn = document.getElementsByClassName('vr-search__btn');
    var tabName = ['myWork','classWork'];
    for(var i = 0; i < queryBtn.length; i++) {
        queryBtn[i].onclick = function () {
            var input = document.getElementsByClassName('vr-search__input');
            var txt = input[nowTab].value.trim();

            // 清除之前的数据
            var workContent = document.getElementsByClassName('vr-card-list');
            while(child = workContent[nowTab].childNodes[0]) {
                workContent[nowTab].removeChild(child);
            }
            var pageContent = document.getElementsByClassName('vr-page')[0];
            pageContent.innerHTML = '';
            
            // 把搜索的结果用数组存起来
            $.getJSON('http://127.0.0.1:8080/work_data.json', function(data){
                var workCount = 0,queryData = new Array(); 
                if(nowSidebar == 0 && txt != '') {
                    for(var i = 1; i < 6; i++) {
                        $.each(data[tabName[nowTab]+i],function(key,value) {
                            if(value.title.indexOf(txt) != -1) {
                                queryData[workCount++] = value;
                                if(workCount <= 8) {
                                    $(workContent[nowTab]).append(tplEngine(tpl,value));
                                }
                            }
                        });
                    }
                    GROBLE.queryData = queryData;
                    if(workCount > 0) {
                        page({
                            class:'vr-page'
                            ,nowNum: 1
                            ,pageNum: 8
                            ,allNum:Math.ceil(workCount/8)
                            ,pageKey: txt
                        });
                    }
                } else if(nowSidebar != 0 && txt != '') {
                    $.each(data[tabName[nowTab]+nowSidebar],function(key,value) {
                        if(value.title.indexOf(txt) != -1) {
                            queryData[workCount++] = value;
                            if(workCount <= 8) {
                                $(workContent[nowTab]).append(tplEngine(tpl,value));
                            }
                        }
                    });
                    GROBLE.queryData = queryData;
                    if(workCount > 0) {
                        page({
                            class:'vr-page'
                            ,nowNum: 1
                            ,pageNum: 8
                            ,allNum:Math.ceil(workCount/8)
                            ,pageKey: txt
                        });
                    }
                }
                if(workCount == 0 || txt == '') {
                    console.log('noresoure');
                    // 这里放显示无资源的图
                    document.getElementsByClassName('vr-resoure__no')[nowTab].style.display = 'block';
                }
            })
        }
    }
}