
function signup(){
var identity = document.getElementById("identity").value;
if (identity=='Admin'){
    alert("You have no authority!")
}else{
    window.location.href='./school/schoolregister.html'
}

}
function signin(){
var identity = document.getElementById('identity').value;
if (identity=='Admin'){
    adminlogin()
}else{
    schoollogin()
}
}

// function submitSchedule(schoolName){
//     var startDate = document.getElementById('startDate').value;
//     var endDate = document.getElementById('endDate').value;
//     var isSpecial = document.getElementById('isSpecial').value;
//     var totalStudent = document.getElementById('totalStudent')
//     var totalCost = document.getElementById('totalCostNum')
//     if (totalStudent!=null){
//         var totalStudent =totalStudent.value;
//     }
//     else{
//         var totalStudent=0
//     }
//     if (totalCost!=null){
//         var totalCost =totalCost.value;
//     }
//     else{
//         var totalCost =0
//     }
   
    
//     $.ajax({
//         type: "POST",
//         dataType: "text",
//         url: 'http://localhost:8088/public/index.php/index/School/chooseDate',
//         data:{'schoolName':schoolName,'startDate':startDate,'endDate':endDate,'isSpecial':isSpecial,'totalStudent':totalStudent,'totalCost':totalCost},
//         success: function (data) {
//             if (data=='success'){
//                 alert('Succeed to submit the schedule');
//                 window.location.href='./schoolFrame.html?schoolName='+schoolName
//             }
//             else {
//             }
//         }
//     });
// }
function checkInterest(schoolName) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'http://localhost:8088/public/index.php/index/School/showSchedule?schoolName='+schoolName,
        success: function (data) {
            if (data==false){
                window.location.href = './schoolAddInterest.html?schoolName='+schoolName
            }
            else {
                alert("You have already add your school's interest ")
                window.location.href ="./schoolFrame.html?schoolName="+schoolName
            }
        }
    });
}

function sendEmail(schoolName,address,schoolType,message){
    $.ajax({
        type: "POST",
        dataType: "text",
        url: 'http://127.0.0.1:8090/send?schoolName='+schoolName+'&address='+address+'&schoolType='+schoolType+'&message='+message,
        success: function (data) {
            if (data){
                alert('Your submission will be sent to the admin as soon as possible!\nPlease waite to get scheduled!');
            }
            else {
            }
        }
    });
}
function goto(url,param){
    window.location.href = url+param
}
function getUrlParam(name) {
    //构造一个含有目标参数的正则表达式对象
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //匹配目标参数
    var r = window.location.search.substr(1).match(reg);
    //返回参数
    if (r != null) {
        return unescape(r[2]);

    } else {
        return null;
    }
}
 function viewInterest_show(data) {
         var str = "";//定义用于拼接的字符串
         str1 = "<th>School Name</th><th>School Type</th>";
        $("#tab").append(str1);        
         for (var i = 0; i < data.length; i++) {
            //拼接表格的行和列, 
             
             str = "<tr><td><a href='selectTable()' target='_blank'>" + data[i].schoolName + "</a></td><td>" + data[i].schoolType + "</td></tr>";
             //追加到table中
             $("#tab").append(str);         
            }
            var parent=document.getElementById("content");//找到父元素
            var child=document.getElementById("button");//找到子元素
            if (child){
                parent.removeChild(child);//从父元素中删除子元素 
            }
     }
     function showDetail_show(data) {
        var str = "";
        for (var i = 0; i < data.length; i++) {
            str = "<tr><td><input type='text' value=" + data[i].id + " id='id' readonly='true'></td><td> <input type='text' value="+ data[i].schoolName + " id='schoolName' readonly='true'></td><td><input type='text' id='schoolType' readonly='true' value=" + data[i].schoolType + "></td><td><input type='datetime-local' id='startDate'>"+"</td><td><input type='datetime-local' id='endDate'></td></tr>";
            $("#tab").append(str);         
           }
    }
     function backs(){   
        var tr= document.getElementsByTagName("tr");   
        for(var i=0;i<tr.length;i++){
           tr[i].style.backgroundColor="";   }   
        }  
        
     function selectTable(){  
        var tr=document.getElementsByTagName("tr"); 

        $('#tab').find('tr').click(function() {
            var idx = $(this).index(); 
            window.location.href ="./show_detail.html?index="+(idx-2);
        }); 

        }
        
