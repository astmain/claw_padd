"ui";
ui.layout(
    <vertical>
        <input id="输入框" w="*" />
        <frame>
            <vertical>
                <card w="330" h="200" cardCornerRadius="5dp" layout_gravity="center" cardBackgroundColor="#25b0c5">
                    <vertical marginTop="15">
                        <horizontal>
                            <text text="通知" marginLeft="15" color="#ffffff" textSize="20" />
                            <horizontal>
                                <text id="最新公告" text="最新公告" marginLeft="10" color="#ffffff" bg="#7c7c7c" />
                                <text id="使用说明" text="使用说明" marginLeft="10" color="#ffffff" bg="#7c7c7c" />
                                <text id="陪玩" text="陪玩" marginLeft="10" color="#ffffff" bg="#7c7c7c" />
                                <text id="福利" text="福利" marginLeft="10" color="#ffffff" bg="#7c7c7c" />
                            </horizontal>
                        </horizontal>
                        <text id="权限说明" text="权限说明" color="#ffffff" marginLeft="15" />
                    </vertical>
                </card>
            </vertical>
            <list id="列表">
                <text text="{{this}}" w="*" h="40" textSize="20" textStyle="bold" color="#000000" marginLeft="20" />
            </list>
        </frame>
    </vertical>
);
开关 = true
关键词 = "123\n456\n789\n457\nabcd"
ui.列表.on("item_click", function (item, i, itemView, listView) {
    开关 = false
    ui.输入框.setText(item)
    开关 = true
    ui.输入框.setSelection(item.length)
});
ui.输入框.addTextChangedListener({
    afterTextChanged: function (s) {
        if (s + "" && 开关) {
            ui.列表.setDataSource(关键词.match(new RegExp(".*" + s + ".*", "g")))
        } else {
            ui.列表.setDataSource([]);
        }
    }
})



setInterval(() => {

}, 1000);