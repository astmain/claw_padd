
var window = floaty.window(
  <card cardCornerRadius="6" alpha="0.9">
    <vertical w="300" id="id总窗口" contentPaddingLeft="20dp">
      {/* 句柄 */}
      <linear bg="#000000">
        <button alpha="0.9" bg="#000000" id="my_handle" w="272" h="30"></button>
        <card margin="4" cardCornerRadius="100">
          <button bg="#fb512c" id="my_handle_close" textColor="#fb512c" text="true" h="20"></button>
        </card>
      </linear>
      {/* 主体 */}
      <vertical h="*" w="*">
      <button  id="my_handle" w="272" h="30"></button>
      <button  id="my_handle" w="272" h="30"></button>
      <button  id="my_handle" w="272" h="30"></button>
      <button  id="my_handle" w="272" h="30"></button>


      </vertical>
    </vertical>
  </card>
)






setInterval(() => {}, 1000)