function adminlogin() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'http://localhost:8088/public/index.php/index/Admin/adminlogin',
        data:{"email":email,"password":password},
        success: function (data) {
            if (data==false){
               alert('please enter the corrent email address with respond to password')
            }
            else {
                message = 'Welcome ' + email
                alert(message)
                window.location.href ="./admin/mainFrame.html"
            }
            
        }
    });
}
function schoolregister(){
    var schoolName = document.getElementById("schoolName").value;
    var schoolContactName = document.getElementById("schoolContactName").value;
    var schoolContactNumber = document.getElementById("schoolContactNumber").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    $.ajax({
        type: "POST",
        dataType: "json",
        url: 'http://localhost:8088/public/index.php/index/School/schoolregister',
        data:{"schoolName":schoolName,"schoolContactName":schoolContactName,'schoolContactNumber':schoolContactNumber,"email":email,"password":password},
        success: function (data) {
            if (data){
                message = "Hi "+schoolName+", welcome to Travelling Technology Bus!"
                alert(message)
                window.location.href ="./schoolFrame.html?schoolName="+schoolName
            }
            else {
                alert(schoolName+' has already signed up!')
            }
        }
    });
}
function goLogin(){
    window.location.href ="./schoollogin.html"
}
function schoollogin() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    $.ajax({
        type: "GET",
        dataType: "text",
        url: 'http://localhost:8088/public/index.php/index/School/schoolNameDup',
        data:{"email":email},
        success: function (data) {
            if (data=='true'){
                alert("Please register first!")
                window.location.href ="./school/schoolregister.html"
            }else{
                $.ajax({
                    type: "GET",
                    dataType: "text",
                    url: 'http://localhost:8088/public/index.php/index/School/schoollogin',
                    data:{"email":email,"password":password},
                    success: function (data) {
                        if (data){
                            if (data!='false'){
                                message = ' Hi ' + data.split(':"')[1].split('"}]')[0]+'!\n Welcome to Travelling Technology Bus'
                                alert(message)
                                window.location.href ="/Users/yuhandan/Documents/myUoM/S2_2021/SWEN90016/assignment2/code/node_modules/jquery/dist/school/schoolFrame.html?schoolName="+data.split(':"')[1].split('"}]')[0]
                            }else{
                                alert('Please enter the correct password!')
                            }}
                        
                    }
                });
            }
        }
    });




}
function expand(){
    var schoolType = document.getElementById("schoolType").value;
    if (schoolType=="Hosting School"){
        str = "<table id='host'><tr><td>Is Secure Parking Present</td>"+
        "<td><select id='isSecure'><option value ='Yes'>Yes</option><option value ='No'>No</option></select></td></tr>"+
        "<tr><td>Total Car Parking Spaces</td><td><input type='number' id='parkSpace'></td></tr>"+
        "<tr><td>Total Open Areas</td><td><input type='number' id='openArea'></td></tr></table>"
        $("#hosting").append(str);
        var parent=document.getElementById("visiting");//找到父元素
        var child=document.getElementById("visit");//找到子元素
        if (child){
            parent.removeChild(child);//从父元素中删除子元素 
        }
    }
    else{
        str = "<table id='visit'><tr><td>Visiting School Name</td>"+
        "<td><input type='text' id='visitSchoolName'></td></tr>"+
        "<tr><td>Nearest Host School Name</td><td><input type='text' id='nearestHostSchoolName'></td></tr>"+
        "<tr><td>Distance from Nearest Host School</td><td><input type='number' id='distance'></td></tr><table>"
        $("#visiting").append(str); 
        var parent=document.getElementById("hosting");//找到父元素
        var child=document.getElementById("host");//找到子元素
        if (child){
        
            parent.removeChild(child);//从父元素中删除子元素
        }
        
    }
}
function addInterest(){
    var schoolName = document.getElementById("schoolName").value;
    var schoolType = document.getElementById("schoolType").value;
    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var postalCode = document.getElementById("postalCode").value;
    var message = document.getElementById("message").value;
    $.ajax({
        type: "POST",
        dataType: "text",
        url: 'http://localhost:8088/public/index.php/index/School/addInterest',
        data:{"schoolName":schoolName,"address":address,'city':city,"state":state,"postalCode":postalCode,"schoolType":schoolType,"message":message},
        success: function (data) {
            if (data=='false'){
                alert(data.message)
            }else{
                
            }

        }
    });
    if (schoolType=='Hosting School'){
        var isSecure = document.getElementById("isSecure").value;
        var parkSpace = document.getElementById("parkSpace").value;
        var openArea = document.getElementById("openArea").value;
        $.ajax({
            type: "POST",
            dataType: "text",
            url: 'http://localhost:8088/public/index.php/index/School/hostSchool',
            data:{"schoolName":schoolName,"isSecure":isSecure,'parkSpace':parkSpace,"openArea":openArea},
            success: function (data) {
                if (data=='success'){
                    alert("Succeed to submit the interest!");
                    window.location.href = './schoolFrame.html?schoolName='+schoolName
                   
                }
                else {
                    alert(data.message)
                }
            }
        }); 
    }
    else{
        var visitSchoolName = document.getElementById("visitSchoolName").value;
        var nearestHostSchoolName = document.getElementById("nearestHostSchoolName").value;
        var distance = document.getElementById("distance").value;
        $.ajax({
        type: "POST",
        dataType: "text",
        url: 'http://localhost:8088/public/index.php/index/School/visitSchool',
        data:{"schoolName":schoolName,"visitSchoolName":visitSchoolName,'nearestHostSchoolName':nearestHostSchoolName,"distance":distance},
        success: function (data) {
            if (data=='success'){
                alert("Succeed to submit the interest!");
                window.location.href = './schoolFrame.html?schoolName='+schoolName
            }
            else {
                alert(data.message)
            }
        }
    }); 

}

}

