<?php
namespace app\index\controller;
use think\Request;
use app\index\model\mydb;
class Admin
{
  // Requirement 1 – Admin User
  // adminlogin: email, password
    public function adminlogin()
    {
        $r=Request::instance();
        $email=$r->param('email');
        $password=$r->param('password');
        $t=new mydb;
        $list=$t->adminlogin($email,$password);
        if($list==true){
          return json_encode($list);
        }else{
             return json_encode($list);      
        }
    }
// Requirement 5 – Viewing all the Expression of Interests Received
// http://localhost:8088/public/index.php/index/Admin/viewInterest
// viewInterest
// return: schoolName, schoolType
public function viewInterest()
      {
        $t=new mydb;
        $result=$t->viewInterest();
        if ($result==NULL) {
          return "false";
        }else{
          return json_encode($result);
        }
      }  
// Requirement 6 – Rostering a Schedule for a School
// show school interest details
//http://localhost:8088/public/index.php/index/Admin/showDetail?index=0
// showDetail index
// return: id, schoolName, schoolType, 
public function showDetail()
      {
        $r=Request::instance();
        $index=$r->param('index');
        $t=new mydb;
        $result=$t->showDetail($index);
        if($result==NULL){
          return NULL;
        }else{
          return json_encode($result);
        }
      }
// set schedule
//http://localhost:8088/public/index.php/index/Admin/setSchedule?shoolName=diana&startDate=2021-02-12&endDate=2021-02-23
//setSchedule: shoolName,startDate,endDate
public function setSchedule()
      {
        $r=Request::instance();
        $shoolName=$r->param('shoolName');
        $startDate=$r->param('startDate');
        $endDate=$r->param('endDate');
        $t=new mydb;
        $list=$t->setSchedule($shoolName,$startDate,$endDate);
        if($list==true){
          return json_encode($list);
        }else{
             return json_encode($list);      
        }
      }
}
