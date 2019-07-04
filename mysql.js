var express= require('express');

var mysql  = require('mysql'); 

var querystring=require('querystring');

var app= new express();
 
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : 'password',       
  port: '3306',                   
  database: 'demo' 
}); 
 
connection.connect();

app.get('/check',function(req,res){
	
       if(req.query.id||req.query.name||req.query.sex||req.query.level||req.query.major||req.query.dorm){
		   		   
		var  sql = 'SELECT * FROM student_message WHERE ';
		
		if(req.query.id)sql=sql+'id_stu='+[req.query.id];
		
		if(req.query.name) 
			
		    if(req.query.id)sql=sql+' and name='+'\''+req.query.name+'\''; 
			
			else sql=sql+'name='+'\''+req.query.name+'\'';

        if(req.query.sex){

		
	        if(req.query.name)sql=sql+'and sex= '+'\''+req.query.sex+'\'';
	
            else sql=sql+'sex='+'\''+req.query.sex+'\'';}

         if(req.query.level){
	
	         if(req.query.name||req.query.sex)sql=sql+'and level='+'\''+req.query.level +'\'';
	
             else sql=sql+'level='+'\''+req.query.level +'\'';}      

         if(req.query.major){
	
	         if(req.query.name||req.query.sex||req.query.level)sql=sql+'and major='+'\''+req.query.major+'\'';
	
             else sql=sql+'major='+'\''+req.query.major+'\'';}

          if(req.query.dorm){
	
	          if(req.query.name||req.query.sex||req.query.level||req.query.major)sql=sql+'and dorm='+'\''+req.query.dorm+'\'';
	
             else sql=sql+'dorm='+'\''+req.query.dorm+'\'';}
			 
			 
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
	   
	   res.send('200',result);
	   
	    
});     
	 }
	   
	   else{
		
		console.log('--------------------------SELECT----------------------------');
       console.log('请输入要查询的信息');
       console.log('------------------------------------------------------------\n\n');

       res.send('200','请输入要查询的信息');	   
	}
	   
	   
});

app.post('/add',function(req,res){
	
   var data='';

req.on('data',function(chunk){


      data+=chunk; });
	  
req.on('end',function(){
	
	var post=querystring.parse(data); 
	
	if(post.id){var id=post.id;
	
	var sql='INSERT student_message VALUES ('+[id];
		
	if(post.name) sql=sql+',\''+post.name+'\''; else sql=sql+',NULL';

    if(post.sex)  sql=sql+',\''+post.sex+'\'';else sql=sql+',NULL';

    if(post.level)sql=sql+',\''+post.level+'\''; else sql=sql+',NULL';

    if(post.major)sql=sql+',\''+post.major+'\'';else sql=sql+',NULL';
	
	if(post.dorm) sql=sql+',\''+post.dorm+'\')';else sql=sql+',NULL)';     

//增
	connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
	   
	   
});
	
	connection.query('SELECT * FROM student_message',function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
	   
	   res.send('200',result);});}
	
	
	else{
		
		console.log('--------------------------SELECT----------------------------');
       console.log('请输入学生id');
       console.log('------------------------------------------------------------\n\n');

       res.send('200','请输入学生id');	   
	}
	
	  	});
});

app.post('/change',function(req,res){
	
	var data='';

req.on('data',function(chunk){


      data+=chunk; });
	  
req.on('end',function(){
	
var post=querystring.parse(data);

if(post.id){var id=post.id;

var sql='UPDATE student_message SET '  ;

if(post.name) sql=sql+'name='+'\''+post.name+'\''; 

if(post.sex){

		
	if(post.name)sql=sql+',sex='+'\''+post.sex+'\'';
	
    else sql=sql+'sex='+'\''+post.sex+'\'';}

if(post.level){
	
	if(post.name||post.sex)sql=sql+',level='+'\''+post.level +'\'';
	
    else sql=sql+'level='+'\''+post.level +'\'';}

if(post.major){
	
	if(post.name||post.sex||post.level)sql=sql+',major='+'\''+post.major+'\'';
	
    else sql=sql+'major='+'\''+post.major+'\'';}

if(post.dorm){
	
	if(post.name||post.sex||post.level||post.major)sql=sql+',dorm='+'\''+post.dorm+'\'';
	
    else sql=sql+'dorm='+'\''+post.dorm+'\'';}

     sql=sql+' WHERE id_stu='+[id];
//改


connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
	   
	   //res.send(post);
	
	
});

connection.query('SELECT * FROM student_message',function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
	   
	   res.send('200',result);});}
	   
	   
 else{
		
		console.log('--------------------------SELECT----------------------------');
       console.log('请输入学生id');
       console.log('------------------------------------------------------------\n\n');
	   
	   res.send('请输入学生id');  
}});});

app.get('/delete',function(req,res){
	
       if(req.query.id||req.query.name||req.query.sex||req.query.level||req.query.major||req.query.dorm){
		   		   
		var  sql = 'DELETE FROM student_message WHERE ';
		
		if(req.query.id)sql=sql+'id_stu='+[req.query.id];
		
		if(req.query.name) 
			
		    if(req.query.id)sql=sql+' and name='+'\''+req.query.name+'\''; 
			
			else sql=sql+'name='+'\''+req.query.name+'\'';

        if(req.query.sex){

		
	        if(req.query.name)sql=sql+'and sex= '+'\''+req.query.sex+'\'';
	
            else sql=sql+'sex='+'\''+req.query.sex+'\'';}

         if(req.query.level){
	
	         if(req.query.name||req.query.sex)sql=sql+'and level='+'\''+req.query.level +'\'';
	
             else sql=sql+'level='+'\''+req.query.level +'\'';}      

         if(req.query.major){
	
	         if(req.query.name||req.query.sex||req.query.level)sql=sql+'and major='+'\''+req.query.major+'\'';
	
             else sql=sql+'major='+'\''+req.query.major+'\'';}

          if(req.query.dorm){
	
	          if(req.query.name||req.query.sex||req.query.level||req.query.major)sql=sql+'and dorm='+'\''+req.query.dorm+'\'';
	
             else sql=sql+'dorm='+'\''+req.query.dorm+'\'';}
			 
			 
//删
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  });

connection.query('SELECT * FROM student_message',function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
	   
	   res.send('200',result);});	   
	 }
	 
	   else{
		
		console.log('--------------------------SELECT----------------------------');
       console.log('请输入你要改变的内容');
       console.log('------------------------------------------------------------\n\n');

       res.send('200','请输入你要改变的内容');	   
	}
	   
});








//connection.end();

app.listen('3000','127.0.0.1');
 

 