function chooseSchedule(schoolName){
    alert('Welcome '+schoolName)
    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'http://localhost:8088/public/index.php/index/School/showSchedule',
        data:{"schoolName":schoolName},
        success: function (data) {
            if (data){
                for (var i = 0; i < data.length; i++) {
                    if (data[i].isSpecial != '' & data[i].isSpecial != null){
                        alert('You have already set the schedule');
                        str = "<table id='content'><tr><td>Expression of Interest Acceptance ID</td><td><input type='text' id='id' readonly='true' value="+data[i].id+"></td></tr>"+
                     "<tr><td>School Name</td><td><input id='schoolName' readonly='true' value="+data[i].schoolName+"></td></tr>"+
                     "<tr><td>School Type</td><td><input id='schoolType' readonly='true' value="+data[i].schoolType+"></td></tr></table>"
                     $("#chooseSchedule").append(str);  
                     str1 = "<tr><td>start date</td><td><input type='datetime-local' value="+data[i].startDate.split(' ')[0]+'T'+data[i].startDate.split(' ')[1]+" id='startDate'></td></tr>"
                     +"<tr><td>end date</td><td><input type='datetime-local' value="+data[i].endDate.split(' ')[0]+'T'+data[i].endDate.split(' ')[1]+" id='endDate'></td></tr>"
                    +"<tr><td>Participate in Specialized Activities</td><td><input type='text' readonly='true' value="+data[i].isSpecial+"></td></tr>"
                    $("#content").append(str1);  
                    if (data[i].isSpecial=='Yes'){
                    str1="<tr><td>Total Students Participating</td><td><input type='number' readonly='true' value="+data[i].totalStudent+"></td></tr>"+"<tr><td>Cost Per Student</td><td><input type='text' id='costPer' readonly='true' value="+"'$30'></td></tr>"+
                    "<tr><td>Total Cost</td><td><input type='number' readonly='true' value="+data[i].totalCost+"></td></tr>";
                    $("#content").append(str1);  
                    }
                                    
                    }
                    else{
                     str = "<table id='content'><tr><td>Expression of Interest Acceptance ID</td><td><input type='text' id='id' readonly='true' value="+data[i].id+"></td></tr>"+
                     "<tr><td>School Name</td><td><input id='schoolName' readonly='true' value="+data[i].schoolName+"></td></tr>"+
                     "<tr><td>School Type</td><td><input id='schoolType' readonly='true' value="+data[i].schoolType+"></td></tr></table>"
                     $("#chooseSchedule").append(str);  
                     if (data[i].startDate != null & data[i].endDate != null){
                         
                        str1 = "<tr><td>start date</td><td><input type='datetime-local' value="+data[i].startDate.split(' ')[0]+'T'+data[i].startDate.split(' ')[1]+" id='startDate'></td></tr>"
                     +"<tr><td>end date</td><td><input type='datetime-local' value="+data[i].endDate.split(' ')[0]+'T'+data[i].endDate.split(' ')[1]+" id='endDate'></td></tr>"
                    +"<tr><td>Participate in Specialized Activities</td><td><select id='isSpecial' onchange='isSpecial()'><option value ='Yes'>Yes</option><option value ='No'>No</option></select></td></tr>" 
                    $("#content").append(str1);  
                    str1="<table id='specialContent'><tr><td>Total Students Participating</td><td><input type='number' id='totalStudent' oninput='compute()'></td></tr>"+"<tr><td>Cost Per Student</td><td><input type='text' id='costPer' readonly='true' value="+"'$30'></td></tr></table>";
                $("#chooseSchedule").append(str1);
                    
                    }
                     else{
                        alert('There are still no schedule information. \nPlease waite the admin to allocate reasonable schedule for you!')
                     }
                    
                    }
            }}
            else {
                alert('There is no any interest. Please enter interests')
                window.location.href = './schoolAddInterest.html?schoolName='+schoolName
            }
        }
    }); 
}
function compute(){
    var parent=document.getElementById("chooseSchedule");
    var child = document.getElementById("totalCost")
    if (child){
        parent.removeChild(child);
    }
    var totolStudent = document.getElementById('totalStudent').value;
    var cost = 30*totolStudent
    str = "<table id='totalCost' ><tr><td>Total Cost</td><td><input type='text' id='totalCostNum' readonly='true' value="+cost+"></td></tr></table>"
    $("#chooseSchedule").append(str);
}
function isSpecial(){
    var isSpecial = document.getElementById('isSpecial').value;
            if (isSpecial == 'Yes'){
                str1="<table id='specialContent'><tr><td>Total Students Participating</td><td><input type='number' id='totalStudent' oninput='compute()'></td></tr>"+"<tr><td>Cost Per Student</td><td><input type='text' id='costPer' readonly='true' value="+"'$30'></td></tr></table>";
                $("#chooseSchedule").append(str1);
            }
            else{
                var parent=document.getElementById("chooseSchedule");
                var child=document.getElementById("specialContent");
                if (child){
                    parent.removeChild(child);
        }
          
            }
            
}
function checkCancel(schoolName){
    $.ajax({
        type: "POST",
        dataType: "text",
        url: 'http://localhost:8088/public/index.php/index/School/isScheduled',
        data:{'schoolName':schoolName},
        success: function (data) {
            if (data=='true'){
                alert("The schedule has not been scheduled, you cannot canceled it!");
                
            }
            else{
     
                    var r=confirm("Do you want to cancel the interest?")
                   
                    if (r==true)
                        {
                    
                    cancel(schoolName)
                        }
                   
                    
            }
        }
    }); 
}
function cancel(schoolName){

    $.ajax({
        type: "POST",
        dataType: "text",
        url: 'http://localhost:8088/public/index.php/index/School/cancelInterest',
        data:{'schoolName':schoolName},
        success: function (data) {
            if (data=='success'){
                alert("Succeed to cancel the interest!");
                window.location.href ='./schoolFrame.html?schoolName='+schoolName
            }
            else {
                alert('There is no any scheduled visit!')
            }
        }
    }); 
}


