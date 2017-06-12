var gulp = require('gulp'),
    connect = require('gulp-connect'),//引入包，必须
    ngrok = require('ngrok'),
    psi = require('psi');
//gulp注册一个叫做connect的任务 
gulp.task('connect', function() {
  connect.server({
    port: 80,  //端口设置为80，那么网站就是通过http://localhost/访问，如果是88，那么是http://localhost:88/，记住80是默认端口可以省略，但是其他的不行
    root: 'src',  //根目录，这里选择开发中的网站目录
    livereload: true  //src中的文件一改变，本地服务器上运行中的网页一起改变
  });
});
gulp.task('ngrok',function(){
	ngrok.connect({
		authtoken:'你的token',
		addr: 80,//此处的端口对应connect中的端口，connect的port为88，这里也是88
    	proto: 'http'},
	function (err, url) {
		console.log(err,url);//err可以不打印，url要打印啊，不然你都不知道我映射的地址在哪里
		psi(url, {
	        nokey: 'true',
	        strategy: 'mobile desktop',
	    }).then(function (data) {
	        console.log('Speed score: ' + data.ruleGroups.SPEED.score);
	        console.log('Usability score: ' + data.ruleGroups.USABILITY.score);
	    },function(err){//不能翻墙的小伙伴们，一定会运行这个function
	    	console.log(err);
	    })
	});
});
    
gulp.task('default',["connect",'ngrok']);//可以把已经注册任务名称，放入一个数组。这个不能随便写，一定要是已经注册的任务名字，否则会报错