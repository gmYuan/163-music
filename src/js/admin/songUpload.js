{
  let view = {
    el: '#upwrap',
    find(selector){
      return $(this.el).find(selector)[0]

    }
   
  }

  let model = {}

  let controller = {
    init(view, model){
      this.view = view
      this.model = model
      $info = this.view.find('#info'),    // 自定义属性
      
      this.initQiniu()
    },

    initQiniu(){
      var uploader = Qiniu.uploader({
        runtimes: 'html5',          // 上传模式,依次退化
        browse_button: this.view.find('#upbtn') ,    // 上传选择的点选按钮，**必需**
  
        uptoken_url: 'http://localhost:8888/uptoken',    // Ajax请求uptoken的Url
        get_new_uptoken: false,                         // 是否每次都重新获取新的uptoken
        domain: 'http://plrmljp28.bkt.clouddn.com',     //下载资源时用到
  
        container: this.view.find('#upwrap'),         // 上传区域 DOM ID
        max_file_size: '40mb',             // 最大文件体积限制
        dragdrop: true,                    // 开启可拖曳上传
        drop_element: 'upwrap',        // 拖曳上传区域元素的 ID
        auto_start: true,                // 选择文件后自动上传
  
        init: {
          'FilesAdded': function (up, files) {
            plupload.each(files, function (file) {
              // 文件添加进队列后,处理相关的事情
            });
          },
          'BeforeUpload': function (up, file) {
            // 每个文件上传前,处理相关的事情
          },
          'UploadProgress': function (up, file) {
            // 每个文件上传时,处理相关的事情
            $info.textContent = "上传状态：上传中..."
          },
          'FileUploaded': function (up, file, info) {
            // 每个文件上传成功后,处理相关的事情
            var domain = up.getOption('domain');
            var response = JSON.parse(info.response);
            var sourceLink = domain + '/' + encodeURIComponent(response.key)
  
            $info.textContent = "上传状态：上传成功!"
      
            var transdata = {
              url: sourceLink,
              name: response.key,
            }
            window.eventHub.emit("upload", transdata)

  
          },
          'Error': function (up, err, errTip) {
            //上传出错时,处理相关的事情
            $info.textContent = "上传状态：上传失败"
          },
          'UploadComplete': function () {
            //队列文件处理完毕后,处理相关的事情
          }
        }
      })
    }
  }

  controller.init(view, model)
  

}