function viewInterest(){
    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'http://localhost:8088/public/index.php/index/Admin/viewInterest',
        success: function (data) {
            
            if (data){
                viewInterest_show(data);
                selectTable();
                // window.location.href ="./view_interest.html"
            }
            else {
                alert('There is no any school interest!')
            }
        }
    });
}
function showDetail(index){
    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'http://localhost:8088/public/index.php/index/Admin/showDetail',
        data:{"index":index},
        success: function (data) {
            if (data){
                showDetail_show(data);
            }
            else {
                alert(data.message)
            }
        }
    });
}

function setSchedule(index){
    var id = document.getElementById("id").value;
    var schoolName = document.getElementById("schoolName").value;
    var schoolType = document.getElementById("schoolType").value;
    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;
    var bDate=new Date(startDate);
    var begin=bDate.getFullYear()+'-'+(bDate.getMonth()+1+'-'+bDate.getDate());
    var eDate=new Date(endDate);
    var end=eDate.getFullYear()+'-'+(eDate.getMonth()+1+'-'+eDate.getDate());
    var bArr = begin.split("-");
    var eArr = end.split("-");
    var bRDate = new Date(bArr[0], bArr[1], bArr[2]);
    var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
    var result = (eRDate-bRDate)/(24*60*60*1000);
    if (result>60){
        alert('the duration is larger than 2 months');
    }
    else{  

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "http://localhost:8088/public/index.php/index/School/findEmail",
        data:{'schoolName':schoolName},
        success: function (data) {
            if (data){
                $.ajax({
                    type: "POST",
                    dataType: "text",
                    url: 'http://127.0.0.1:8090/sendSchool?email='+data[0].email+'&id='+id+'&schoolName='+schoolName+'&schoolType='+schoolType+"&startDate="+startDate+"&endDate="+endDate,
                    success: function (data) {
                        if (data){
                            alert('Success to intimate to the school representatives!');
                        }
                        else {
                            alert(data.message)
                        }
                    }
            
                });
                $.ajax({
                    type: "POST",
                    dataType: "text",
                    url: "http://localhost:8088/public/index.php/index/Admin/setSchedule?shoolName="+schoolName+"&startDate="+startDate+"&endDate="+endDate,
                    success: function (data) {
                        if (data){
                            alert("Success to submit the schedule!");
                            window.location.href ="./mainFrame.html"
                        }
                        else {
                            alert(data.message)
                        }
                    }
            
                });
            }
            else {
                alert(data.message)
            }
        }

    });
    

    }
}
function compare(default_date,date,isStart){
    var bDate=new Date(default_date);
    var begin=bDate.getFullYear()+'-'+(bDate.getMonth()+1+'-'+bDate.getDate());
    var eDate=new Date(date);
    var end=eDate.getFullYear()+'-'+(eDate.getMonth()+1+'-'+eDate.getDate());
    var bArr = begin.split("-");
    var eArr = end.split("-");
    var bRDate = new Date(bArr[0], bArr[1], bArr[2]);
    var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
    var result = (eRDate-bRDate)/(24*60*60*1000);
    if (isStart & result < 0 ){
        return false
    }
    if (isStart==false & result>0){
        return false
    }
    return true
}
function checkValid(startDate,endDate){
    var bDate=new Date(startDate);
    var begin=bDate.getFullYear()+'-'+(bDate.getMonth()+1+'-'+bDate.getDate());
    var eDate=new Date(endDate);
    var end=eDate.getFullYear()+'-'+(eDate.getMonth()+1+'-'+eDate.getDate());
    var bArr = begin.split("-");
    var eArr = end.split("-");
    var bRDate = new Date(bArr[0], bArr[1], bArr[2]);
    var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
    var result = (eRDate-bRDate)/(24*60*60*1000);

    if (result<7){
        alert("The duration shoule be at-least 1 week!");
        return false
    }
    else{
        if (result>21){
            alert("The duration shoule be no more than 3 weeks!");
            return false
        }
    }
    return true
}
function submitSchedule(schoolName){
    var startDate = document.getElementById('startDate').value;
    var endDate = document.getElementById('endDate').value;
    var isSpecial = document.getElementById('isSpecial').value;
    var totalStudent = document.getElementById('totalStudent')
    var totalCost = document.getElementById('totalCostNum')

    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'http://localhost:8088/public/index.php/index/School/showSchedule',
        data:{"schoolName":schoolName},
        success:function(data){
            var default_startdate = data[0]['startDate']
            var default_enddate = data[0]['endDate']
            if (checkValid(startDate,endDate)==false){
                $("#startDate").val(data[0].startDate.split(' ')[0]+'T'+data[0].startDate.split(' ')[1])
                $("#endDate").val(data[0].endDate.split(' ')[0]+'T'+data[0].endDate.split(' ')[1])
            }
            else{
            if (compare(default_startdate,startDate,true)==false){

                $("#startDate").val(data[0].startDate.split(' ')[0]+'T'+data[0].startDate.split(' ')[1])
                alert("Please choose the start date no earlier than defaulted start date!")
            }
            else{
                if (compare(default_enddate,endDate,false)==false){
                    $("#endDate").val(data[0].endDate.split(' ')[0]+'T'+data[0].endDate.split(' ')[1])
                
            alert("Please choose the end date no later than defaulted end date!")
            }
        
            else{
                    
    if (totalStudent!=null){
        var totalStudent =totalStudent.value;
    }
    else{
        var totalStudent=0
    }
    if (totalCost!=null){
        var totalCost =totalCost.value;
    }
    else{
        var totalCost =0
    }
   
    
    $.ajax({
        type: "POST",
        dataType: "text",
        url: 'http://localhost:8088/public/index.php/index/School/chooseDate',
        data:{'schoolName':schoolName,'startDate':startDate,'endDate':endDate,'isSpecial':isSpecial,'totalStudent':totalStudent,'totalCost':totalCost},
        success: function (data) {
            if (data=='success'){
                alert('Succeed to submit the schedule');
                window.location.href='./schoolFrame.html?schoolName='+schoolName
            }
            else {
            }
        }
    });
            }
        }
            }}
        })

}